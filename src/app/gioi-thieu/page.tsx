import { AppShell } from "@/components/app-shell";
import { AboutTabs } from "@/components/about-tabs";
import { getJournalMembers } from "@/lib/journal-members";

export default async function AboutPage() {
  const members = await getJournalMembers();

  return (
    <AppShell>
      <section className="mx-auto min-h-screen max-w-[1320px] px-4 py-8 md:px-8 lg:py-12">
        <AboutTabs members={members} />
      </section>
    </AppShell>
  );
}
