import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";
import { authorsSchema, findOwnedDraft } from "@/lib/submission-workflow";

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Bạn cần đăng nhập." }, { status: 401 });
  const { id } = await params;
  if (!await findOwnedDraft(id, user.id)) return NextResponse.json({ error: "Không tìm thấy bản thảo chưa hoàn tất." }, { status: 404 });
  const parsed = authorsSchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: "Vui lòng kiểm tra danh sách tác giả và chọn đúng một tác giả liên hệ." }, { status: 422 });

  await prisma.$transaction(async (tx) => {
    await tx.manuscriptContributor.deleteMany({ where: { manuscriptId: id } });
    await tx.manuscriptContributor.createMany({ data: parsed.data.authors.map((author, index) => ({ ...author, bio: author.bio || null, manuscriptId: id, sortOrder: index })) });
    await tx.manuscript.update({ where: { id }, data: { authorsConfirmed: true, submissionStep: 4 } });
    await tx.auditLog.create({ data: { actorId: user.id, manuscriptId: id, action: "SUBMISSION_AUTHORS_CONFIRMED", detail: `${parsed.data.authors.length} tác giả` } });
  });
  return NextResponse.json({ ok: true, submissionStep: 4 });
}
