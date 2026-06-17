import Link from "next/link";
import {
  ArrowRight,
  BookOpenCheck,
  CheckCircle2,
  Clock3,
  Database,
  FileText,
  GraduationCap,
  LibraryBig,
} from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { StatusPill } from "@/components/status-pill";
import { issueArticles, metrics, roles, workflow } from "@/lib/journal-data";

export default function Home() {
  return (
    <AppShell>
      <section className="academic-band text-white">
        <div className="mx-auto grid min-h-[620px] max-w-[1440px] gap-10 px-5 py-12 md:px-8 lg:grid-cols-[minmax(0,1fr)_430px] lg:px-12 lg:py-16">
          <div className="flex flex-col justify-between gap-12">
            <div className="max-w-5xl">
              <div className="mb-8 flex flex-wrap items-center gap-3">
                <span className="rounded-[4px] border border-white/25 bg-white/10 px-3 py-1.5 text-xs font-extrabold uppercase tracking-[0.12em] text-white">
                  Đại học Kinh tế - Luật
                </span>
                <span className="rounded-[4px] bg-[var(--uel-gold)] px-3 py-1.5 text-xs font-extrabold uppercase tracking-[0.12em] text-[var(--uel-navy)]">
                  Tạp chí học thuật
                </span>
              </div>
              <h1 className="max-w-5xl font-serif text-5xl font-extrabold leading-[1.04] md:text-7xl">
                Chuyên san Khoa học Kinh tế - Luật
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-white/82">
                Nền tảng xuất bản học thuật tiếng Việt cho nộp bài, phản biện,
                biên tập, quản trị hội đồng và lưu trữ số xuất bản trong lĩnh
                vực kinh tế, luật, quản trị và chính sách công.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/nop-bai"
                  className="inline-flex items-center gap-2 rounded-[4px] bg-[var(--uel-gold)] px-5 py-3 text-sm font-extrabold text-[var(--uel-navy)] shadow-lg shadow-black/15 transition hover:bg-[#ffc847]"
                >
                  Nộp bản thảo <ArrowRight size={17} />
                </Link>
                <Link
                  href="/luu-tru"
                  className="inline-flex items-center gap-2 rounded-[4px] border border-white/30 bg-white/10 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/16"
                >
                  Xem lưu trữ
                </Link>
              </div>
            </div>

            <div className="grid gap-3 md:grid-cols-4">
              {metrics.map((metric) => (
                <div
                  key={metric.label}
                  className="rounded-[6px] border border-white/14 bg-white/10 p-4 backdrop-blur"
                >
                  <p className="text-sm text-white/72">{metric.label}</p>
                  <p className="mt-3 text-4xl font-extrabold text-white">{metric.value}</p>
                  <p className="mt-2 text-xs text-white/66">{metric.helper}</p>
                </div>
              ))}
            </div>
          </div>

          <aside className="self-end rounded-[6px] border border-white/16 bg-white p-5 text-[var(--ink)] shadow-2xl shadow-black/24">
            <div className="flex items-start justify-between gap-4 border-b border-[#dbe4f1] pb-5">
              <div>
                <p className="section-kicker">Số hiện hành</p>
                <h2 className="mt-2 font-serif text-3xl font-bold text-[var(--uel-navy)]">
                  Tập 12, Số 2, 2026
                </h2>
                <p className="mt-2 text-sm text-[var(--muted)]">
                  Dữ liệu, chính sách và chuyển đổi số
                </p>
              </div>
              <LibraryBig className="text-[var(--nav-blue)]" size={30} />
            </div>

            <div className="mt-5 space-y-4">
              {issueArticles.slice(0, 3).map((article, index) => (
                <article key={article.title} className="grid grid-cols-[42px_1fr] gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-[4px] bg-[#e8f0fb] text-sm font-extrabold text-[var(--nav-blue)]">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <div>
                    <h3 className="text-sm font-extrabold leading-5 text-[var(--ink)]">
                      {article.title}
                    </h3>
                    <p className="mt-1 text-xs leading-5 text-[var(--muted)]">
                      {article.authors}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1440px] gap-8 px-5 py-12 md:px-8 lg:grid-cols-[minmax(0,1fr)_390px] lg:px-12 lg:py-16">
        <div className="space-y-8">
          <div className="panel p-5 md:p-7">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="section-kicker">Quy trình xuất bản</p>
                <h2 className="gold-rule mt-2 font-serif text-4xl font-bold text-[var(--uel-navy)]">
                  Từ bản thảo đến công bố
                </h2>
              </div>
              <BookOpenCheck className="text-[var(--nav-blue)]" size={34} />
            </div>
            <div className="mt-8 grid gap-3 md:grid-cols-7">
              {workflow.map((step, index) => (
                <div
                  key={step}
                  className="rounded-[4px] border border-[#dbe4f1] bg-[#fbfcff] p-3"
                >
                  <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-[4px] bg-[var(--uel-navy)] text-sm font-extrabold text-white">
                    {index + 1}
                  </div>
                  <p className="text-sm font-bold leading-5">{step}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {[
              {
                icon: GraduationCap,
                title: "Chuẩn học thuật",
                text: "Biểu mẫu metadata, phản biện kín và nhật ký quyết định được chuẩn hóa cho tòa soạn.",
              },
              {
                icon: FileText,
                title: "Hồ sơ minh bạch",
                text: "Tác giả, phản biện và biên tập viên theo dõi từng vòng xử lý trên cùng một nền tảng.",
              },
              {
                icon: Database,
                title: "Lưu trữ dài hạn",
                text: "Số xuất bản, bài viết, tệp bản thảo và lịch sử xử lý được tổ chức cho tra cứu lâu dài.",
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <article key={item.title} className="panel p-5">
                  <Icon className="text-[var(--nav-blue)]" size={30} />
                  <h3 className="mt-4 font-serif text-2xl font-bold text-[var(--uel-navy)]">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{item.text}</p>
                </article>
              );
            })}
          </div>
        </div>

        <aside className="space-y-5">
          <div className="panel p-5">
            <div className="mb-5 flex flex-wrap gap-2">
              <StatusPill tone="blue">ISSN 2815-2026</StatusPill>
              <StatusPill tone="cyan">Phản biện kín</StatusPill>
              <StatusPill tone="green">Xuất bản mở</StatusPill>
            </div>
            <h2 className="font-serif text-2xl font-bold text-[var(--uel-navy)]">
              Vai trò hệ thống
            </h2>
            <div className="mt-5 space-y-3">
              {roles.map((role) => {
                const Icon = role.icon;
                return (
                  <div
                    key={role.title}
                    className="grid grid-cols-[42px_1fr_auto] gap-3 rounded-[4px] border border-[#dbe4f1] p-3"
                  >
                    <div className="grid h-10 w-10 place-items-center rounded-[4px] bg-[#e8f0fb] text-[var(--nav-blue)]">
                      <Icon size={20} />
                    </div>
                    <div>
                      <p className="font-bold">{role.title}</p>
                      <p className="mt-1 text-xs leading-5 text-[var(--muted)]">
                        {role.detail}
                      </p>
                    </div>
                    <p className="text-xs font-bold text-[var(--nav-blue)]">{role.stats}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="panel p-4">
              <Clock3 className="text-[var(--cyan)]" />
              <p className="mt-3 text-2xl font-extrabold text-[var(--uel-navy)]">11 ngày</p>
              <p className="text-sm text-[var(--muted)]">sàng lọc trung vị</p>
            </div>
            <div className="panel p-4">
              <CheckCircle2 className="text-[var(--green)]" />
              <p className="mt-3 text-2xl font-extrabold text-[var(--uel-navy)]">94%</p>
              <p className="text-sm text-[var(--muted)]">hồ sơ đủ metadata</p>
            </div>
          </div>
        </aside>
      </section>
    </AppShell>
  );
}
