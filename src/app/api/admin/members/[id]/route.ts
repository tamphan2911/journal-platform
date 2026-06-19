import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import { authorizeAdminApi } from "@/lib/admin-auth";
import { journalMemberInputSchema } from "@/lib/journal-members";
import { prisma } from "@/lib/prisma";

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const auth = await authorizeAdminApi();
  if ("response" in auth) return auth.response;

  const { id } = await params;
  const existing = await prisma.journalMember.findUnique({ where: { id }, select: { id: true } });
  if (!existing) return NextResponse.json({ error: "Không tìm thấy thành viên." }, { status: 404 });

  const parsed = journalMemberInputSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: "Dữ liệu thành viên chưa hợp lệ.", fields: parsed.error.flatten().fieldErrors }, { status: 422 });
  }

  const user = await prisma.user.findUnique({
    where: { id: parsed.data.userId },
    select: { id: true, name: true, email: true, organization: true, profession: true, avatarId: true },
  });
  if (!user) return NextResponse.json({ error: "Không tìm thấy người dùng." }, { status: 404 });

  const duplicate = await prisma.journalMember.findFirst({
    where: { id: { not: id }, userId: user.id, group: parsed.data.group, term: parsed.data.term },
    select: { id: true },
  });
  if (duplicate) return NextResponse.json({ error: "Người dùng đã thuộc ban này trong nhiệm kỳ đã chọn." }, { status: 409 });

  const member = await prisma.journalMember.update({
    where: { id },
    data: {
      ...parsed.data,
      note: parsed.data.note || null,
      name: user.name,
      academicTitle: user.profession,
      organization: user.organization,
      bio: parsed.data.note || parsed.data.role,
      email: user.email,
      photoUrl: user.avatarId ? `/api/media/${user.avatarId}` : null,
    },
    include: { user: { select: { id: true, name: true, email: true, organization: true, profession: true, avatarId: true } } },
  });

  revalidateTag("journal-members", { expire: 0 });
  return NextResponse.json({ member });
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const auth = await authorizeAdminApi();
  if ("response" in auth) return auth.response;

  const { id } = await params;
  const existing = await prisma.journalMember.findUnique({ where: { id }, select: { id: true } });
  if (!existing) return NextResponse.json({ error: "Không tìm thấy thành viên." }, { status: 404 });

  await prisma.journalMember.delete({ where: { id } });
  revalidateTag("journal-members", { expire: 0 });
  return NextResponse.json({ ok: true });
}
