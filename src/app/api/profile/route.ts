import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { profileInputSchema } from "@/lib/profile-validation";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";

export async function PATCH(request: Request) {
  const currentUser = await getCurrentUser();
  if (!currentUser) return NextResponse.json({ error: "Bạn cần đăng nhập." }, { status: 401 });

  const parsed = profileInputSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: "Thông tin hồ sơ chưa hợp lệ.", fields: parsed.error.flatten().fieldErrors }, { status: 422 });
  }

  const user = await prisma.user.update({
    where: { id: currentUser.id },
    data: {
      name: parsed.data.name,
      phone: parsed.data.phone || null,
      facebookUrl: parsed.data.facebookUrl || null,
      organization: parsed.data.organization || null,
      affiliation: parsed.data.affiliation || null,
      profession: parsed.data.profession || null,
      orcid: parsed.data.orcid || null,
    },
    select: { id: true, name: true, phone: true, facebookUrl: true, organization: true, affiliation: true, profession: true, orcid: true },
  });

  revalidateTag("journal-members", { expire: 0 });
  return NextResponse.json({ user });
}
