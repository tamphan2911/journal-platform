import { NextResponse } from "next/server";
import { hashToken } from "@/lib/auth-utils";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const token = new URL(request.url).searchParams.get("token");

  if (!token) {
    return NextResponse.json({ error: "Thiếu mã xác minh." }, { status: 400 });
  }

  const verification = await prisma.emailVerificationToken.findUnique({
    where: { tokenHash: hashToken(token) },
    include: { user: true },
  });

  if (!verification || verification.usedAt || verification.expiresAt < new Date()) {
    return NextResponse.json({ error: "Mã xác minh không hợp lệ hoặc đã hết hạn." }, { status: 400 });
  }

  await prisma.$transaction([
    prisma.user.update({
      where: { id: verification.userId },
      data: {
        isActive: true,
        emailVerifiedAt: new Date(),
      },
    }),
    prisma.emailVerificationToken.update({
      where: { id: verification.id },
      data: { usedAt: new Date() },
    }),
  ]);

  return NextResponse.redirect(new URL("/dang-nhap?verified=1", request.url));
}
