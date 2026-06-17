import { BadgeCheck, Mail, University } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/page-header";
import { StatusPill } from "@/components/status-pill";

export default function ProfilePage() {
  return (
    <AppShell>
      <section className="mx-auto min-h-screen max-w-[1180px] px-4 py-8 md:px-8 lg:py-12">
        <PageHeader
          kicker="Hồ sơ cá nhân"
          title="Thông tin tài khoản và quyền truy cập"
          description="Trang hồ sơ sẽ lưu thông tin liên hệ, ORCID, chuyên môn, vai trò và trạng thái xác minh email."
        />
        <div className="mt-8 grid gap-6 lg:grid-cols-[360px_1fr]">
          <aside className="panel p-5">
            <div className="grid h-16 w-16 place-items-center rounded-[6px] bg-[var(--nav-blue)] font-serif text-xl font-extrabold text-white">
              NA
            </div>
            <h2 className="mt-4 font-serif text-2xl font-bold text-[var(--uel-navy)]">Nguyễn Minh Anh</h2>
            <p className="mt-2 text-sm text-[var(--muted)]">Tác giả</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <StatusPill tone="green">Email đã xác minh</StatusPill>
              <StatusPill tone="blue">AUTHOR</StatusPill>
            </div>
          </aside>
          <main className="panel p-5 md:p-6">
            <div className="grid gap-4 md:grid-cols-3">
              {[
                { label: "Email", value: "author@example.edu.vn", icon: Mail },
                { label: "Đơn vị", value: "Trường Đại học Khoa học", icon: University },
                { label: "ORCID", value: "0000-0002-1825-0097", icon: BadgeCheck },
              ].map((item) => {
                const Icon = item.icon;
                return (
                <div key={item.label} className="rounded-[4px] border border-[#dbe6f7] bg-white p-4">
                  <Icon className="text-[var(--nav-blue)]" size={20} />
                  <p className="mt-3 text-xs font-bold uppercase text-[var(--muted)]">{item.label}</p>
                  <p className="mt-1 font-bold text-[var(--uel-navy)]">{item.value}</p>
                </div>
                );
              })}
            </div>
          </main>
        </div>
      </section>
    </AppShell>
  );
}
