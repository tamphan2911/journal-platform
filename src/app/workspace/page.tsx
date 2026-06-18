import Link from "next/link";
import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/page-header";
import { roleJurisdictions, workspaceCards } from "@/lib/journal-data";

export default function WorkspacePage() {
  return (
    <AppShell>
      <section className="mx-auto min-h-screen max-w-[1320px] px-4 py-8 md:px-8 lg:py-12">
        <PageHeader
          kicker="Workspace"
          title="Không gian làm việc theo vai trò"
          description="Mỗi vai trò có khu vực xử lý riêng, chỉ nhìn thấy hồ sơ và hành động thuộc jurisdiction của mình."
        />
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {workspaceCards.map((card) => {
            const Icon = card.icon;
            return (
              <Link key={card.href} href={card.href} className="panel block p-5 transition hover:-translate-y-0.5 hover:border-[var(--nav-blue)]">
                <Icon className="text-[var(--nav-blue)]" size={28} />
                <h2 className="uel-block-title mt-4 text-2xl">{card.title}</h2>
                <p className="uel-block-copy mt-3 text-sm">{card.detail}</p>
              </Link>
            );
          })}
        </div>
        <div className="mt-6 panel p-5 md:p-6">
          <h2 className="uel-block-title text-3xl">Ma trận quyền chính</h2>
          <div className="mt-5 grid gap-4 lg:grid-cols-5">
            {roleJurisdictions.map((role) => (
              <article key={role.code} className="rounded-[4px] border border-[#dbe6f7] bg-white p-4">
                <p className="text-xs font-extrabold text-[var(--nav-blue)]">{role.code}</p>
                <h3 className="uel-block-title mt-2 text-xl">{role.role}</h3>
                <ul className="mt-3 space-y-2 text-sm leading-6 text-[var(--muted)]">
                  {role.permissions.slice(0, 3).map((permission) => (
                    <li key={permission}>{permission}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>
    </AppShell>
  );
}
