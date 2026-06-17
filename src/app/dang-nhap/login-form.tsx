"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { loginSchema } from "@/lib/auth-validation";

type LoginState =
  | { status: "idle"; message?: string }
  | { status: "loading"; message?: string }
  | { status: "error"; message: string };

export function LoginForm() {
  const router = useRouter();
  const [state, setState] = useState<LoginState>({ status: "idle" });

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState({ status: "loading" });

    const form = new FormData(event.currentTarget);
    const payload = {
      email: String(form.get("email") ?? ""),
      password: String(form.get("password") ?? ""),
    };

    const parsed = loginSchema.safeParse(payload);
    if (!parsed.success) {
      setState({
        status: "error",
        message: parsed.error.flatten().fieldErrors.email?.[0] ?? parsed.error.flatten().fieldErrors.password?.[0] ?? "Please check your login information.",
      });
      return;
    }

    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const result = await response.json();

    if (!response.ok) {
      setState({
        status: "error",
        message: result?.error ?? "Unable to log in.",
      });
      return;
    }

    router.push(result?.redirectTo ?? "/");
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate>
      <label className="block">
        <span className="text-sm font-bold text-[var(--uel-navy)]">Email</span>
        <input
          className="field mt-2"
          name="email"
          type="email"
          required
          placeholder="your.name@university.edu"
        />
      </label>
      <label className="block">
        <span className="text-sm font-bold text-[var(--uel-navy)]">Password</span>
        <input
          className="field mt-2"
          name="password"
          type="password"
          required
          placeholder="Enter your password"
        />
      </label>
      {state.status === "error" && (
        <p className="rounded-[4px] border border-[#ffd1cc] bg-[#fff5f3] px-3 py-2 text-sm font-bold text-[#b42318]">
          {state.message}
        </p>
      )}
      <button
        className="w-full rounded-[4px] bg-[var(--nav-blue)] px-4 py-3 text-sm font-extrabold text-white disabled:opacity-60"
        disabled={state.status === "loading"}
      >
        {state.status === "loading" ? "Logging in..." : "Log in"}
      </button>
    </form>
  );
}
