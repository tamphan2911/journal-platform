import Link from "next/link";
import { AuthShell } from "@/components/auth-shell";
import { RegisterForm } from "./register-form";

export default function RegisterPage() {
  return (
    <AuthShell
      wide
      scrollable
      title="Đăng ký tài khoản"
      subtitle="Tài khoản mới cần xác minh email trước khi được kích hoạt."
    >
      <RegisterForm />
      <p className="mt-3 text-center text-xs text-[var(--muted)]">
        Đã có tài khoản?{" "}
        <Link className="font-bold text-[var(--nav-blue)]" href="/dang-nhap">
          Đăng nhập
        </Link>
      </p>
    </AuthShell>
  );
}
