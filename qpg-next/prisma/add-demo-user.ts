import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const institution = await prisma.institution.findFirst();
  if (!institution) throw new Error("No institution found. Run db:seed first.");

  const pwd = await hash("demo@123", 12);
  const user = await prisma.user.upsert({
    where: { email: "demo@gmail.com" },
    update: { password: pwd, isVerified: true },
    create: {
      name: "Demo User",
      email: "demo@gmail.com",
      password: pwd,
      role: "TEACHER",
      institutionId: institution.id,
      isVerified: true,
    },
  });
  console.log("✅ Demo user ready:", user.email);
}

main()
  .catch((e) => {
    console.error("❌ Failed:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
