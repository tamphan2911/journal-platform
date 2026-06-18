import { MemberManager } from "@/components/member-manager";
import { prisma } from "@/lib/prisma";

export default async function AdminMembersPage() {
  const members = await prisma.journalMember.findMany({
    orderBy: [{ group: "asc" }, { sortOrder: "asc" }, { name: "asc" }],
    select: {
      id: true,
      name: true,
      academicTitle: true,
      role: true,
      organization: true,
      bio: true,
      email: true,
      photoUrl: true,
      group: true,
      sortOrder: true,
      isActive: true,
    },
  });

  return (
    <div>
      <p className="section-kicker">Quản lý nội dung</p>
      <h1 className="mt-2 text-3xl font-extrabold text-[var(--uel-navy)]">Thành viên Chuyên san</h1>
      <p className="mt-2 text-sm text-[var(--muted)]">Quản lý Ban biên tập và nhân sự của bốn ban chuyên môn trên trang Giới thiệu.</p>
      <div className="mt-6"><MemberManager initialMembers={members} /></div>
    </div>
  );
}
