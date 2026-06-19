import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { authorizeAdminApi } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const auth = await authorizeAdminApi();
  if ("response" in auth) return auth.response;

  const { id } = await params;
  const asset = await prisma.mediaAsset.findUnique({ where: { id }, select: { id: true } });
  if (!asset) return NextResponse.json({ error: "Không tìm thấy ảnh." }, { status: 404 });

  await prisma.mediaAsset.delete({ where: { id } });
  revalidateTag("journal-members", { expire: 0 });
  return NextResponse.json({ ok: true });
}
