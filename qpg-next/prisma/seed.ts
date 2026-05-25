import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Create institution
  const institution = await prisma.institution.create({
    data: {
      name: "Demo University",
      domain: "demo.edu",
      type: "University",
      subscriptionPlan: "PRO",
      maxUsers: 100,
      maxPapersPerMonth: 50,
      maxQuestions: 5000,
      maxAIGenerations: 500,
    },
  });

  // Create departments
  const csDept = await prisma.department.create({
    data: {
      name: "Computer Science",
      code: "CS",
      institutionId: institution.id,
    },
  });

  // Create admin user
  const adminPassword = await hash("admin123", 12);
  const admin = await prisma.user.create({
    data: {
      name: "Admin User",
      email: "admin@demo.edu",
      password: adminPassword,
      role: "INSTITUTION_ADMIN",
      institutionId: institution.id,
      isVerified: true,
    },
  });

  // Create teacher user
  const teacherPassword = await hash("teacher123", 12);
  const teacher = await prisma.user.create({
    data: {
      name: "Dr. Sarah Johnson",
      email: "teacher@demo.edu",
      password: teacherPassword,
      role: "TEACHER",
      institutionId: institution.id,
      isVerified: true,
    },
  });

  // Create demo user
  const demoPassword = await hash("demo@123", 12);
  await prisma.user.create({
    data: {
      name: "Demo User",
      email: "demo@gmail.com",
      password: demoPassword,
      role: "TEACHER",
      institutionId: institution.id,
      isVerified: true,
    },
  });

  // Create subject
  const dsSubject = await prisma.subject.create({
    data: {
      name: "Data Structures",
      code: "CS301",
      semester: 3,
      departmentId: csDept.id,
      institutionId: institution.id,
      createdById: teacher.id,
    },
  });

  const dbmsSubject = await prisma.subject.create({
    data: {
      name: "Database Management Systems",
      code: "CS401",
      semester: 4,
      departmentId: csDept.id,
      institutionId: institution.id,
      createdById: teacher.id,
    },
  });

  // Create topics
  const topics = await Promise.all([
    prisma.topic.create({
      data: {
        name: "Arrays and Linked Lists",
        subjectId: dsSubject.id,
        bloomLevel: "UNDERSTAND",
        weightage: 20,
        orderIndex: 1,
      },
    }),
    prisma.topic.create({
      data: {
        name: "Stacks and Queues",
        subjectId: dsSubject.id,
        bloomLevel: "APPLY",
        weightage: 15,
        orderIndex: 2,
      },
    }),
    prisma.topic.create({
      data: {
        name: "Trees and Graphs",
        subjectId: dsSubject.id,
        bloomLevel: "ANALYZE",
        weightage: 25,
        orderIndex: 3,
      },
    }),
    prisma.topic.create({
      data: {
        name: "Sorting and Searching",
        subjectId: dsSubject.id,
        bloomLevel: "APPLY",
        weightage: 20,
        orderIndex: 4,
      },
    }),
    prisma.topic.create({
      data: {
        name: "Hashing",
        subjectId: dsSubject.id,
        bloomLevel: "UNDERSTAND",
        weightage: 20,
        orderIndex: 5,
      },
    }),
  ]);

  // Create sample questions
  const sampleQuestions = [
    {
      text: "<p>What is the time complexity of searching an element in a sorted array using binary search?</p>",
      type: "MCQ",
      difficulty: "EASY",
      marks: 1,
      bloomLevel: "REMEMBER",
      topicId: topics[0].id,
      options: JSON.stringify([
        { id: "a", text: "O(n)", isCorrect: false },
        { id: "b", text: "O(log n)", isCorrect: true },
        { id: "c", text: "O(n²)", isCorrect: false },
        { id: "d", text: "O(1)", isCorrect: false },
      ]),
      correctAnswer: "O(log n)",
      explanation: "Binary search divides the search space in half each iteration, resulting in O(log n) time complexity.",
      tags: JSON.stringify(["binary-search", "time-complexity", "arrays"]),
    },
    {
      text: "<p>Explain the difference between a stack and a queue. Provide real-world examples for each.</p>",
      type: "SHORT",
      difficulty: "MEDIUM",
      marks: 5,
      bloomLevel: "UNDERSTAND",
      topicId: topics[1].id,
      correctAnswer: "Stack follows LIFO (Last In, First Out) — e.g., undo operations, browser back button. Queue follows FIFO (First In, First Out) — e.g., printer queue, ticket counter.",
      tags: JSON.stringify(["stack", "queue", "comparison"]),
    },
    {
      text: "<p>Write an algorithm to perform an in-order traversal of a binary tree without using recursion.</p>",
      type: "LONG",
      difficulty: "HARD",
      marks: 10,
      bloomLevel: "CREATE",
      topicId: topics[2].id,
      correctAnswer: "Use an explicit stack. Push all left children, then pop, visit, move to right child. Repeat until stack is empty and current is null.",
      tags: JSON.stringify(["binary-tree", "traversal", "iterative"]),
    },
    {
      text: "<p>The worst-case time complexity of Quick Sort is O(n²).</p>",
      type: "TRUE_FALSE",
      difficulty: "EASY",
      marks: 1,
      bloomLevel: "REMEMBER",
      topicId: topics[3].id,
      correctAnswer: "True",
      explanation: "When the pivot is always the smallest or largest element, Quick Sort degrades to O(n²).",
      tags: JSON.stringify(["quicksort", "time-complexity"]),
    },
    {
      text: "<p>__________ is a technique used to resolve collisions in hash tables by finding the next available slot.</p>",
      type: "FILL",
      difficulty: "MEDIUM",
      marks: 2,
      bloomLevel: "REMEMBER",
      topicId: topics[4].id,
      correctAnswer: "Linear probing",
      tags: JSON.stringify(["hashing", "collision-resolution"]),
    },
  ];

  for (const q of sampleQuestions) {
    await prisma.question.create({
      data: {
        ...q,
        subjectId: dsSubject.id,
        createdById: teacher.id,
      },
    });
  }

  // Create a sample paper
  const paper = await prisma.questionPaper.create({
    data: {
      title: "Data Structures — CIE 1 (Sample)",
      subjectId: dsSubject.id,
      createdById: teacher.id,
      institutionId: institution.id,
      examType: "CIE",
      totalMarks: 50,
      durationMinutes: 90,
      instructions: "<p>Answer all questions. Each question carries marks as indicated.</p>",
      status: "DRAFT",
      headerConfig: JSON.stringify({
        institutionName: "Demo University",
        departmentName: "Computer Science",
        courseName: "Data Structures",
        courseCode: "CS301",
        semester: 3,
        examType: "CIE 1",
      }),
    },
  });

  // Create sections for the paper
  await prisma.paperSection.createMany({
    data: [
      { paperId: paper.id, title: "Part A — Multiple Choice Questions", marksPerQuestion: 1, totalQuestionsToAttempt: 10, orderIndex: 0 },
      { paperId: paper.id, title: "Part B — Short Answer Questions", marksPerQuestion: 5, totalQuestionsToAttempt: 4, orderIndex: 1 },
      { paperId: paper.id, title: "Part C — Long Answer Questions", marksPerQuestion: 10, totalQuestionsToAttempt: 2, orderIndex: 2 },
    ],
  });

  console.log("✅ Seed completed!");
  console.log("   Admin login: admin@demo.edu / admin123");
  console.log("   Teacher login: teacher@demo.edu / teacher123");
  console.log("   Demo login: demo@gmail.com / demo@123");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
