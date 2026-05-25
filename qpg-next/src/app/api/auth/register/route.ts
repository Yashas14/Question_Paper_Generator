import { NextRequest, NextResponse } from "next/server";
import { hash } from "bcryptjs";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, password, institutionName } = body;

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "Name, email, and password are required" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "An account with this email already exists" },
        { status: 409 }
      );
    }

    const hashedPassword = await hash(password, 12);

    // Create institution if name provided
    let institutionId: string | undefined;

    if (institutionName) {
      const institution = await prisma.institution.create({
        data: {
          name: institutionName,
          subscriptionPlan: "FREE",
          maxUsers: 10,
          maxPapersPerMonth: 3,
          maxQuestions: 100,
          maxAIGenerations: 0,
        },
      });
      institutionId = institution.id;
    }

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: institutionId ? "INSTITUTION_ADMIN" : "TEACHER",
        institutionId,
        isVerified: false,
      },
    });

    // Log event
    await prisma.analyticsEvent.create({
      data: {
        userId: user.id,
        eventType: "USER_LOGIN",
        metadata: JSON.stringify({ type: "registration" }),
      },
    });

    return NextResponse.json(
      {
        message: "Account created successfully",
        user: { id: user.id, name: user.name, email: user.email },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
