import {
  Activity,
  BarChart3,
  CalendarClock,
  CheckCheck,
  FileText,
  MessageSquareText,
  Settings2,
} from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { StatusPill } from "@/components/status-pill";
import { adminTools, manuscripts } from "@/lib/journal-data";

export default function DashboardPage() {
  return (
    <AppShell>
      <section className="mx-auto min-h-screen w-full max-w-[1480px] px-5 py-8 md:px-8 lg:px-12 lg:py-12">
        <div className="flex flex-wrap items-start justify-between gap-5">
          <div>
            <p className="section-kicker">Bàn điều hành</p>
            <h1 className="gold-rule mt-2 font-serif text-5xl font-extrabold text-[var(--uel-navy)]">
              Quản lý bản thảo
            </h1>
            <p className="mt-4 max-w-2xl text-[var(--muted)]">
              Không gian làm việc cho tổng biên tập, biên tập viên chuyên mục,
              phản biện, tác giả và quản trị hệ thống.
            </p>
          </div>
          <div className="panel flex min-w-[280px] items-center gap-4 p-4">
            <div className="grid h-12 w-12 place-items-center rounded-[4px] bg-[#e8f0fb] text-[var(--nav-blue)]">
              <Activity />
            </div>
            <div>
              <p className="text-sm text-[var(--muted)]">Hàng đợi hôm nay</p>
              <p className="text-2xl font-extrabold text-[var(--uel-navy)]">18 tác vụ</p>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-[minmax(0,1.35fr)_minmax(320px,0.65fr)]">
          <div className="space-y-5">
            <div className="grid gap-5 md:grid-cols-3">
              <QueueCard
                icon={<FileText />}
                label="Bản thảo mới"
                value="35"
                helper="cần sàng lọc"
                tone="blue"
              />
              <QueueCard
                icon={<MessageSquareText />}
                label="Đang phản biện"
                value="21"
                helper="7 bản quá hạn"
                tone="cyan"
              />
              <QueueCard
                icon={<CheckCheck />}
                label="Sẵn sàng quyết định"
                value="09"
                helper="đủ nhận xét"
                tone="green"
              />
            </div>

            <div className="panel p-5 md:p-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="section-kicker">
                    Pipeline bản thảo
                  </p>
                  <h2 className="mt-2 font-serif text-3xl font-bold text-[var(--uel-navy)]">
                    Hồ sơ mới cập nhật
                  </h2>
                </div>
                <button className="rounded-[4px] border border-[#c9d7ef] bg-white px-4 py-2 text-sm font-bold text-[var(--nav-blue)] transition hover:border-[var(--nav-blue)] hover:bg-[#f8fbff]">
                  Lọc trạng thái
                </button>
              </div>
              <div className="mt-6 grid gap-4">
                {manuscripts.map((item) => (
                  <article
                    key={item.code}
                    className="grid gap-4 rounded-[4px] border border-[#dbe6f7] bg-white p-4 md:grid-cols-[1fr_160px_150px_110px]"
                  >
                    <div>
                      <div className="mb-2 flex flex-wrap items-center gap-2">
                        <StatusPill tone={item.accent as "blue" | "cyan" | "green" | "dark"}>
                          {item.status}
                        </StatusPill>
                        <span className="text-xs font-semibold text-[var(--muted)]">
                          {item.code}
                        </span>
                      </div>
                      <h3 className="text-lg font-extrabold leading-6 text-[var(--uel-navy)]">{item.title}</h3>
                      <p className="mt-2 text-sm text-[var(--muted)]">
                        {item.author} · {item.field}
                      </p>
                    </div>
                    <ProgressBar value={item.progress} />
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
            </div>
          </div>

          <aside className="space-y-5">
            <div className="panel p-5">
              <div className="flex items-center justify-between">
                <h2 className="font-serif text-2xl font-bold text-[var(--uel-navy)]">Quản trị</h2>
                <Settings2 className="text-[var(--nav-blue)]" />
              </div>
              <div className="mt-5 grid grid-cols-2 gap-3">
                {adminTools.map((tool) => {
                  const Icon = tool.icon;
                  return (
                    <div key={tool.label} className="rounded-[4px] border border-[#dbe6f7] p-4">
                      <Icon className="text-[var(--nav-blue)]" size={22} />
                      <p className="mt-4 text-3xl font-extrabold text-[var(--uel-navy)]">{tool.value}</p>
                      <p className="text-sm text-[var(--muted)]">{tool.label}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="panel p-5">
              <div className="flex items-center gap-3">
                <BarChart3 className="text-[var(--cyan)]" />
                <h2 className="font-serif text-2xl font-bold text-[var(--uel-navy)]">Chuyên mục</h2>
              </div>
              <div className="mt-5 space-y-3">
                {[
                  ["Quản trị công", "82%"],
                  ["Kinh tế số", "64%"],
                  ["Luật kinh tế", "58%"],
                  ["Tài chính", "71%"],
                ].map(([label, value]) => (
                  <div key={label}>
                    <div className="mb-2 flex justify-between text-sm">
                      <span className="font-semibold">{label}</span>
                      <span className="text-[var(--muted)]">{value}</span>
                    </div>
                    <div className="h-2 rounded-full bg-[#e7edf8]">
                      <div
                        className="h-2 rounded-full bg-[var(--nav-blue)]"
                        style={{ width: value }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="panel p-5">
              <div className="flex items-center gap-3">
                <CalendarClock className="text-[var(--green)]" />
                <h2 className="font-serif text-2xl font-bold text-[var(--uel-navy)]">Lịch biên tập</h2>
              </div>
              <div className="mt-5 space-y-3">
                {[
                  ["15/06", "Khóa phản biện số 2/2026"],
                  ["22/06", "Họp hội đồng biên tập"],
                  ["30/06", "Xuất bản trực tuyến"],
                ].map(([date, text]) => (
                  <div key={date} className="grid grid-cols-[64px_1fr] gap-3 rounded-[4px] border border-[#dbe6f7] p-3">
                    <span className="font-extrabold text-[var(--nav-blue)]">{date}</span>
                    <span className="text-sm text-[var(--muted)]">{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>
    </AppShell>
  );
}

function QueueCard({
  icon,
  label,
  value,
  helper,
  tone,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  helper: string;
  tone: "blue" | "cyan" | "green";
}) {
  const colors = {
    blue: "bg-[#e8f0fb] text-[var(--nav-blue)]",
    cyan: "bg-[#d7f8fb] text-[#147485]",
    green: "bg-[#d9f9df] text-[#216c37]",
  };

  return (
    <div className="panel p-5">
      <div className={`grid h-12 w-12 place-items-center rounded-[4px] ${colors[tone]}`}>
        {icon}
      </div>
      <p className="mt-5 text-sm text-[var(--muted)]">{label}</p>
      <p className="mt-2 text-5xl font-extrabold text-[var(--uel-navy)]">{value}</p>
      <p className="mt-2 text-sm text-[var(--muted)]">{helper}</p>
    </div>
  );
}

function ProgressBar({ value }: { value: number }) {
  return (
    <div>
      <div className="mb-2 flex justify-between text-xs text-[var(--muted)]">
        <span>Tiến độ</span>
        <span>{value}%</span>
      </div>
      <div className="h-3 rounded-full bg-[#edf2fb]">
        <div className="h-3 rounded-full bg-[var(--nav-blue)]" style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}
