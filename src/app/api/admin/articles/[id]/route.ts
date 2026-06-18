import { NextResponse } from "next/server";
import { z } from "zod";
import { authorizeAdminApi } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";
const schema = z.object({ title: z.string().trim().min(5).max(250), pages: z.string().trim().max(30), doi: z.string().trim().max(200), pdfUrl: z.union([z.literal(""), z.string().url()]) });
export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) { const auth = await authorizeAdminApi(); if ("response" in auth) return auth.response; const { id } = await params; const parsed = schema.safeParse(await request.json()); if (!parsed.success) return NextResponse.json({ error: "Metadata bài viết chưa hợp lệ." }, { status: 422 }); const article = await prisma.article.update({ where: { id }, data: { title: parsed.data.title, pages: parsed.data.pages || null, doi: parsed.data.doi || null, pdfUrl: parsed.data.pdfUrl || null } }); return NextResponse.json({ article }); }
