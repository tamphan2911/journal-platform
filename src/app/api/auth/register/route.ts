import { NextResponse } from "next/server";
import { addHours, createPlainToken, hashPassword, hashToken } from "@/lib/auth-utils";
import { registerSchema } from "@/lib/auth-validation";
import { sendMail } from "@/lib/mail";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const parsed = registerSchema.safeParse(await request.json());

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Thông tin đăng ký chưa hợp lệ.", fieldErrors: parsed.error.flatten().fieldErrors },
      { status: 422 },
    );
  }

  const data = parsed.data;
  const existingUser = await prisma.user.findUnique({
    where: { email: data.email },
    select: { id: true },
  });

  if (existingUser) {
    return NextResponse.json(
      { error: "Email này đã được đăng ký.", fieldErrors: { email: ["Email này đã được đăng ký."] } },
      { status: 409 },
    );
  }

  const plainToken = createPlainToken();
  const verificationUrl = `${process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"}/api/auth/verify-email?token=${plainToken}`;

  const user = await prisma.user.create({
    data: {
      email: data.email,
      passwordHash: hashPassword(data.password),
      firstName: data.firstName,
      lastName: data.lastName,
      name: `${data.firstName} ${data.lastName}`,
      role: "USER",
      organization: data.organization,
      affiliation: data.affiliation,
      profession: data.profession,
      studentId: data.profession === "student" ? data.studentId : null,
      major: data.profession === "student" ? data.major : null,
      isActive: false,
      termsAcceptedAt: new Date(),
      emailVerificationTokens: {
        create: {
          tokenHash: hashToken(plainToken),
          expiresAt: addHours(new Date(), 24),
        },
      },
    },
    select: {
      id: true,
      email: true,
    },
  });

  await sendMail({
    to: user.email,
    subject: "Xác minh tài khoản Chuyên san",
    text: `Vui lòng xác minh tài khoản bằng liên kết sau: ${verificationUrl}`,
  });

  return NextResponse.json(
    {
      message: "Đăng ký thành công. Vui lòng kiểm tra email để xác minh tài khoản.",
      verificationPending: true,
    },
    { status: 201 },
  );
}
