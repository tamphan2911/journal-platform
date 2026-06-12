import Link from "next/link";
import {
  ArrowRight,
  BookOpenCheck,
  CheckCircle2,
  Clock3,
  Database,
} from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { StatusPill } from "@/components/status-pill";
import { issueArticles, metrics, roles, workflow } from "@/lib/journal-data";

export default function Home() {
  return (
    <AppShell>
      <section className="mx-auto grid min-h-screen w-full max-w-[1480px] gap-8 px-5 py-8 md:px-8 lg:grid-cols-[minmax(0,1fr)_420px] lg:px-12 lg:py-12">
        <div className="flex flex-col justify-between gap-10">
          <div className="max-w-5xl">
            <div className="mb-8 flex flex-wrap items-center gap-3">
              <StatusPill tone="blue">ISSN 2815-2026</StatusPill>
              <StatusPill tone="cyan">Phản biện kín</StatusPill>
              <StatusPill tone="green">Xuất bản mở</StatusPill>
            </div>
            <h1 className="max-w-4xl font-serif text-5xl font-extrabold leading-[1.04] text-black md:text-7xl">
              Chuyên san Khoa học
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--muted)]">
              Nền tảng tạp chí học thuật tiếng Việt cho nộp bài, phản biện,
              biên tập, quản trị hội đồng và lưu trữ số xuất bản.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/nop-bai"
                className="inline-flex items-center gap-2 rounded-md bg-[var(--nav-blue)] px-5 py-3 text-sm font-bold text-white shadow-lg shadow-[#354f96]/24 transition hover:bg-[#263f80]"
              >
                Nộp bản thảo <ArrowRight size={17} />
              </Link>
              <Link
                href="/luu-tru"
                className="inline-flex items-center gap-2 rounded-md border border-[#c9d7ef] bg-white px-5 py-3 text-sm font-bold text-[var(--nav-blue)] transition hover:border-[var(--nav-blue)]"
              >
                Xem lưu trữ
              </Link>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-4">
            {metrics.map((metric) => (
              <div key={metric.label} className="panel p-5">
                <p className="text-sm text-[var(--muted)]">{metric.label}</p>
                <p className="mt-3 text-4xl font-extrabold text-black">{metric.value}</p>
                <p className="mt-2 text-sm text-[var(--muted)]">{metric.helper}</p>
              </div>
            ))}
          </div>

          <div className="panel p-5 md:p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-sm font-bold uppercase text-[var(--nav-blue)]">
                  Quy trình xuất bản
                </p>
                <h2 className="mt-2 font-serif text-3xl font-bold text-black">
                  Từ bản thảo đến bài xuất bản
                </h2>
              </div>
              <BookOpenCheck className="text-[var(--nav-blue)]" size={34} />
            </div>
            <div className="mt-6 grid gap-3 md:grid-cols-7">
              {workflow.map((step, index) => (
                <div key={step} className="rounded-md border border-[#dbe6f7] bg-[#f8fbff] p-3">
                  <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-md bg-[#dbe8ff] text-sm font-extrabold text-[var(--nav-blue)]">
                    {index + 1}
                  </div>
                  <p className="text-sm font-semibold leading-5">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <aside className="space-y-5">
          <div className="panel overflow-hidden">
            <div className="border-b border-[#dbe6f7] bg-[#f8fbff] p-5">
              <p className="text-sm text-[var(--muted)]">Số hiện hành</p>
              <h2 className="mt-2 font-serif text-2xl font-bold text-black">
                Tập 12, Số 2, 2026
              </h2>
            </div>
            <div className="p-5">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="text-5xl font-extrabold text-black">04</p>
                  <p className="text-sm text-[var(--muted)]">bài đã duyệt</p>
                </div>
                <div className="relative grid h-28 w-28 place-items-center rounded-full border-[16px] border-[#edf2fb]">
                  <div className="absolute inset-[-16px] rounded-full border-[16px] border-transparent border-t-[var(--nav-blue)] border-r-[var(--nav-blue)]" />
                  <span className="text-xl font-bold">72%</span>
                </div>
              </div>
              <div className="space-y-3">
                {issueArticles.slice(0, 3).map((article) => (
                  <div key={article.title} className="rounded-md border border-[#dbe6f7] p-3">
                    <p className="text-sm font-bold leading-5">{article.title}</p>
                    <p className="mt-2 text-xs text-[var(--muted)]">{article.authors}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="panel p-5">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-2xl font-bold text-black">Vai trò hệ thống</h2>
              <Database className="text-[var(--nav-blue)]" />
            </div>
            <div className="mt-5 space-y-3">
              {roles.map((role) => {
                const Icon = role.icon;
                return (
                  <div key={role.title} className="grid grid-cols-[42px_1fr_auto] gap-3 rounded-md border border-[#dbe6f7] p-3">
                    <div className="grid h-10 w-10 place-items-center rounded-md bg-[#eaf1ff] text-[var(--nav-blue)]">
                      <Icon size={20} />
                    </div>
                    <div>
                      <p className="font-bold">{role.title}</p>
                      <p className="mt-1 text-xs leading-5 text-[var(--muted)]">{role.detail}</p>
                    </div>
                    <p className="text-xs font-bold text-[var(--nav-blue)]">{role.stats}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="panel p-4">
              <Clock3 className="text-[#4fd0df]" />
              <p className="mt-3 text-2xl font-extrabold">11 ngày</p>
              <p className="text-sm text-[var(--muted)]">sàng lọc trung vị</p>
            </div>
            <div className="panel p-4">
              <CheckCircle2 className="text-[#39a852]" />
              <p className="mt-3 text-2xl font-extrabold">94%</p>
              <p className="text-sm text-[var(--muted)]">hồ sơ đủ metadata</p>
            </div>
          </div>
        </aside>
      </section>
    </AppShell>
  );
}
