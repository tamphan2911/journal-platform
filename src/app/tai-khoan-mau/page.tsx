import Link from "next/link";
import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/page-header";
import { StatusPill } from "@/components/status-pill";
import { demoAccounts } from "@/lib/demo-accounts";

export default function DemoAccountsPage() {
  return (
    <AppShell>
      <section className="mx-auto min-h-screen max-w-[1180px] px-4 py-8 md:px-8 lg:py-12">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <PageHeader
            kicker="Tài khoản mẫu"
            title="Email và mật khẩu để thử nghiệm phân quyền"
            description="Các tài khoản này được seed vào cơ sở dữ liệu với email đã xác minh. Đây là trang tạm thời để bạn kiểm tra site trong giai đoạn phát triển."
          />
          <Link
            href="/dang-nhap"
            className="rounded-[4px] bg-[var(--nav-blue)] px-4 py-3 text-sm font-extrabold text-white"
          >
            Đăng nhập
          </Link>
        </div>
        <div className="panel mt-8 overflow-hidden">
          <div className="grid grid-cols-[1fr_1fr_150px] gap-3 border-b border-[#dbe6f7] bg-[#fbfcff] px-5 py-3 text-xs font-extrabold uppercase text-[var(--muted)]">
            <span>Email</span>
            <span>Mật khẩu</span>
            <span>Vai trò</span>
          </div>
          <div className="divide-y divide-[#dbe6f7]">
            {demoAccounts.map((account) => (
              <article key={account.email} className="grid gap-3 px-5 py-4 md:grid-cols-[1fr_1fr_150px]">
                <div>
                  <p className="font-extrabold text-[var(--uel-navy)]">{account.email}</p>
                  <p className="mt-1 text-sm text-[var(--muted)]">{account.label}</p>
                </div>
                <code className="rounded-[4px] bg-[#eef4fb] px-3 py-2 text-sm font-bold text-[var(--uel-navy)]">
                  {account.password}
                </code>
                <div>
                  <StatusPill tone={account.role === "ADMIN" ? "dark" : "blue"}>{account.role}</StatusPill>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </AppShell>
  );
}
