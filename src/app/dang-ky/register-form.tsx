"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { registerSchema } from "@/lib/auth-validation";

type FieldErrors = Partial<Record<string, string[]>>;

type RegisterState =
  | { status: "idle"; fieldErrors?: FieldErrors; message?: string }
  | { status: "loading"; fieldErrors?: FieldErrors; message?: string }
  | { status: "success"; message: string; fieldErrors?: FieldErrors }
  | { status: "error"; fieldErrors?: FieldErrors; message: string };

const professionLabels = [
  { value: "student", label: "Sinh viên" },
  { value: "lecturer", label: "Giảng viên" },
  { value: "researcher", label: "Nhà nghiên cứu" },
  { value: "practitioner", label: "Người hành nghề" },
  { value: "other", label: "Khác" },
];

export function RegisterForm() {
  const [profession, setProfession] = useState("student");
  const [state, setState] = useState<RegisterState>({ status: "idle" });

  const fieldErrors = useMemo(() => state.fieldErrors ?? {}, [state]);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState({ status: "loading" });

    const form = new FormData(event.currentTarget);
    const payload = {
      email: String(form.get("email") ?? ""),
      confirmEmail: String(form.get("confirmEmail") ?? ""),
      firstName: String(form.get("firstName") ?? ""),
      lastName: String(form.get("lastName") ?? ""),
      organization: String(form.get("organization") ?? ""),
      affiliation: String(form.get("affiliation") ?? ""),
      profession: String(form.get("profession") ?? ""),
      studentId: String(form.get("studentId") ?? ""),
      major: String(form.get("major") ?? ""),
      password: String(form.get("password") ?? ""),
      confirmPassword: String(form.get("confirmPassword") ?? ""),
      termsAccepted: form.get("termsAccepted") === "on",
    };

    const clientParsed = registerSchema.safeParse(payload);
    if (!clientParsed.success) {
      setState({
        status: "error",
        message: "Vui lòng kiểm tra các trường được đánh dấu.",
        fieldErrors: clientParsed.error.flatten().fieldErrors,
      });
      return;
    }

    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const result = await response.json();

    if (!response.ok) {
      setState({
        status: "error",
        message: result?.error ?? "Không thể tạo tài khoản.",
        fieldErrors: result?.fieldErrors,
      });
      return;
    }

    setState({
      status: "success",
      message: result?.message ?? "Đăng ký thành công. Vui lòng xác minh email.",
    });
    event.currentTarget.reset();
    setProfession("student");
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3" noValidate>
      <div className="grid gap-3 md:grid-cols-2">
        <Field name="email" label="Email" type="email" error={fieldErrors.email?.[0]} />
        <Field name="confirmEmail" label="Xác nhận email" type="email" error={fieldErrors.confirmEmail?.[0]} />
        <Field name="firstName" label="Tên" error={fieldErrors.firstName?.[0]} />
        <Field name="lastName" label="Họ" error={fieldErrors.lastName?.[0]} />
        <Field name="organization" label="Trường/đơn vị" error={fieldErrors.organization?.[0]} />
        <Field name="affiliation" label="Khoa/bộ phận" error={fieldErrors.affiliation?.[0]} />
        <label className="block">
          <span className="text-xs font-bold text-[var(--uel-navy)]">Nghề nghiệp</span>
          <select
            className="field mt-1 min-h-10 py-2 text-sm"
            name="profession"
            required
            value={profession}
            onChange={(event) => setProfession(event.target.value)}
          >
            {professionLabels.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
          <ErrorMessage message={fieldErrors.profession?.[0]} />
        </label>
        {profession === "student" && (
          <>
            <Field name="studentId" label="Mã số sinh viên" error={fieldErrors.studentId?.[0]} />
            <Field name="major" label="Ngành học" error={fieldErrors.major?.[0]} />
          </>
        )}
        <Field name="password" label="Mật khẩu" type="password" error={fieldErrors.password?.[0]} />
        <Field name="confirmPassword" label="Xác nhận mật khẩu" type="password" error={fieldErrors.confirmPassword?.[0]} />
      </div>

      <label className="flex gap-2 rounded-[4px] border border-[#dbe6f7] bg-[#fbfcff] p-3">
        <input className="mt-1" type="checkbox" name="termsAccepted" required />
        <span className="text-xs leading-5 text-[var(--muted)]">
          Tôi đồng ý với{" "}
          <Link className="font-bold text-[var(--nav-blue)]" href="/dieu-khoan" target="_blank">
            điều khoản và điều kiện
          </Link>
          .
          <ErrorMessage message={fieldErrors.termsAccepted?.[0]} />
        </span>
      </label>

      {state.status === "success" && (
        <p className="rounded-[4px] border border-[#bde8c7] bg-[#f0fff4] px-3 py-2 text-sm font-bold text-[#216c37]">
          {state.message}
        </p>
      )}
      {state.status === "error" && (
        <p className="rounded-[4px] border border-[#ffd1cc] bg-[#fff5f3] px-3 py-2 text-sm font-bold text-[#b42318]">
          {state.message}
        </p>
      )}

      <button
        className="w-full rounded-[4px] bg-[var(--nav-blue)] px-4 py-2.5 text-sm font-extrabold text-white transition hover:bg-[var(--uel-navy)] disabled:opacity-60"
        disabled={state.status === "loading"}
      >
        {state.status === "loading" ? "Đang tạo tài khoản..." : "Tạo tài khoản"}
      </button>
    </form>
  );
}

function Field({
  name,
  label,
  type = "text",
  error,
}: {
  name: string;
  label: string;
  type?: string;
  error?: string;
}) {
  return (
    <label className="block">
      <span className="text-xs font-bold text-[var(--uel-navy)]">{label}</span>
      <input className="field mt-1 min-h-10 py-2 text-sm" name={name} type={type} required />
      <ErrorMessage message={error} />
    </label>
  );
}

function ErrorMessage({ message }: { message?: string }) {
  if (!message) {
    return null;
  }

  return <span className="mt-1 block text-xs font-bold text-[#b42318]">{message}</span>;
}
