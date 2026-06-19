import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";
import { findOwnedDraft } from "@/lib/submission-workflow";

const maxBytes = 2 * 1024 * 1024;
const types = new Set(["application/vnd.openxmlformats-officedocument.wordprocessingml.document", "application/msword", "application/octet-stream"]);

export const runtime = "nodejs";

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Bạn cần đăng nhập." }, { status: 401 });
  const { id } = await params;
  const manuscript = await findOwnedDraft(id, user.id);
  if (!manuscript) return NextResponse.json({ error: "Không tìm thấy bản thảo chưa hoàn tất." }, { status: 404 });
  const length = Number(request.headers.get("content-length") ?? 0);
  if (length > maxBytes + 128 * 1024) return NextResponse.json({ error: "Tệp bản thảo không được vượt quá 2 MB." }, { status: 413 });

  const form = await request.formData();
  const file = form.get("manuscript");
  if (!(file instanceof File)) return NextResponse.json({ error: "Vui lòng chọn tệp Word." }, { status: 422 });
  const extension = file.name.toLowerCase().match(/\.(docx|doc)$/)?.[1];
  if (!extension || !types.has(file.type || "application/octet-stream")) return NextResponse.json({ error: "Chỉ chấp nhận tệp Word .doc hoặc .docx." }, { status: 415 });
  if (file.size > maxBytes) return NextResponse.json({ error: "Tệp bản thảo không được vượt quá 2 MB." }, { status: 413 });
  const bytes = new Uint8Array(await file.arrayBuffer());
  const validDocx = extension === "docx" && bytes[0] === 0x50 && bytes[1] === 0x4b;
  const validDoc = extension === "doc" && bytes[0] === 0xd0 && bytes[1] === 0xcf && bytes[2] === 0x11 && bytes[3] === 0xe0;
  if (!validDocx && !validDoc) return NextResponse.json({ error: "Nội dung tệp không đúng định dạng Word." }, { status: 422 });

  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "-").slice(-180);
  await prisma.$transaction([
    prisma.submissionFile.deleteMany({ where: { manuscriptId: id, kind: "MANUSCRIPT" } }),
    prisma.submissionFile.create({ data: { manuscriptId: id, kind: "MANUSCRIPT", fileName: safeName, storageKey: `submissions/${manuscript.code}/${safeName}`, mimeType: extension === "docx" ? "application/vnd.openxmlformats-officedocument.wordprocessingml.document" : "application/msword", sizeBytes: file.size, data: bytes } }),
    prisma.manuscript.update({ where: { id }, data: { submissionStep: 3 } }),
    prisma.auditLog.create({ data: { actorId: user.id, manuscriptId: id, action: "ANONYMOUS_MANUSCRIPT_UPLOADED", detail: safeName } }),
  ]);
  return NextResponse.json({ ok: true, fileName: safeName, submissionStep: 3 });
}
