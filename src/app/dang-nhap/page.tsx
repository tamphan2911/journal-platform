import Link from "next/link";
import { LockKeyhole } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/page-header";

export default function LoginPage() {
  return (
    <AppShell>
      <section className="mx-auto grid min-h-screen max-w-[1180px] gap-8 px-4 py-8 md:px-8 lg:grid-cols-[1fr_420px] lg:py-12">
        <PageHeader
          kicker="Đăng nhập"
          title="Vào không gian làm việc của tạp chí"
          description="Tài khoản được dùng cho tác giả, phản biện, biên tập viên, tổng biên tập và quản trị hệ thống."
        />
        <form className="panel p-5 md:p-6">
          <LockKeyhole className="text-[var(--nav-blue)]" />
          <label className="mt-5 block">
            <span className="text-sm font-bold text-[var(--uel-navy)]">Email</span>
            <input className="field mt-2" type="email" placeholder="ten@truong.edu.vn" />
          </label>
          <label className="mt-5 block">
            <span className="text-sm font-bold text-[var(--uel-navy)]">Mật khẩu</span>
            <input className="field mt-2" type="password" placeholder="••••••••" />
          </label>
          <button className="mt-6 w-full rounded-[4px] bg-[var(--nav-blue)] px-4 py-3 text-sm font-extrabold text-white">
            Đăng nhập
          </button>
          <p className="mt-4 text-sm text-[var(--muted)]">
            Chưa có tài khoản?{" "}
            <Link className="font-bold text-[var(--nav-blue)]" href="/dang-ky">
              Đăng ký tại đây
            </Link>
          </p>
        </form>
      </section>
    </AppShell>
  );
}
