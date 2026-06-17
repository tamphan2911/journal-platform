import Link from "next/link";
import { AuthShell } from "@/components/auth-shell";
import { ResetPasswordForm } from "./reset-password-form";

export default function ResetPasswordPage() {
  return (
    <AuthShell title="Đặt lại mật khẩu" subtitle="Nhập email để nhận liên kết đặt lại mật khẩu.">
      <ResetPasswordForm />
      <p className="mt-4 text-center text-sm text-[var(--muted)]">
        Nhớ mật khẩu?{" "}
        <Link className="font-bold text-[var(--nav-blue)]" href="/dang-nhap">
          Đăng nhập
        </Link>
      </p>
    </AuthShell>
  );
}
