import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";
import { submissionInfoSchema } from "@/lib/submission-workflow";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Bạn cần đăng nhập để nộp bài." }, { status: 401 });
  const parsed = submissionInfoSchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: "Vui lòng hoàn tất thông tin và các cam kết bắt buộc." }, { status: 422 });

  const issue = await prisma.journalIssue.findUnique({ where: { id: parsed.data.issueId }, select: { id: true } });
  if (!issue) return NextResponse.json({ error: "Số xuất bản đã chọn không tồn tại." }, { status: 404 });

  if (parsed.data.manuscriptId) {
    const existing = await prisma.manuscript.findFirst({ where: { id: parsed.data.manuscriptId, authorId: user.id, status: "DRAFT" }, select: { id: true } });
    if (!existing) return NextResponse.json({ error: "Không tìm thấy bản thảo chưa hoàn tất." }, { status: 404 });
    const manuscript = await prisma.manuscript.update({ where: { id: existing.id }, data: { issueId: issue.id, field: parsed.data.section, title: parsed.data.title, declarations: parsed.data.declarations, submissionStep: 2 }, select: { id: true, code: true, submissionStep: true } });
    return NextResponse.json(manuscript);
  }

  const year = new Date().getFullYear();
  const code = `CS-${year}-${randomUUID().slice(0, 8).toUpperCase()}`;
  const manuscript = await prisma.manuscript.create({
    data: {
      code,
      title: parsed.data.title,
      abstract: "",
      field: parsed.data.section,
      status: "DRAFT",
      authorId: user.id,
      issueId: issue.id,
      declarations: parsed.data.declarations,
      submissionStep: 2,
      auditLogs: { create: { actorId: user.id, action: "SUBMISSION_DRAFT_CREATED", detail: "Tác giả hoàn tất bước thông tin bản thảo." } },
    },
    select: { id: true, code: true, submissionStep: true },
  });
  return NextResponse.json(manuscript, { status: 201 });
}
