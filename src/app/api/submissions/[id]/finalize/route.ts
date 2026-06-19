import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";
import { findOwnedDraft, metadataSchema } from "@/lib/submission-workflow";

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Bạn cần đăng nhập." }, { status: 401 });
  const { id } = await params;
  if (!await findOwnedDraft(id, user.id)) return NextResponse.json({ error: "Không tìm thấy bản thảo chưa hoàn tất." }, { status: 404 });
  const parsed = metadataSchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Metadata chưa hợp lệ." }, { status: 422 });
  const [fileCount, authorCount, manuscript] = await Promise.all([
    prisma.submissionFile.count({ where: { manuscriptId: id, kind: "MANUSCRIPT" } }),
    prisma.manuscriptContributor.count({ where: { manuscriptId: id } }),
    prisma.manuscript.findUnique({ where: { id }, select: { authorsConfirmed: true } }),
  ]);
  if (!fileCount || !authorCount || !manuscript?.authorsConfirmed) return NextResponse.json({ error: "Vui lòng hoàn tất tệp bản thảo và thông tin tác giả trước khi nộp." }, { status: 409 });

  const completedAt = new Date();
  const updated = await prisma.manuscript.update({
    where: { id },
    data: { abstract: parsed.data.abstract, keywords: parsed.data.keywords, funding: parsed.data.funding || null, status: "SUBMITTED", submissionStep: 4, submittedAt: completedAt, completedAt, auditLogs: { create: { actorId: user.id, action: "SUBMISSION_COMPLETED", detail: "Tác giả xác nhận hoàn tất và gửi bản thảo." } } },
    select: { id: true, code: true },
  });
  return NextResponse.json(updated);
}
