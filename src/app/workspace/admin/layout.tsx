import { AppShell } from "@/components/app-shell";
import { AdminNav } from "@/components/admin-nav";
import { requireAdminPage } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await requireAdminPage();

  return (
    <AppShell>
      <div className="mx-auto grid min-h-[calc(100dvh-var(--site-header-height))] max-w-[1536px] lg:grid-cols-[250px_minmax(0,1fr)]">
        <aside className="border-b border-[#dbe4ee] bg-white px-4 py-4 lg:border-b-0 lg:border-r lg:px-5 lg:py-7">
          <div className="mb-5 hidden lg:block">
            <p className="text-xs font-extrabold uppercase text-[var(--uel-brand-blue)]">Admin console</p>
            <p className="mt-1 truncate text-xs text-[var(--muted)]">{user.email}</p>
          </div>
          <AdminNav />
        </aside>
        <main className="min-w-0 px-4 py-6 md:px-8 lg:py-8">{children}</main>
      </div>
    </AppShell>
  );
}
