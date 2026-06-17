"use client";

import { useState } from "react";
import { resetRequestSchema } from "@/lib/auth-validation";

type ResetState =
  | { status: "idle"; message?: string; error?: string }
  | { status: "loading"; message?: string; error?: string }
  | { status: "success"; message: string }
  | { status: "error"; error: string };

export function ResetPasswordForm() {
  const [state, setState] = useState<ResetState>({ status: "idle" });

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState({ status: "loading" });
    const form = new FormData(event.currentTarget);
    const payload = { email: String(form.get("email") ?? "") };
    const parsed = resetRequestSchema.safeParse(payload);

    if (!parsed.success) {
      setState({ status: "error", error: parsed.error.flatten().fieldErrors.email?.[0] ?? "Email chưa hợp lệ." });
      return;
    }

    const response = await fetch("/api/auth/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const result = await response.json();

    if (!response.ok) {
      setState({ status: "error", error: result?.error ?? "Không thể gửi yêu cầu đặt lại mật khẩu." });
      return;
    }

    setState({ status: "success", message: result.message });
    event.currentTarget.reset();
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <label className="block">
        <span className="text-sm font-bold text-[var(--uel-navy)]">Email tài khoản</span>
        <input className="field mt-2" type="email" name="email" required placeholder="ten@truong.edu.vn" />
      </label>
      {state.status === "success" && (
        <p className="rounded-[4px] border border-[#bde8c7] bg-[#f0fff4] px-3 py-2 text-sm font-bold text-[#216c37]">
          {state.message}
        </p>
      )}
      {state.status === "error" && (
        <p className="rounded-[4px] border border-[#ffd1cc] bg-[#fff5f3] px-3 py-2 text-sm font-bold text-[#b42318]">
          {state.error}
        </p>
      )}
      <button
        className="w-full rounded-[4px] bg-[var(--nav-blue)] px-4 py-3 text-sm font-extrabold text-white disabled:opacity-60"
        disabled={state.status === "loading"}
      >
        {state.status === "loading" ? "Đang gửi..." : "Gửi hướng dẫn đặt lại"}
      </button>
    </form>
  );
}
