"use client";

import { Camera, Link2, Mail, Phone, Save, UserRound } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";

type Profile = {
  name: string;
  email: string;
  role: string;
  phone: string | null;
  facebookUrl: string | null;
  organization: string | null;
  affiliation: string | null;
  profession: string | null;
  orcid: string | null;
  avatarId: string | null;
};

const roleLabels: Record<string, string> = { USER: "Người dùng", ADMIN: "Quản trị", EDITOR_IN_CHIEF: "Tổng biên tập", SECTION_EDITOR: "Biên tập viên", REVIEWER: "Phản biện", AUTHOR: "Tác giả" };
const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

export function ProfileForm({ initialProfile }: { initialProfile: Profile }) {
  const [form, setForm] = useState({
    name: initialProfile.name,
    phone: initialProfile.phone ?? "",
    facebookUrl: initialProfile.facebookUrl ?? "",
    organization: initialProfile.organization ?? "",
    affiliation: initialProfile.affiliation ?? "",
    profession: initialProfile.profession ?? "",
    orcid: initialProfile.orcid ?? "",
  });
  const [avatarUrl, setAvatarUrl] = useState(initialProfile.avatarId ? `/api/media/${initialProfile.avatarId}` : "");
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInput = useRef<HTMLInputElement>(null);

  async function save(event: React.FormEvent) {
    event.preventDefault();
    setSaving(true);
    setMessage("");
    const response = await fetch("/api/profile", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    const result = await response.json();
    setSaving(false);
    setMessage(response.ok ? "Đã cập nhật hồ sơ." : result.error ?? "Không thể cập nhật hồ sơ.");
  }

  async function upload(file: File) {
    if (!allowedTypes.includes(file.type)) { setMessage("Chỉ chấp nhận ảnh JPG, PNG hoặc WebP."); return; }
    if (file.size > 1024 * 1024) { setMessage("Ảnh đại diện không được vượt quá 1 MB."); return; }
    setUploading(true);
    setMessage("");
    const body = new FormData();
    body.set("avatar", file);
    const response = await fetch("/api/profile/avatar", { method: "POST", body });
    const result = await response.json();
    setUploading(false);
    if (!response.ok) { setMessage(result.error ?? "Không thể tải ảnh lên."); return; }
    setAvatarUrl(`${result.url}?v=${Date.now()}`);
    setMessage("Đã cập nhật ảnh đại diện.");
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
      <aside className="panel p-6">
        <div className="mx-auto size-40 overflow-hidden border border-[#cbd8e8] bg-[#eef3f8] shadow-[0_10px_28px_rgba(20,78,140,0.13)]">
          {avatarUrl ? <Image src={avatarUrl} alt={`Ảnh đại diện ${form.name}`} width={320} height={320} unoptimized className="size-full object-cover" /> : <div className="grid size-full place-items-center text-[#8298b0]"><UserRound size={58} strokeWidth={1.2} /></div>}
        </div>
        <input ref={fileInput} type="file" accept="image/jpeg,image/png,image/webp" className="sr-only" onChange={(event) => { const file = event.target.files?.[0]; if (file) upload(file); event.target.value = ""; }} />
        <button type="button" disabled={uploading} onClick={() => fileInput.current?.click()} className="mt-4 inline-flex h-10 w-full items-center justify-center gap-2 border border-[var(--uel-brand-blue)] text-sm font-bold text-[var(--uel-brand-blue)] hover:bg-[#edf4fb] disabled:opacity-60">
          <Camera size={17} /> {uploading ? "Đang tải ảnh..." : "Thay ảnh đại diện"}
        </button>
        <p className="mt-2 text-center text-[11px] leading-5 text-[var(--muted)]">JPG, PNG hoặc WebP · tối đa 1 MB</p>
        <div className="mt-6 border-t border-[#e2e8f0] pt-5">
          <p className="text-xs font-extrabold uppercase text-[var(--uel-gold)]">{roleLabels[initialProfile.role] ?? initialProfile.role}</p>
          <h2 className="uel-block-title mt-2 text-xl">{form.name}</h2>
          <p className="mt-2 flex items-center gap-2 text-xs text-[var(--muted)]"><Mail size={14} />{initialProfile.email}</p>
        </div>
      </aside>

      <form onSubmit={save} className="panel p-5 md:p-7">
        <div className="grid gap-5 md:grid-cols-2">
          <Field label="Họ và tên"><input className="field" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} required /></Field>
          <Field label="Chức danh / học vị"><input className="field" value={form.profession} onChange={(event) => setForm({ ...form, profession: event.target.value })} placeholder="PGS.TS., ThS., Chuyên viên..." /></Field>
          <Field label="Số điện thoại" icon={Phone}><input className="field" type="tel" value={form.phone} onChange={(event) => setForm({ ...form, phone: event.target.value })} /></Field>
          <Field label="Facebook" icon={Link2}><input className="field" type="url" value={form.facebookUrl} onChange={(event) => setForm({ ...form, facebookUrl: event.target.value })} placeholder="https://facebook.com/..." /></Field>
          <Field label="Đơn vị công tác"><input className="field" value={form.organization} onChange={(event) => setForm({ ...form, organization: event.target.value })} /></Field>
          <Field label="Đơn vị trực thuộc"><input className="field" value={form.affiliation} onChange={(event) => setForm({ ...form, affiliation: event.target.value })} /></Field>
          <Field label="ORCID"><input className="field" value={form.orcid} onChange={(event) => setForm({ ...form, orcid: event.target.value })} placeholder="0000-0000-0000-0000" /></Field>
        </div>
        {message ? <p className="mt-5 text-sm font-semibold text-[var(--uel-brand-blue)]">{message}</p> : null}
        <div className="mt-6 flex justify-end">
          <button disabled={saving} className="inline-flex h-11 items-center gap-2 bg-[var(--uel-brand-blue)] px-5 text-sm font-bold text-white hover:bg-[var(--uel-navy)] disabled:opacity-60"><Save size={17} />{saving ? "Đang lưu..." : "Lưu hồ sơ"}</button>
        </div>
      </form>
    </div>
  );
}

function Field({ label, icon: Icon, children }: { label: string; icon?: typeof Phone; children: React.ReactNode }) {
  return <label className="block"><span className="mb-1.5 flex items-center gap-1.5 text-xs font-bold text-[var(--uel-navy)]">{Icon ? <Icon size={14} /> : null}{label}</span>{children}</label>;
}
