import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";
import { hashPassword } from "../src/lib/auth-utils";
import { demoAccounts } from "../src/lib/demo-accounts";

const prisma = new PrismaClient({
  adapter: new PrismaPg({
    connectionString: process.env.DATABASE_URL,
  }),
});

async function seedUsers() {
  const users = new Map<string, Awaited<ReturnType<typeof prisma.user.upsert>>>();

  for (const account of demoAccounts) {
    const user = await prisma.user.upsert({
      where: { email: account.email },
      update: {
        passwordHash: hashPassword(account.password),
        firstName: account.firstName,
        lastName: account.lastName,
        name: `${account.firstName} ${account.lastName}`,
        role: account.role,
        organization: account.organization,
        affiliation: account.affiliation,
        profession: account.profession,
        isActive: true,
        emailVerifiedAt: new Date("2026-06-17T00:00:00.000Z"),
        termsAcceptedAt: new Date("2026-06-17T00:00:00.000Z"),
      },
      create: {
        email: account.email,
        passwordHash: hashPassword(account.password),
        firstName: account.firstName,
        lastName: account.lastName,
        name: `${account.firstName} ${account.lastName}`,
        role: account.role,
        organization: account.organization,
        affiliation: account.affiliation,
        profession: account.profession,
        isActive: true,
        emailVerifiedAt: new Date("2026-06-17T00:00:00.000Z"),
        termsAcceptedAt: new Date("2026-06-17T00:00:00.000Z"),
      },
    });

    users.set(account.email, user);
  }

  return users;
}

async function main() {
  const users = await seedUsers();
  const admin = users.get("admin@chuyensan.vn");
  const chiefEditor = users.get("chief.editor@chuyensan.vn");
  const reviewer = users.get("reviewer@chuyensan.vn");
  const author = users.get("author@example.edu.vn");

  if (!admin || !chiefEditor || !reviewer || !author) {
    throw new Error("Demo accounts were not seeded correctly.");
  }

  const issue = await prisma.journalIssue.upsert({
    where: {
      volume_number_year: {
        volume: 12,
        number: 2,
        year: 2026,
      },
    },
    update: {
      title: "Tập 12, Số 2, 2026",
      theme: "Dữ liệu, chính sách và chuyển đổi số",
      status: "PUBLISHED",
      publishedAt: new Date("2026-06-30T00:00:00.000Z"),
    },
    create: {
      volume: 12,
      number: 2,
      year: 2026,
      title: "Tập 12, Số 2, 2026",
      theme: "Dữ liệu, chính sách và chuyển đổi số",
      status: "PUBLISHED",
      publishedAt: new Date("2026-06-30T00:00:00.000Z"),
    },
  });

  const accepted = await prisma.manuscript.upsert({
    where: { code: "CS-2026-006" },
    update: {
      title: "Đạo đức AI trong phân tích dữ liệu khoa học xã hội",
      abstract:
        "Bài viết phân tích các nguyên tắc đạo đức khi sử dụng hệ thống AI trong nghiên cứu khoa học xã hội, nhấn mạnh tính minh bạch, trách nhiệm giải trình và bảo vệ dữ liệu cá nhân.",
      field: "Công nghệ",
      keywords: ["AI", "đạo đức nghiên cứu", "dữ liệu xã hội"],
      status: "PUBLISHED",
      authorId: author.id,
      handlingEditorId: chiefEditor.id,
      issueId: issue.id,
    },
    create: {
      code: "CS-2026-006",
      title: "Đạo đức AI trong phân tích dữ liệu khoa học xã hội",
      abstract:
        "Bài viết phân tích các nguyên tắc đạo đức khi sử dụng hệ thống AI trong nghiên cứu khoa học xã hội, nhấn mạnh tính minh bạch, trách nhiệm giải trình và bảo vệ dữ liệu cá nhân.",
      field: "Công nghệ",
      keywords: ["AI", "đạo đức nghiên cứu", "dữ liệu xã hội"],
      status: "PUBLISHED",
      authorId: author.id,
      handlingEditorId: chiefEditor.id,
      issueId: issue.id,
      files: {
        create: {
          kind: "MANUSCRIPT",
          fileName: "ai-dao-duc.docx",
          storageKey: "submissions/CS-2026-006/ai-dao-duc.docx",
          mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          sizeBytes: 185200,
        },
      },
      decisions: {
        create: {
          editorId: chiefEditor.id,
          type: "PUBLISH",
          note: "Đủ điều kiện công bố trong số 2/2026.",
        },
      },
      auditLogs: {
        create: {
          actorId: admin.id,
          action: "SEED_MANUSCRIPT",
          detail: "Dữ liệu mẫu cho bản thảo đã xuất bản.",
        },
      },
    },
  });

  await prisma.review.upsert({
    where: { id: "seed-review-ai-ethics" },
    update: {
      manuscriptId: accepted.id,
      reviewerId: reviewer.id,
      recommendation: "MINOR_REVISION",
      comments: "Bài viết có đóng góp rõ, cần làm rõ phương pháp chọn tình huống.",
      submittedAt: new Date("2026-06-12T00:00:00.000Z"),
    },
    create: {
      id: "seed-review-ai-ethics",
      manuscriptId: accepted.id,
      reviewerId: reviewer.id,
      round: 1,
      recommendation: "MINOR_REVISION",
      comments: "Bài viết có đóng góp rõ, cần làm rõ phương pháp chọn tình huống.",
      dueAt: new Date("2026-06-18T00:00:00.000Z"),
      submittedAt: new Date("2026-06-12T00:00:00.000Z"),
    },
  });

  await prisma.article.upsert({
    where: { slug: "dao-duc-ai-du-lieu-khoa-hoc-xa-hoi" },
    update: {
      title: accepted.title,
      abstract: accepted.abstract,
      authors: ["Phạm Quốc Huy"],
      pages: "47-62",
      doi: "10.5555/cs.2026.006",
      pdfUrl: "/articles/cs-2026-006.pdf",
      publishedAt: new Date("2026-06-30T00:00:00.000Z"),
    },
    create: {
      manuscriptId: accepted.id,
      issueId: issue.id,
      title: accepted.title,
      slug: "dao-duc-ai-du-lieu-khoa-hoc-xa-hoi",
      abstract: accepted.abstract,
      authors: ["Phạm Quốc Huy"],
      pages: "47-62",
      doi: "10.5555/cs.2026.006",
      pdfUrl: "/articles/cs-2026-006.pdf",
      publishedAt: new Date("2026-06-30T00:00:00.000Z"),
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
