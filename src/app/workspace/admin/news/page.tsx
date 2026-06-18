import { NewsManager } from "@/components/news-manager";
import { prisma } from "@/lib/prisma";

export default async function AdminNewsPage() {
  const posts = await prisma.newsPost.findMany({ orderBy: { updatedAt: "desc" } });
  const serialized = posts.map((post) => ({
    ...post,
    publishedAt: post.publishedAt?.toISOString() ?? null,
    updatedAt: post.updatedAt.toISOString(),
  }));

  return (
    <div>
      <p className="section-kicker">Quản lý nội dung</p>
      <h1 className="mt-2 text-3xl font-extrabold text-[var(--uel-navy)]">Tin tức</h1>
      <p className="mt-2 text-sm text-[var(--muted)]">Tạo bản nháp, xuất bản và lưu trữ thông báo của chuyên san.</p>
      <div className="mt-6"><NewsManager initialPosts={serialized} /></div>
    </div>
  );
}
