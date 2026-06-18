import { NextResponse } from "next/server";
import { z } from "zod";
import { authorizeAdminApi } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";
const schema = z.object({ title: z.string().trim().min(2).max(200), theme: z.string().trim().max(300), status: z.enum(["DRAFT", "OPEN", "PUBLISHED", "ARCHIVED"]) });
export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) { const auth = await authorizeAdminApi(); if ("response" in auth) return auth.response; const { id } = await params; const parsed = schema.safeParse(await request.json()); if (!parsed.success) return NextResponse.json({ error: "Thông tin tập, số chưa hợp lệ." }, { status: 422 }); const issue = await prisma.journalIssue.update({ where: { id }, data: { title: parsed.data.title, theme: parsed.data.theme || null, status: parsed.data.status, publishedAt: parsed.data.status === "PUBLISHED" ? new Date() : undefined } }); return NextResponse.json({ issue }); }
