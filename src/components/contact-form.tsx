"use client";

import { Check, ChevronDown, Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";

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
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [typeError, setTypeError] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!dropdownOpen) return;
    function close(event: PointerEvent) { if (!dropdownRef.current?.contains(event.target as Node)) setDropdownOpen(false); }
    function escape(event: KeyboardEvent) { if (event.key === "Escape") setDropdownOpen(false); }
    document.addEventListener("pointerdown", close);
    document.addEventListener("keydown", escape);
    return () => { document.removeEventListener("pointerdown", close); document.removeEventListener("keydown", escape); };
  }, [dropdownOpen]);

  function submit(event: React.FormEvent) {
    event.preventDefault();
    if (!form.type) {
      setTypeError(true);
      setDropdownOpen(true);
      return;
    }
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
          <div ref={dropdownRef} className="relative">
            <span id="inquiry-type-label" className="mb-1.5 block text-xs font-bold text-[var(--uel-navy)]">Nội dung cần hỗ trợ</span>
            <button
              type="button"
              aria-labelledby="inquiry-type-label"
              aria-haspopup="listbox"
              aria-expanded={dropdownOpen}
              onClick={() => setDropdownOpen((value) => !value)}
              className={`flex h-11 w-full items-center justify-between border bg-white px-3 text-left text-sm outline-none transition-colors ${typeError ? "border-[#b42318]" : dropdownOpen ? "border-[var(--uel-brand-blue)]" : "border-[#c9d6e5] hover:border-[#8ca7c3]"}`}
            >
              <span className={form.type ? "font-semibold text-[var(--ink)]" : "text-[var(--muted)]"}>{form.type || "Chọn nhóm yêu cầu"}</span>
              <ChevronDown size={17} className={`shrink-0 text-[var(--uel-brand-blue)] transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
            </button>
            {dropdownOpen ? (
              <div role="listbox" aria-labelledby="inquiry-type-label" className="absolute inset-x-0 top-[calc(100%+6px)] z-30 border-t-3 border-[var(--uel-gold)] bg-white py-1 shadow-[0_16px_36px_rgba(0,43,92,0.18)]">
                {inquiryTypes.map((type) => {
                  const selected = form.type === type;
                  return (
                    <button
                      key={type}
                      type="button"
                      role="option"
                      aria-selected={selected}
                      onClick={() => { setForm({ ...form, type }); setTypeError(false); setDropdownOpen(false); }}
                      className={`flex min-h-10 w-full items-center justify-between gap-3 px-3 text-left text-sm transition-colors ${selected ? "bg-[#edf4fb] font-bold text-[var(--uel-brand-blue)]" : "text-[var(--ink)] hover:bg-[#f4f7fa] hover:text-[var(--uel-brand-blue)]"}`}
                    >
                      <span>{type}</span>{selected ? <Check size={16} className="shrink-0 text-[var(--uel-gold)]" /> : null}
                    </button>
                  );
                })}
              </div>
            ) : null}
            {typeError ? <p className="mt-1 text-xs font-semibold text-[#b42318]">Vui lòng chọn nhóm yêu cầu.</p> : null}
          </div>
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
