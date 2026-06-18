import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { authorizeAdminApi } from "@/lib/admin-auth";
import { newsInputSchema, uniqueNewsSlug } from "@/lib/news";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const auth = await authorizeAdminApi();
  if ("response" in auth) return auth.response;

  const parsed = newsInputSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: "Dữ liệu tin chưa hợp lệ.", fields: parsed.error.flatten().fieldErrors }, { status: 422 });
  }

  const slug = await uniqueNewsSlug(parsed.data.slug || parsed.data.title);
  const post = await prisma.newsPost.create({
    data: {
      title: parsed.data.title,
      slug,
      summary: parsed.data.summary,
      content: parsed.data.content,
      coverImage: parsed.data.coverImage || null,
      status: parsed.data.status,
      publishedAt: parsed.data.status === "PUBLISHED" ? new Date() : null,
      authorId: auth.user.id,
    },
  });

  revalidateTag("published-news", { expire: 0 });

  return NextResponse.json({ post }, { status: 201 });
}
