"use client";

import { Send } from "lucide-react";
import { useState } from "react";

const inquiryTypes = [
  "Nộp bài và hồ sơ tác giả",
  "Phản biện và biên tập",
  "Xuất bản và bản quyền",
  "Hợp tác học thuật",
  "Hỗ trợ tài khoản",
  "Nội dung khác",
];

export function ContactForm({ recipientEmail }: { recipientEmail: string }) {
  const [form, setForm] = useState({ type: "", name: "", email: "", manuscriptCode: "", subject: "", message: "", consent: false });

  function submit(event: React.FormEvent) {
    event.preventDefault();
    const subject = `[${form.type}] ${form.subject}`;
    const body = [
      `Họ và tên: ${form.name}`,
      `Email liên hệ: ${form.email}`,
      form.manuscriptCode ? `Mã bản thảo: ${form.manuscriptCode}` : "",
      `Nhóm yêu cầu: ${form.type}`,
      "",
      form.message,
    ].filter(Boolean).join("\n");
    window.location.href = `mailto:${recipientEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  return (
    <form onSubmit={submit} className="panel overflow-hidden">
      <div className="border-t-4 border-[var(--uel-gold)] p-5 md:p-7">
        <p className="text-xs font-extrabold uppercase text-[var(--uel-brand-blue)]">Gửi yêu cầu</p>
        <h2 className="uel-block-title mt-2 text-2xl">Thông tin liên hệ</h2>
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <Field label="Họ và tên"><input className="field" required value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} autoComplete="name" /></Field>
          <Field label="Email"><input className="field" type="email" required value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} autoComplete="email" /></Field>
          <Field label="Nội dung cần hỗ trợ">
            <select className="field" required value={form.type} onChange={(event) => setForm({ ...form, type: event.target.value })}>
              <option value="">Chọn nhóm yêu cầu</option>
              {inquiryTypes.map((type) => <option key={type}>{type}</option>)}
            </select>
          </Field>
          <Field label="Mã bản thảo (nếu có)"><input className="field" value={form.manuscriptCode} onChange={(event) => setForm({ ...form, manuscriptCode: event.target.value })} placeholder="CS-2026-..." /></Field>
        </div>
        <Field label="Tiêu đề" className="mt-5"><input className="field" required maxLength={180} value={form.subject} onChange={(event) => setForm({ ...form, subject: event.target.value })} /></Field>
        <Field label="Nội dung" className="mt-5"><textarea className="field min-h-48 resize-y" required maxLength={3000} value={form.message} onChange={(event) => setForm({ ...form, message: event.target.value })} placeholder="Mô tả rõ nội dung cần hỗ trợ..." /></Field>
        <label className="mt-5 flex gap-3 border-l-4 border-[var(--uel-gold)] bg-[#fff9e9] p-4 text-sm leading-6 text-[var(--muted)]">
          <input type="checkbox" required checked={form.consent} onChange={(event) => setForm({ ...form, consent: event.target.checked })} className="mt-1 size-4 accent-[var(--uel-brand-blue)]" />
          Tôi đồng ý cung cấp thông tin trên để tòa soạn liên hệ và xử lý yêu cầu này.
        </label>
        <div className="mt-6 flex justify-end">
          <button className="inline-flex h-11 items-center gap-2 bg-[var(--uel-brand-blue)] px-5 text-sm font-bold text-white hover:bg-[var(--uel-navy)]">
            <Send size={17} /> Gửi liên hệ
          </button>
        </div>
      </div>
    </form>
  );
}

function Field({ label, children, className = "" }: { label: string; children: React.ReactNode; className?: string }) {
  return <label className={`block ${className}`}><span className="mb-1.5 block text-xs font-bold text-[var(--uel-navy)]">{label}</span>{children}</label>;
}
