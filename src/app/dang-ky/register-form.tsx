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

type MatchWarnings = {
  email?: string;
  password?: string;
};

const professionLabels = [
  { value: "student", label: "Student" },
  { value: "lecturer", label: "Lecturer" },
  { value: "researcher", label: "Researcher" },
  { value: "practitioner", label: "Practitioner" },
  { value: "other", label: "Other" },
];

export function RegisterForm() {
  const [profession, setProfession] = useState("student");
  const [state, setState] = useState<RegisterState>({ status: "idle" });
  const [matchWarnings, setMatchWarnings] = useState<MatchWarnings>({});

  const fieldErrors = useMemo(() => state.fieldErrors ?? {}, [state]);

  function updateMatchWarnings(form: HTMLFormElement) {
    const email = String(new FormData(form).get("email") ?? "");
    const confirmEmail = String(new FormData(form).get("confirmEmail") ?? "");
    const password = String(new FormData(form).get("password") ?? "");
    const confirmPassword = String(new FormData(form).get("confirmPassword") ?? "");

    setMatchWarnings({
      email:
        email && confirmEmail && email.toLowerCase() !== confirmEmail.toLowerCase()
          ? "Email and confirm email must match."
          : undefined,
      password:
        password && confirmPassword && password !== confirmPassword
          ? "Password and confirm password must match."
          : undefined,
    });
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    updateMatchWarnings(event.currentTarget);
    setState({ status: "loading" });

    const form = new FormData(event.currentTarget);
    const payload = {
      email: String(form.get("email") ?? ""),
      confirmEmail: String(form.get("confirmEmail") ?? ""),
      firstName: String(form.get("firstName") ?? ""),
      lastName: String(form.get("lastName") ?? ""),
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
        message: "Please check the highlighted fields.",
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
        message: result?.error ?? "Unable to create account.",
        fieldErrors: result?.fieldErrors,
      });
      return;
    }

    setState({
      status: "success",
      message: result?.message ?? "Registration successful. Please verify your email.",
    });
    setMatchWarnings({});
    event.currentTarget.reset();
    setProfession("student");
  }

  return (
    <form
      onSubmit={onSubmit}
      onChange={(event) => updateMatchWarnings(event.currentTarget)}
      className="space-y-3"
      noValidate
    >
      <div className="grid gap-3 md:grid-cols-2">
        <Field
          name="email"
          label="Email"
          type="email"
          placeholder="your.name@university.edu"
          error={fieldErrors.email?.[0]}
        />
        <Field
          name="confirmEmail"
          label="Confirm email"
          type="email"
          placeholder="your.name@university.edu"
          error={matchWarnings.email ?? fieldErrors.confirmEmail?.[0]}
        />
        <Field
          name="firstName"
          label="First name"
          placeholder="Minh"
          error={fieldErrors.firstName?.[0]}
        />
        <Field
          name="lastName"
          label="Last name"
          placeholder="Nguyen"
          error={fieldErrors.lastName?.[0]}
        />
        <Field
          className="md:col-span-2"
          name="affiliation"
          label="Affiliation"
          placeholder="University of Economics and Law"
          error={fieldErrors.affiliation?.[0]}
        />
        <label className="block">
          <span className="text-xs font-bold text-[var(--uel-navy)]">Profession</span>
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
            <Field
              name="studentId"
              label="Student ID"
              placeholder="UEL20260001"
              error={fieldErrors.studentId?.[0]}
            />
            <Field
              name="major"
              label="Major"
              placeholder="Public policy"
              error={fieldErrors.major?.[0]}
            />
          </>
        )}
        <div className="grid gap-3 md:col-span-2 md:grid-cols-2">
          <Field
            name="password"
            label="Password"
            type="password"
            placeholder="At least 8 characters"
            error={fieldErrors.password?.[0]}
          />
          <Field
            name="confirmPassword"
            label="Confirm password"
            type="password"
            placeholder="Repeat your password"
            error={matchWarnings.password ?? fieldErrors.confirmPassword?.[0]}
          />
        </div>
      </div>

      <label className="flex gap-2 rounded-[4px] border border-[#dbe6f7] bg-[#fbfcff] p-3">
        <input className="mt-1" type="checkbox" name="termsAccepted" />
        <span className="text-xs leading-5 text-[var(--muted)]">
          I agree with the{" "}
          <Link className="font-bold text-[var(--nav-blue)]" href="/dieu-khoan" target="_blank">
            terms and conditions
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
        {state.status === "loading" ? "Creating account..." : "Create account"}
      </button>
    </form>
  );
}

function Field({
  name,
  label,
  type = "text",
  placeholder,
  error,
  className = "",
}: {
  name: string;
  label: string;
  type?: string;
  placeholder: string;
  error?: string;
  className?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="text-xs font-bold text-[var(--uel-navy)]">{label}</span>
      <input
        className="field mt-1 min-h-10 py-2 text-sm"
        name={name}
        type={type}
        required
        placeholder={placeholder}
      />
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
