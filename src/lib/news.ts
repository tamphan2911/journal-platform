import { z } from "zod";
import { connection } from "next/server";
import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/prisma";

export const newsInputSchema = z.object({
  title: z.string().trim().min(5, "Tiêu đề phải có ít nhất 5 ký tự.").max(180),
  slug: z.string().trim().max(190).optional().default(""),
  summary: z.string().trim().min(10, "Tóm tắt phải có ít nhất 10 ký tự.").max(500),
  content: z.string().trim().min(20, "Nội dung phải có ít nhất 20 ký tự."),
  coverImage: z.union([z.literal(""), z.string().url("URL ảnh không hợp lệ.")]).optional().default(""),
  status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]),
});

export const fallbackNews = [
  {
    id: "fallback-call",
    date: "18/06/2026",
    publishedAt: new Date("2026-06-18T00:00:00.000Z"),
    title: "Thông báo tiếp nhận bài viết cho số chuyên đề năm 2026",
    slug: "tiep-nhan-bai-viet-so-chuyen-de-2026",
    summary: "Chuyên san tiếp nhận các nghiên cứu mới trong lĩnh vực kinh tế, luật, quản trị và chính sách công.",
    content: "Chuyên san Khoa học Kinh tế - Luật trân trọng thông báo tiếp nhận bài viết cho số chuyên đề năm 2026. Bản thảo cần tuân thủ hướng dẫn dành cho tác giả và các chuẩn mực đạo đức công bố của chuyên san.",
    coverImage: null,
  },
  {
    id: "fallback-metadata",
    date: "10/06/2026",
    publishedAt: new Date("2026-06-10T00:00:00.000Z"),
    title: "Cập nhật hướng dẫn trình bày và chuẩn metadata bài viết",
    slug: "cap-nhat-huong-dan-metadata-2026",
    summary: "Tác giả vui lòng sử dụng biểu mẫu mới cho tóm tắt, từ khóa, thông tin tài trợ và tuyên bố đạo đức.",
    content: "Hướng dẫn trình bày đã được cập nhật nhằm chuẩn hóa tóm tắt, từ khóa, thông tin tác giả, nguồn tài trợ, xung đột lợi ích và tuyên bố đạo đức nghiên cứu.",
    coverImage: null,
  },
  {
    id: "fallback-issue",
    date: "30/05/2026",
    publishedAt: new Date("2026-05-30T00:00:00.000Z"),
    title: "Tập 12, Số 2 chuẩn bị phát hành",
    slug: "tap-12-so-2-chuan-bi-phat-hanh",
    summary: "Số mới tập trung vào dữ liệu, chính sách và chuyển đổi số, dự kiến xuất bản cuối tháng 6/2026.",
    content: "Ban biên tập đang hoàn tất công tác biên tập và xuất bản Tập 12, Số 2 với chủ đề dữ liệu, chính sách và chuyển đổi số.",
    coverImage: null,
  },
];

export function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 180);
}

export async function uniqueNewsSlug(value: string, excludeId?: string) {
  const base = slugify(value) || `tin-${Date.now()}`;
  let slug = base;
  let suffix = 2;

  while (
    await prisma.newsPost.findFirst({
      where: { slug, ...(excludeId ? { id: { not: excludeId } } : {}) },
      select: { id: true },
    })
  ) {
    slug = `${base}-${suffix}`;
    suffix += 1;
  }

  return slug;
}

const readPublishedNews = unstable_cache(
  async () => {
    const posts = await prisma.newsPost.findMany({
      where: { status: "PUBLISHED", publishedAt: { lte: new Date() } },
      orderBy: { publishedAt: "desc" },
      select: {
        id: true,
        title: true,
        slug: true,
        summary: true,
        content: true,
        coverImage: true,
        publishedAt: true,
      },
    });

    return posts.length ? posts : fallbackNews;
  },
  ["published-news"],
  { revalidate: 300, tags: ["published-news"] },
);

export async function getPublishedNews() {
  await connection();
  try {
    return await readPublishedNews();
  } catch {
    return fallbackNews;
  }
}

export function formatNewsDate(value: Date | null) {
  return value
    ? new Intl.DateTimeFormat("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" }).format(value)
    : "Chưa xuất bản";
}
