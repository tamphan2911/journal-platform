import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { hashToken } from "@/lib/auth-utils";
import { prisma } from "@/lib/prisma";

export async function POST() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_session")?.value;
  if (token) {
    await prisma.authSession.updateMany({
      where: { tokenHash: hashToken(token), revokedAt: null },
      data: { revokedAt: new Date() },
    });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set({ name: "auth_session", value: "", path: "/", maxAge: 0, httpOnly: true, sameSite: "lax" });
  return response;
}
