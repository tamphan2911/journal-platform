import { NextResponse } from "next/server";
import { addHours, createPlainToken, hashToken } from "@/lib/auth-utils";
import { resetRequestSchema } from "@/lib/auth-validation";
import { sendMail } from "@/lib/mail";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const parsed = resetRequestSchema.safeParse(await request.json());

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Email chưa hợp lệ.", fieldErrors: parsed.error.flatten().fieldErrors },
      { status: 422 },
    );
  }

  const user = await prisma.user.findUnique({
    where: { email: parsed.data.email },
    select: { id: true, email: true },
  });

  if (user) {
    const plainToken = createPlainToken();
    const resetUrl = `${process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"}/dat-lai-mat-khau?token=${plainToken}`;

    await prisma.passwordResetToken.create({
      data: {
        userId: user.id,
        tokenHash: hashToken(plainToken),
        expiresAt: addHours(new Date(), 2),
      },
    });

    await sendMail({
      to: user.email,
      subject: "Đặt lại mật khẩu Chuyên san",
      text: `Bạn có thể đặt lại mật khẩu bằng liên kết sau trong 2 giờ: ${resetUrl}`,
    });
  }

  return NextResponse.json({
    message: "Nếu email tồn tại trong hệ thống, hướng dẫn đặt lại mật khẩu sẽ được gửi đến hộp thư.",
  });
}
