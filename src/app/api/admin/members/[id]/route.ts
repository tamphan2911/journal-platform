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

  const member = await prisma.journalMember.update({
    where: { id },
    data: {
      ...parsed.data,
      academicTitle: parsed.data.academicTitle || null,
      organization: parsed.data.organization || null,
      email: parsed.data.email || null,
      photoUrl: parsed.data.photoUrl || null,
    },
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
