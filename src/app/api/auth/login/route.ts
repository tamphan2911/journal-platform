import { NextResponse } from "next/server";
import { addHours, createPlainToken, hashToken, verifyPassword } from "@/lib/auth-utils";
import { loginSchema } from "@/lib/auth-validation";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const parsed = loginSchema.safeParse(await request.json());

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Login information is invalid.", fieldErrors: parsed.error.flatten().fieldErrors },
      { status: 422 },
    );
  }

  const user = await prisma.user.findUnique({
    where: { email: parsed.data.email },
    select: {
      id: true,
      email: true,
      passwordHash: true,
      isActive: true,
      emailVerifiedAt: true,
    },
  });

  const invalidMessage = "Email or password is incorrect.";

  if (!user?.passwordHash || !verifyPassword(parsed.data.password, user.passwordHash)) {
    return NextResponse.json({ error: invalidMessage }, { status: 401 });
  }

  if (!user.isActive || !user.emailVerifiedAt) {
    return NextResponse.json(
      { error: "Please verify your email before logging in." },
      { status: 403 },
    );
  }

  const token = createPlainToken();
  const expiresAt = addHours(new Date(), 24 * 14);

  await prisma.$transaction([
    prisma.authSession.create({
      data: {
        userId: user.id,
        tokenHash: hashToken(token),
        expiresAt,
      },
    }),
    prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    }),
  ]);

  const response = NextResponse.json({ ok: true, redirectTo: "/" });
  response.cookies.set({
    name: "auth_session",
    value: token,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires: expiresAt,
  });

  return response;
}
