import { redirect } from "next/navigation";
import { AppShell } from "@/components/app-shell";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";
import { SubmissionWizard } from "./submit-form";

export const dynamic = "force-dynamic";

export default async function SubmitPage({ searchParams }: { searchParams: Promise<{ id?: string }> }) {
  const user = await getCurrentUser();
  if (!user) redirect("/dang-nhap?next=/nop-bai");
  const { id } = await searchParams;
  const [issues, profile, draft] = await Promise.all([
    prisma.journalIssue.findMany({ where: { status: { not: "ARCHIVED" } }, orderBy: [{ year: "desc" }, { volume: "desc" }, { number: "desc" }], select: { id: true, volume: true, number: true, year: true, title: true, status: true } }),
    prisma.user.findUnique({ where: { id: user.id }, select: { firstName: true, lastName: true, name: true, email: true, organization: true } }),
    id ? prisma.manuscript.findFirst({
      where: { id, authorId: user.id, status: "DRAFT" },
      select: { id: true, code: true, title: true, field: true, issueId: true, declarations: true, submissionStep: true, abstract: true, keywords: true, funding: true, authorsConfirmed: true, files: { where: { kind: "MANUSCRIPT" }, take: 1, select: { fileName: true } }, contributors: { orderBy: { sortOrder: "asc" }, select: { firstName: true, middleLastName: true, email: true, affiliation: true, bio: true, isCorresponding: true } } },
    }) : null,
  ]);
  if (id && !draft) redirect("/dashboard");

  const defaultAuthor = {
    firstName: profile?.firstName || profile?.name.split(" ").at(-1) || "",
    middleLastName: profile?.lastName || profile?.name.split(" ").slice(0, -1).join(" ") || "",
    email: profile?.email ?? user.email,
    affiliation: profile?.organization ?? "",
    bio: "",
    isCorresponding: true,
  };

  return (
    <AppShell>
      <SubmissionWizard
        issues={issues}
        defaultAuthor={defaultAuthor}
        initialDraft={draft ? { ...draft, declarations: (draft.declarations ?? {}) as Record<string, boolean>, fileName: draft.files[0]?.fileName ?? null } : null}
      />
    </AppShell>
  );
}
