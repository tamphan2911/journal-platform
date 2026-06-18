import { NextResponse } from "next/server";
import { z } from "zod";
import { authorizeAdminApi } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";
const schema = z.object({ role: z.enum(["USER", "ADMIN", "EDITOR_IN_CHIEF", "SECTION_EDITOR", "REVIEWER", "AUTHOR"]), isActive: z.boolean() });
export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const auth = await authorizeAdminApi(); if ("response" in auth) return auth.response;
  const { id } = await params; const parsed = schema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: "Dữ liệu người dùng chưa hợp lệ." }, { status: 422 });
  const existing = await prisma.user.findUnique({ where: { id }, select: { id: true } });
  if (!existing) return NextResponse.json({ error: "Không tìm thấy người dùng." }, { status: 404 });
  if (id === auth.user.id && (!parsed.data.isActive || parsed.data.role !== "ADMIN")) return NextResponse.json({ error: "Không thể thu hồi quyền của tài khoản quản trị đang đăng nhập." }, { status: 409 });
  const user = await prisma.user.update({ where: { id }, data: parsed.data, select: { id: true, role: true, isActive: true } });
  return NextResponse.json({ user });
}
