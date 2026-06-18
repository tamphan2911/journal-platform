import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import { authorizeAdminApi } from "@/lib/admin-auth";
import { journalMemberInputSchema } from "@/lib/journal-members";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const auth = await authorizeAdminApi();
  if ("response" in auth) return auth.response;

  const parsed = journalMemberInputSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: "Dữ liệu thành viên chưa hợp lệ.", fields: parsed.error.flatten().fieldErrors }, { status: 422 });
  }

  const member = await prisma.journalMember.create({
    data: {
      ...parsed.data,
      academicTitle: parsed.data.academicTitle || null,
      organization: parsed.data.organization || null,
      email: parsed.data.email || null,
      photoUrl: parsed.data.photoUrl || null,
    },
  });

  revalidateTag("journal-members", { expire: 0 });
  return NextResponse.json({ member }, { status: 201 });
}
