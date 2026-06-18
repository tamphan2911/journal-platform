import { NextResponse } from "next/server";
import { z } from "zod";
import { authorizeAdminApi } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";
const schema = z.object({ status: z.enum(["DRAFT", "SUBMITTED", "SCREENING", "ASSIGNED", "UNDER_REVIEW", "REVISION_REQUESTED", "REVISED", "ACCEPTED", "REJECTED", "PUBLISHED"]) });
export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) { const auth = await authorizeAdminApi(); if ("response" in auth) return auth.response; const { id } = await params; const parsed = schema.safeParse(await request.json()); if (!parsed.success) return NextResponse.json({ error: "Trạng thái không hợp lệ." }, { status: 422 }); const manuscript = await prisma.manuscript.update({ where: { id }, data: { status: parsed.data.status } }); await prisma.auditLog.create({ data: { actorId: auth.user.id, manuscriptId: id, action: "ADMIN_STATUS_UPDATE", detail: parsed.data.status } }); return NextResponse.json({ manuscript }); }
