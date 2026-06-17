import Link from "next/link";
import { AuthShell } from "@/components/auth-shell";

export default function LoginPage() {
  return (
    <AuthShell title="Đăng nhập" subtitle="Vào workspace theo vai trò học thuật của bạn.">
      <form className="space-y-4">
        <label className="block">
          <span className="text-sm font-bold text-[var(--uel-navy)]">Email</span>
          <input className="field mt-2" type="email" required placeholder="ten@truong.edu.vn" />
        </label>
        <label className="block">
          <span className="text-sm font-bold text-[var(--uel-navy)]">Mật khẩu</span>
          <input className="field mt-2" type="password" required placeholder="••••••••" />
        </label>
        <div className="flex items-center justify-between gap-3 text-sm">
          <Link className="font-bold text-[var(--nav-blue)]" href="/dat-lai-mat-khau">
            Quên mật khẩu?
          </Link>
          <Link className="font-bold text-[var(--nav-blue)]" href="/tai-khoan-mau">
            Tài khoản mẫu
          </Link>
        </div>
        <button className="w-full rounded-[4px] bg-[var(--nav-blue)] px-4 py-3 text-sm font-extrabold text-white">
          Đăng nhập
        </button>
      </form>
      <p className="mt-4 text-center text-sm text-[var(--muted)]">
        Chưa có tài khoản?{" "}
        <Link className="font-bold text-[var(--nav-blue)]" href="/dang-ky">
          Đăng ký
        </Link>
      </p>
    </AuthShell>
  );
}
