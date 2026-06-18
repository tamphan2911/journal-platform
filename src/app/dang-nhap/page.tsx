import Link from "next/link";
import { AuthShell } from "@/components/auth-shell";
import { LoginForm } from "./login-form";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next } = await searchParams;
  const redirectTo = next?.startsWith("/") && !next.startsWith("//") ? next : "/";

  return (
    <AuthShell title="Log in" subtitle="Access your academic journal workspace.">
      <LoginForm redirectTo={redirectTo} />
      <div className="mt-4 flex items-center justify-between gap-3 text-sm">
        <Link className="font-bold text-[var(--nav-blue)]" href="/dat-lai-mat-khau">
          Forgot password?
        </Link>
        <Link className="font-bold text-[var(--nav-blue)]" href="/tai-khoan-mau">
          Demo accounts
        </Link>
      </div>
      <p className="mt-4 text-center text-sm text-[var(--muted)]">
        No account yet?{" "}
        <Link className="font-bold text-[var(--nav-blue)]" href="/dang-ky">
          Register
        </Link>
      </p>
    </AuthShell>
  );
}
