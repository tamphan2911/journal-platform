import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";

const prisma = new PrismaClient({
  adapter: new PrismaPg({
    connectionString: process.env.DATABASE_URL,
  }),
});

async function main() {
  const admin = await prisma.user.upsert({
    where: { email: "admin@chuyensan.vn" },
    update: {},
    create: {
      email: "admin@chuyensan.vn",
      name: "Ban quản trị Chuyên san",
      role: "ADMIN",
      affiliation: "Tòa soạn Chuyên san Khoa học",
    },
  });

  const editor = await prisma.user.upsert({
    where: { email: "editor@chuyensan.vn" },
    update: {},
    create: {
      email: "editor@chuyensan.vn",
      name: "PGS. TS. Lê Hoài Nam",
      role: "EDITOR_IN_CHIEF",
      affiliation: "Hội đồng biên tập",
      expertise: ["Giáo dục", "Chính sách công", "Xuất bản khoa học"],
    },
  });

  const reviewer = await prisma.user.upsert({
    where: { email: "reviewer@chuyensan.vn" },
    update: {},
    create: {
      email: "reviewer@chuyensan.vn",
      name: "TS. Trần Bảo Châu",
      role: "REVIEWER",
      affiliation: "Viện Nghiên cứu Dữ liệu",
      expertise: ["Kinh tế số", "Dữ liệu mở"],
    },
  });

  const author = await prisma.user.upsert({
    where: { email: "author@example.edu.vn" },
    update: {},
    create: {
      email: "author@example.edu.vn",
      name: "Nguyễn Minh Anh",
      role: "AUTHOR",
      affiliation: "Trường Đại học Khoa học",
    },
  });

  const issue = await prisma.journalIssue.upsert({
    where: {
      volume_number_year: {
        volume: 12,
        number: 2,
        year: 2026,
      },
    },
    update: {},
    create: {
      volume: 12,
      number: 2,
      year: 2026,
      title: "Tập 12, Số 2, 2026",
      theme: "Dữ liệu, giáo dục và đổi mới",
      status: "PUBLISHED",
      publishedAt: new Date("2026-06-30T00:00:00.000Z"),
    },
  });

  const accepted = await prisma.manuscript.upsert({
    where: { code: "CS-2026-006" },
    update: {},
    create: {
      code: "CS-2026-006",
      title: "Đạo đức AI trong phân tích dữ liệu khoa học xã hội",
      abstract:
        "Bài viết phân tích các nguyên tắc đạo đức khi sử dụng hệ thống AI trong nghiên cứu khoa học xã hội, nhấn mạnh tính minh bạch, trách nhiệm giải trình và bảo vệ dữ liệu cá nhân.",
      field: "Công nghệ",
      keywords: ["AI", "đạo đức nghiên cứu", "dữ liệu xã hội"],
      status: "PUBLISHED",
      authorId: author.id,
      handlingEditorId: editor.id,
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
          editorId: editor.id,
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
    update: {},
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
    update: {},
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
