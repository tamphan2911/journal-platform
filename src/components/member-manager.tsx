"use client";

import { Pencil, Plus, Save, Trash2, X } from "lucide-react";
import { useMemo, useState } from "react";
import { memberGroupLabels, type MemberGroupValue } from "@/lib/member-types";

type MemberRecord = {
  id: string;
  name: string;
  academicTitle: string | null;
  role: string;
  organization: string | null;
  bio: string;
  email: string | null;
  photoUrl: string | null;
  group: MemberGroupValue;
  sortOrder: number;
  isActive: boolean;
};

const emptyForm = {
  name: "",
  academicTitle: "",
  role: "",
  organization: "",
  bio: "",
  email: "",
  photoUrl: "",
  group: "EDITORIAL_BOARD" as MemberGroupValue,
  sortOrder: 10,
  isActive: true,
};

export function MemberManager({ initialMembers }: { initialMembers: MemberRecord[] }) {
  const [members, setMembers] = useState(initialMembers);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);
  const selected = useMemo(() => members.find((member) => member.id === editingId), [editingId, members]);

  function createNew() {
    setEditingId(null);
    setForm(emptyForm);
    setMessage("");
  }

  function edit(member: MemberRecord) {
    setEditingId(member.id);
    setForm({
      name: member.name,
      academicTitle: member.academicTitle ?? "",
      role: member.role,
      organization: member.organization ?? "",
      bio: member.bio,
      email: member.email ?? "",
      photoUrl: member.photoUrl ?? "",
      group: member.group,
      sortOrder: member.sortOrder,
      isActive: member.isActive,
    });
    setMessage("");
  }

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setSaving(true);
    setMessage("");

    const response = await fetch(editingId ? `/api/admin/members/${editingId}` : "/api/admin/members", {
      method: editingId ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const result = await response.json();
    setSaving(false);

    if (!response.ok) {
      setMessage(result.error ?? "Không thể lưu thành viên.");
      return;
    }

    const member = result.member as MemberRecord;
    setMembers((current) =>
      editingId
        ? current.map((item) => (item.id === member.id ? member : item))
        : [...current, member],
    );
    setEditingId(member.id);
    setMessage("Đã lưu thay đổi.");
  }

  async function remove(member: MemberRecord) {
    if (!window.confirm(`Xóa thành viên “${member.name}”? Thao tác này không thể hoàn tác.`)) return;
    const response = await fetch(`/api/admin/members/${member.id}`, { method: "DELETE" });
    if (!response.ok) {
      setMessage("Không thể xóa thành viên.");
      return;
    }
    setMembers((current) => current.filter((item) => item.id !== member.id));
    if (editingId === member.id) createNew();
  }

  const orderedMembers = useMemo(
    () => [...members].sort((a, b) => a.group.localeCompare(b.group) || a.sortOrder - b.sortOrder || a.name.localeCompare(b.name, "vi")),
    [members],
  );

  return (
    <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_430px]">
      <section className="panel overflow-hidden">
        <div className="flex items-center justify-between gap-4 border-b border-[#dbe4ee] px-5 py-4">
          <div>
            <h2 className="uel-block-title text-xl">Danh sách thành viên</h2>
            <p className="mt-1 text-xs text-[var(--muted)]">{members.length} hồ sơ</p>
          </div>
          <button type="button" onClick={createNew} className="inline-flex items-center gap-2 bg-[var(--uel-brand-blue)] px-3 py-2 text-sm font-bold text-white">
            <Plus size={17} /> Thêm mới
          </button>
        </div>
        <div className="divide-y divide-[#e2e8f0]">
          {orderedMembers.map((member) => (
            <article
              key={member.id}
              className={`grid gap-3 px-5 py-4 md:grid-cols-[minmax(0,1fr)_170px_78px] ${editingId === member.id ? "bg-[#f2f7fc]" : "bg-white"}`}
            >
              <div className="min-w-0">
                <p className="font-bold text-[var(--uel-brand-blue)]">
                  {member.academicTitle ? `${member.academicTitle} ` : ""}{member.name}
                </p>
                <p className="mt-1 truncate text-xs text-[var(--muted)]">{member.role}</p>
              </div>
              <div className="self-start">
                <p className="text-xs font-bold text-[var(--uel-navy)]">{memberGroupLabels[member.group]}</p>
                <p className="mt-1 text-xs text-[var(--muted)]">Thứ tự {member.sortOrder} · {member.isActive ? "Đang hiện" : "Đang ẩn"}</p>
              </div>
              <div className="flex items-start justify-end gap-1">
                <button type="button" onClick={() => edit(member)} title="Chỉnh sửa" aria-label="Chỉnh sửa" className="grid size-8 place-items-center text-[var(--uel-brand-blue)]"><Pencil size={17} /></button>
                <button type="button" onClick={() => remove(member)} title="Xóa" aria-label="Xóa" className="grid size-8 place-items-center text-[#b42318]"><Trash2 size={17} /></button>
              </div>
            </article>
          ))}
          {!members.length ? <p className="p-8 text-center text-sm text-[var(--muted)]">Chưa có thành viên.</p> : null}
        </div>
      </section>

      <form onSubmit={submit} className="panel p-5 xl:sticky xl:top-[145px]">
        <div className="flex items-center justify-between gap-3">
          <h2 className="uel-block-title text-xl">{selected ? "Chỉnh sửa thành viên" : "Thêm thành viên"}</h2>
          {selected ? <button type="button" onClick={createNew} title="Đóng" aria-label="Đóng" className="grid size-8 place-items-center text-[var(--muted)]"><X size={18} /></button> : null}
        </div>
        <div className="mt-5 space-y-4">
          <div className="grid grid-cols-[100px_1fr] gap-3">
            <Field label="Học hàm/học vị"><input className="field" value={form.academicTitle} onChange={(event) => setForm({ ...form, academicTitle: event.target.value })} placeholder="PGS.TS." /></Field>
            <Field label="Họ và tên"><input className="field" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} required /></Field>
          </div>
          <Field label="Vai trò"><input className="field" value={form.role} onChange={(event) => setForm({ ...form, role: event.target.value })} required /></Field>
          <Field label="Nhóm">
            <select className="field" value={form.group} onChange={(event) => setForm({ ...form, group: event.target.value as MemberGroupValue })}>
              {Object.entries(memberGroupLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
            </select>
          </Field>
          <Field label="Đơn vị"><input className="field" value={form.organization} onChange={(event) => setForm({ ...form, organization: event.target.value })} /></Field>
          <Field label="Thông tin giới thiệu"><textarea className="field min-h-28 resize-y" value={form.bio} onChange={(event) => setForm({ ...form, bio: event.target.value })} required /></Field>
          <Field label="Email"><input className="field" type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} /></Field>
          <Field label="Đường dẫn ảnh"><input className="field" value={form.photoUrl} onChange={(event) => setForm({ ...form, photoUrl: event.target.value })} placeholder="/demo-members/member-01.jpg hoặc https://..." /></Field>
          <Field label="Thứ tự"><input className="field" type="number" min="0" max="9999" value={form.sortOrder} onChange={(event) => setForm({ ...form, sortOrder: Number(event.target.value) })} /></Field>
          <label className="flex items-center gap-3 text-sm font-semibold text-[var(--uel-navy)]">
            <input type="checkbox" checked={form.isActive} onChange={(event) => setForm({ ...form, isActive: event.target.checked })} className="size-4 accent-[var(--uel-brand-blue)]" />
            Hiển thị trên trang Giới thiệu
          </label>
        </div>
        {message ? <p className="mt-4 text-sm font-semibold text-[var(--uel-brand-blue)]">{message}</p> : null}
        <button disabled={saving} className="mt-5 inline-flex w-full items-center justify-center gap-2 bg-[var(--uel-brand-blue)] px-4 py-3 text-sm font-bold text-white disabled:opacity-60">
          <Save size={18} /> {saving ? "Đang lưu..." : "Lưu thành viên"}
        </button>
      </form>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="block"><span className="mb-1.5 block text-xs font-bold text-[var(--uel-navy)]">{label}</span>{children}</label>;
}
