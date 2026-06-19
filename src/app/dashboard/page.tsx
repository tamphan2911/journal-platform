import { redirect } from "next/navigation";
import { AppShell } from "@/components/app-shell";
import { AuthorDashboard } from "@/components/author-dashboard";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/dang-nhap?next=/dashboard");
  const manuscripts = await prisma.manuscript.findMany({
    where: { authorId: user.id },
    orderBy: { updatedAt: "desc" },
    select: { id: true, code: true, title: true, field: true, status: true, submissionStep: true, updatedAt: true, completedAt: true, issue: { select: { volume: true, number: true, year: true } }, _count: { select: { contributors: true, reviews: true } } },
  });
  return <AppShell><AuthorDashboard manuscripts={manuscripts.map((item) => ({ ...item, updatedAt: item.updatedAt.toISOString(), completedAt: item.completedAt?.toISOString() ?? null }))} /></AppShell>;
}
