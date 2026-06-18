import { NextResponse } from "next/server";
import { z } from "zod";
import { authorizeAdminApi } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";
const schema = z.object({ volume: z.number().int().positive(), number: z.number().int().positive(), year: z.number().int().min(2000).max(2200), title: z.string().trim().min(2).max(200), theme: z.string().trim().max(300) });
export async function POST(request: Request) { const auth = await authorizeAdminApi(); if ("response" in auth) return auth.response; const parsed = schema.safeParse(await request.json()); if (!parsed.success) return NextResponse.json({ error: "Thông tin tập, số chưa hợp lệ." }, { status: 422 }); try { const issue = await prisma.journalIssue.create({ data: { ...parsed.data, theme: parsed.data.theme || null } }); return NextResponse.json({ issue }, { status: 201 }); } catch { return NextResponse.json({ error: "Tập và số này đã tồn tại." }, { status: 409 }); } }
