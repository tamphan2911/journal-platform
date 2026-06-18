import { UsersManager } from "@/components/admin-record-managers";
import { prisma } from "@/lib/prisma";
export default async function AdminUsersPage() { const users = await prisma.user.findMany({ orderBy: { createdAt: "desc" }, select: { id: true, name: true, email: true, role: true, isActive: true, organization: true } }); return <AdminPage eyebrow="Tài khoản & phân quyền" title="Người dùng"><UsersManager initialUsers={users} /></AdminPage>; }
function AdminPage({ eyebrow, title, children }: { eyebrow: string; title: string; children: React.ReactNode }) { return <div><p className="section-kicker">{eyebrow}</p><h1 className="mt-2 text-3xl font-extrabold text-[var(--uel-navy)]">{title}</h1><div className="mt-6">{children}</div></div>; }
