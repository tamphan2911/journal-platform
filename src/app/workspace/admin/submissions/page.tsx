import { SubmissionsManager } from "@/components/admin-record-managers";
import { prisma } from "@/lib/prisma";
export default async function AdminSubmissionsPage() { const items = await prisma.manuscript.findMany({ orderBy: { submittedAt: "desc" }, select: { id: true, code: true, title: true, status: true, field: true, author: { select: { name: true } } } }); return <div><p className="section-kicker">Quy trình học thuật</p><h1 className="mt-2 text-3xl font-extrabold text-[var(--uel-navy)]">Bản thảo</h1><div className="mt-6"><SubmissionsManager initialItems={items} /></div></div>; }
