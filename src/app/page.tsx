import { BookOpenCheck, FileText, ShieldCheck } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { HeroSlider } from "@/components/hero-slider";
import { roleJurisdictions, workflow } from "@/lib/journal-data";

export default function Home() {
  return (
    <AppShell>
      <HeroSlider />

      <section className="mx-auto grid max-w-[1440px] gap-8 px-4 py-12 md:px-8 lg:grid-cols-[minmax(0,1fr)_380px] lg:py-16">
        <div className="space-y-6">
          <div className="panel p-5 md:p-7">
            <p className="section-kicker">Quy trình xuất bản</p>
            <h2 className="gold-rule mt-2 font-serif text-4xl font-bold text-[var(--uel-navy)]">
              Từ bản thảo đến công bố
            </h2>
            <div className="mt-8 grid gap-3 md:grid-cols-4">
              {workflow.map((step, index) => (
                <div key={step} className="rounded-[4px] border border-[#dbe4f1] bg-[#fbfcff] p-3">
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
                title: "Chuẩn học thuật",
                text: "Biểu mẫu metadata, phản biện kín và nhật ký quyết định được chuẩn hóa cho tòa soạn.",
                icon: ShieldCheck,
              },
              {
                title: "Hồ sơ minh bạch",
                text: "Tác giả, phản biện và biên tập viên theo dõi từng vòng xử lý trên cùng một nền tảng.",
                icon: FileText,
              },
              {
                title: "Lưu trữ dài hạn",
                text: "Số xuất bản, bài viết, tệp bản thảo và lịch sử xử lý được tổ chức cho tra cứu lâu dài.",
                icon: BookOpenCheck,
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <article key={item.title} className="panel p-5">
                  <Icon className="text-[var(--nav-blue)]" size={30} />
                  <h3 className="mt-4 font-serif text-2xl font-bold text-[var(--uel-navy)]">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{item.text}</p>
                </article>
              );
            })}
          </div>
        </div>

        <aside className="space-y-5">
          <div className="panel p-5">
            <h2 className="font-serif text-2xl font-bold text-[var(--uel-navy)]">Phân quyền học thuật</h2>
            <div className="mt-5 space-y-3">
              {roleJurisdictions.map((role) => {
                const Icon = role.icon;
                return (
                  <div key={role.code} className="grid grid-cols-[40px_1fr] gap-3 rounded-[4px] border border-[#dbe4f1] p-3">
                    <div className="grid h-10 w-10 place-items-center rounded-[4px] bg-[#e8f0fb] text-[var(--nav-blue)]">
                      <Icon size={20} />
                    </div>
                    <div>
                      <p className="font-bold">{role.role}</p>
                      <p className="mt-1 text-xs leading-5 text-[var(--muted)]">{role.scope}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </aside>
      </section>
    </AppShell>
  );
}
