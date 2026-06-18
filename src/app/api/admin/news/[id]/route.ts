import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { authorizeAdminApi } from "@/lib/admin-auth";
import { newsInputSchema, uniqueNewsSlug } from "@/lib/news";
import { prisma } from "@/lib/prisma";

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const auth = await authorizeAdminApi();
  if ("response" in auth) return auth.response;

  const { id } = await params;
  const existing = await prisma.newsPost.findUnique({ where: { id } });
  if (!existing) return NextResponse.json({ error: "Không tìm thấy tin." }, { status: 404 });

  const parsed = newsInputSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: "Dữ liệu tin chưa hợp lệ.", fields: parsed.error.flatten().fieldErrors }, { status: 422 });
  }

  const slug = await uniqueNewsSlug(parsed.data.slug || parsed.data.title, id);
  const post = await prisma.newsPost.update({
    where: { id },
    data: {
      title: parsed.data.title,
      slug,
      summary: parsed.data.summary,
      content: parsed.data.content,
      coverImage: parsed.data.coverImage || null,
      status: parsed.data.status,
      publishedAt:
        parsed.data.status === "PUBLISHED" ? existing.publishedAt ?? new Date() : parsed.data.status === "DRAFT" ? null : existing.publishedAt,
    },
  });

  revalidateTag("published-news", { expire: 0 });

  return NextResponse.json({ post });
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const auth = await authorizeAdminApi();
  if ("response" in auth) return auth.response;

  const { id } = await params;
  const existing = await prisma.newsPost.findUnique({ where: { id }, select: { id: true } });
  if (!existing) return NextResponse.json({ error: "Không tìm thấy tin." }, { status: 404 });

  await prisma.newsPost.delete({ where: { id } });
  revalidateTag("published-news", { expire: 0 });
  return NextResponse.json({ ok: true });
}
