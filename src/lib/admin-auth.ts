import { NextResponse } from "next/server";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/session";

export async function requireAdminPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/dang-nhap?next=/workspace/admin");
  }

  if (user.role !== "ADMIN") {
    redirect("/workspace");
  }

  return user;
}

export async function authorizeAdminApi() {
  const user = await getCurrentUser();

  if (!user) {
    return { response: NextResponse.json({ error: "Bạn cần đăng nhập." }, { status: 401 }) } as const;
  }

  if (user.role !== "ADMIN") {
    return { response: NextResponse.json({ error: "Bạn không có quyền quản trị." }, { status: 403 }) } as const;
  }

  return { user } as const;
}
