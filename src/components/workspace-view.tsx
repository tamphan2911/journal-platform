import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/page-header";
import { StatusPill } from "@/components/status-pill";
import { manuscripts } from "@/lib/journal-data";

export function WorkspaceView({
  kicker,
  title,
  description,
  role,
  primaryAction,
  queues,
  tasks,
}: {
  kicker: string;
  title: string;
  description: string;
  role: string;
  primaryAction: { href: string; label: string };
  queues: { label: string; value: string; helper: string }[];
  tasks: string[];
}) {
  return (
    <AppShell>
      <section className="mx-auto min-h-screen w-full max-w-[1440px] px-4 py-8 md:px-8 lg:py-12">
        <div className="flex flex-wrap items-start justify-between gap-5">
          <PageHeader kicker={kicker} title={title} description={description} />
          <Link
            href={primaryAction.href}
            className="inline-flex items-center gap-2 rounded-[4px] bg-[var(--nav-blue)] px-4 py-3 text-sm font-extrabold text-white transition hover:bg-[var(--uel-navy)]"
          >
            {primaryAction.label}
            <ArrowRight size={17} />
          </Link>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {queues.map((queue) => (
            <div key={queue.label} className="panel p-5">
              <p className="text-sm font-bold text-[var(--muted)]">{queue.label}</p>
              <p className="mt-2 text-4xl font-extrabold text-[var(--uel-navy)]">{queue.value}</p>
              <p className="mt-2 text-sm text-[var(--muted)]">{queue.helper}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1.25fr)_360px]">
          <section className="panel overflow-hidden">
            <div className="border-b border-[#dbe6f7] bg-[#fbfcff] p-5">
              <h2 className="text-2xl font-bold text-[var(--uel-navy)]">Hồ sơ đang xử lý</h2>
            </div>
            <div className="divide-y divide-[#dbe6f7]">
              {manuscripts.map((item) => (
                <article key={item.code} className="grid gap-4 p-5 md:grid-cols-[1fr_150px_110px]">
                  <div>
                    <div className="mb-2 flex flex-wrap items-center gap-2">
                      <StatusPill tone={item.accent as "blue" | "cyan" | "green" | "dark"}>
                        {item.status}
                      </StatusPill>
                      <span className="text-xs font-bold text-[var(--muted)]">{item.code}</span>
                    </div>
                    <h3 className="text-lg font-extrabold leading-6 text-[var(--uel-navy)]">{item.title}</h3>
                    <p className="mt-2 text-sm text-[var(--muted)]">
                      {item.author} - {item.field}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-[var(--muted)]">Phản biện</p>
                    <p className="mt-2 text-xl font-extrabold">{item.reviews}</p>
                  </div>
                  <div>
                    <p className="text-xs text-[var(--muted)]">Hạn</p>
                    <p className="mt-2 text-sm font-bold">{item.due}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <aside className="panel p-5">
            <StatusPill tone="blue">{role}</StatusPill>
            <h2 className="mt-4 text-2xl font-bold text-[var(--uel-navy)]">
              Tác vụ ưu tiên
            </h2>
            <div className="mt-5 space-y-3">
              {tasks.map((task) => (
                <div key={task} className="flex gap-3 rounded-[4px] border border-[#dbe6f7] bg-white p-3">
                  <CheckCircle2 className="mt-0.5 shrink-0 text-[var(--green)]" size={18} />
                  <p className="text-sm leading-6 text-[var(--muted)]">{task}</p>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>
    </AppShell>
  );
}
