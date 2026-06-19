import { redirect } from "next/navigation";
import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/page-header";
import { ProfileForm } from "@/components/profile-form";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";

export const dynamic = "force-dynamic";

export default async function ProfilePage() {
  const currentUser = await getCurrentUser();
  if (!currentUser) redirect("/dang-nhap?next=/ho-so");
  const profile = await prisma.user.findUnique({
    where: { id: currentUser.id },
    select: { name: true, email: true, role: true, phone: true, facebookUrl: true, organization: true, affiliation: true, profession: true, orcid: true, avatarId: true },
  });
  if (!profile) redirect("/dang-nhap");

  return (
    <AppShell>
      <section className="mx-auto min-h-[calc(100dvh-var(--site-header-height))] max-w-[1180px] px-4 py-8 md:px-8 lg:py-12">
        <PageHeader kicker="Hồ sơ cá nhân" title="Thông tin tài khoản" description="Cập nhật thông tin liên hệ và ảnh đại diện dùng trong hồ sơ thành viên Chuyên san." />
        <div className="mt-8"><ProfileForm initialProfile={profile} /></div>
      </section>
    </AppShell>
  );
}
