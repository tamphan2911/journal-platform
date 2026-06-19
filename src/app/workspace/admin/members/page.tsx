import { MemberManager } from "@/components/member-manager";
import { prisma } from "@/lib/prisma";

export default async function AdminMembersPage() {
  const members = await prisma.journalMember.findMany({
    orderBy: [{ term: "desc" }, { group: "asc" }, { sortOrder: "asc" }, { name: "asc" }],
    select: {
      id: true,
      userId: true,
      name: true,
      academicTitle: true,
      role: true,
      organization: true,
      bio: true,
      note: true,
      email: true,
      photoUrl: true,
      group: true,
      term: true,
      sortOrder: true,
      isActive: true,
      user: { select: { id: true, name: true, email: true, organization: true, profession: true, avatarId: true } },
    },
  });
  const users = await prisma.user.findMany({
    where: { isActive: true },
    orderBy: [{ name: "asc" }, { email: "asc" }],
    select: { id: true, name: true, email: true, organization: true, profession: true, avatarId: true },
  });

  return (
    <div>
      <p className="section-kicker">Quản lý nội dung</p>
      <h1 className="mt-2 text-3xl font-extrabold text-[var(--uel-navy)]">Thành viên Chuyên san</h1>
      <p className="mt-2 text-sm text-[var(--muted)]">Chọn tài khoản người dùng để phân công vào từng ban theo nhiệm kỳ.</p>
      <div className="mt-6"><MemberManager initialMembers={members} users={users} /></div>
    </div>
  );
}
