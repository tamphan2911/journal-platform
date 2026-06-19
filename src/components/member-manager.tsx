"use client";

import { Pencil, Plus, Save, Trash2, UserRound, X } from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";
import { memberGroupLabels, type MemberGroupValue } from "@/lib/member-types";

type UserOption = {
  id: string;
  name: string;
  email: string;
  organization: string | null;
  profession: string | null;
  avatarId: string | null;
};

type MemberRecord = {
  id: string;
  userId: string | null;
  name: string;
  academicTitle: string | null;
  role: string;
  organization: string | null;
  bio: string;
  note: string | null;
  email: string | null;
  photoUrl: string | null;
  group: MemberGroupValue;
  term: string;
  sortOrder: number;
  isActive: boolean;
  user: UserOption | null;
};

const groups = Object.entries(memberGroupLabels) as Array<[MemberGroupValue, string]>;

function emptyForm(group: MemberGroupValue, term: string) {
  return { userId: "", role: "", note: "", group, term, sortOrder: 10, isActive: true };
}

export function MemberManager({ initialMembers, users }: { initialMembers: MemberRecord[]; users: UserOption[] }) {
  const [members, setMembers] = useState(initialMembers);
  const terms = useMemo(() => {
    const values = new Set(members.map((member) => member.term));
    values.add("2024-2025");
    return [...values].sort((a, b) => b.localeCompare(a, "vi", { numeric: true }));
  }, [members]);
  const [activeGroup, setActiveGroup] = useState<MemberGroupValue>("EDITORIAL_BOARD");
  const [activeTerm, setActiveTerm] = useState(terms[0]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(() => emptyForm("EDITORIAL_BOARD", terms[0]));
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);
  const selected = members.find((member) => member.id === editingId) ?? null;
  const visibleMembers = useMemo(
    () => members
      .filter((member) => member.group === activeGroup && member.term === activeTerm)
      .sort((a, b) => a.sortOrder - b.sortOrder || displayName(a).localeCompare(displayName(b), "vi")),
    [activeGroup, activeTerm, members],
  );

  function createNew() {
    setEditingId(null);
    setForm(emptyForm(activeGroup, activeTerm));
    setMessage("");
  }

  function edit(member: MemberRecord) {
    setEditingId(member.id);
    setForm({
      userId: member.userId ?? "",
      role: member.role,
      note: member.note ?? member.bio,
      group: member.group,
      term: member.term,
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
    setMembers((current) => editingId ? current.map((item) => item.id === member.id ? member : item) : [...current, member]);
    setActiveGroup(member.group);
    setActiveTerm(member.term);
    setEditingId(member.id);
    setMessage("Đã lưu phân công thành viên.");
  }

  async function remove(member: MemberRecord) {
    if (!window.confirm(`Xóa ${displayName(member)} khỏi ${memberGroupLabels[member.group]}?`)) return;
    const response = await fetch(`/api/admin/members/${member.id}`, { method: "DELETE" });
    if (!response.ok) {
      setMessage("Không thể xóa thành viên.");
      return;
    }
    setMembers((current) => current.filter((item) => item.id !== member.id));
    if (editingId === member.id) createNew();
  }

  return (
    <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_390px]">
      <section className="panel min-w-0 overflow-hidden">
        <div className="border-b border-[#d8e1ec] px-5 pt-4">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div className="flex min-w-0 flex-1 gap-1 overflow-x-auto" role="tablist" aria-label="Các ban của Chuyên san">
              {groups.map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  role="tab"
                  aria-selected={activeGroup === value}
                  onClick={() => { setActiveGroup(value); setEditingId(null); setForm(emptyForm(value, activeTerm)); }}
                  className={`min-h-12 shrink-0 border-b-3 px-3 text-sm font-bold transition-colors ${activeGroup === value ? "border-[var(--uel-gold)] text-[var(--uel-brand-blue)]" : "border-transparent text-[var(--muted)] hover:text-[var(--uel-brand-blue)]"}`}
                >
                  {label}
                </button>
              ))}
            </div>
            <label className="mb-2 flex shrink-0 items-center gap-2">
              <span className="text-xs font-bold text-[var(--muted)]">Nhiệm kỳ</span>
              <select className="h-9 border border-[#cbd8e8] bg-white px-3 text-sm font-bold text-[var(--uel-brand-blue)]" value={activeTerm} onChange={(event) => { setActiveTerm(event.target.value); setEditingId(null); setForm(emptyForm(activeGroup, event.target.value)); }}>
                {terms.map((term) => <option key={term}>{term}</option>)}
              </select>
            </label>
          </div>
        </div>

        <div className="flex items-center justify-between border-b border-[#e2e8f0] px-5 py-3">
          <p className="text-xs font-semibold text-[var(--muted)]">{visibleMembers.length} thành viên</p>
          <button type="button" onClick={createNew} className="inline-flex h-9 items-center gap-2 bg-[var(--uel-brand-blue)] px-3 text-sm font-bold text-white">
            <Plus size={16} /> Thêm thành viên
          </button>
        </div>

        <div className="divide-y divide-[#dbe4ee] px-5">
          {visibleMembers.map((member) => (
            <article key={member.id} className={`group grid grid-cols-[90px_minmax(0,1fr)_70px] gap-5 py-6 sm:grid-cols-[112px_minmax(0,1fr)_70px] ${editingId === member.id ? "bg-[#f7fafd]" : ""}`}>
              <MemberPortrait member={member} />
              <div className="min-w-0 self-center">
                <p className="text-xs font-extrabold uppercase text-[var(--uel-gold)]">{member.role}</p>
                <h2 className="uel-block-title mt-1 text-lg">{displayTitle(member)}{displayName(member)}</h2>
                <p className="mt-1 text-xs font-semibold text-[var(--uel-brand-blue)]">{displayOrganization(member) || "Chưa cập nhật đơn vị"}</p>
                {displayNote(member) ? <p className="uel-block-copy mt-3 text-sm leading-6">{displayNote(member)}</p> : null}
                <p className="mt-2 text-xs text-[var(--muted)]">Thứ tự {member.sortOrder} · {member.isActive ? "Đang hiển thị" : "Đang ẩn"}</p>
              </div>
              <div className="flex items-start justify-end gap-1">
                <button type="button" onClick={() => edit(member)} title="Chỉnh sửa" aria-label="Chỉnh sửa" className="grid size-8 place-items-center text-[var(--uel-brand-blue)]"><Pencil size={17} /></button>
                <button type="button" onClick={() => remove(member)} title="Xóa khỏi ban" aria-label="Xóa khỏi ban" className="grid size-8 place-items-center text-[#b42318]"><Trash2 size={17} /></button>
              </div>
            </article>
          ))}
          {!visibleMembers.length ? <p className="py-16 text-center text-sm text-[var(--muted)]">Chưa có thành viên trong ban và nhiệm kỳ này.</p> : null}
        </div>
      </section>

      <form onSubmit={submit} className="panel p-5 xl:sticky xl:top-[108px]">
        <div className="flex items-center justify-between gap-3">
          <h2 className="uel-block-title text-xl">{selected ? "Chỉnh sửa phân công" : "Thêm vào ban"}</h2>
          {selected ? <button type="button" onClick={createNew} title="Đóng" aria-label="Đóng" className="grid size-8 place-items-center text-[var(--muted)]"><X size={18} /></button> : null}
        </div>
        <div className="mt-5 space-y-4">
          <Field label="Người dùng">
            <select className="field" value={form.userId} onChange={(event) => setForm({ ...form, userId: event.target.value })} required>
              <option value="">Chọn tài khoản</option>
              {users.map((user) => <option key={user.id} value={user.id}>{user.name} · {user.email}</option>)}
            </select>
          </Field>
          <Field label="Ban">
            <select className="field" value={form.group} onChange={(event) => setForm({ ...form, group: event.target.value as MemberGroupValue })}>
              {groups.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
            </select>
          </Field>
          <Field label="Nhiệm kỳ"><input className="field" value={form.term} onChange={(event) => setForm({ ...form, term: event.target.value })} placeholder="2024-2025" pattern="[0-9]{4}-[0-9]{4}" required /></Field>
          <Field label="Vai trò trong ban"><input className="field" value={form.role} onChange={(event) => setForm({ ...form, role: event.target.value })} placeholder="Trưởng ban, Thành viên..." required /></Field>
          <Field label="Ghi chú"><textarea className="field min-h-32 resize-y" value={form.note} onChange={(event) => setForm({ ...form, note: event.target.value })} placeholder="Thông tin giới thiệu hoặc ghi chú nhiệm vụ của thành viên" /></Field>
          <Field label="Thứ tự hiển thị"><input className="field" type="number" min="0" max="9999" value={form.sortOrder} onChange={(event) => setForm({ ...form, sortOrder: Number(event.target.value) })} /></Field>
          <label className="flex items-center gap-3 text-sm font-semibold text-[var(--uel-navy)]">
            <input type="checkbox" checked={form.isActive} onChange={(event) => setForm({ ...form, isActive: event.target.checked })} className="size-4 accent-[var(--uel-brand-blue)]" />
            Hiển thị trên trang Giới thiệu
          </label>
        </div>
        {message ? <p className="mt-4 text-sm font-semibold text-[var(--uel-brand-blue)]">{message}</p> : null}
        <button disabled={saving} className="mt-5 inline-flex w-full items-center justify-center gap-2 bg-[var(--uel-brand-blue)] px-4 py-3 text-sm font-bold text-white disabled:opacity-60">
          <Save size={18} /> {saving ? "Đang lưu..." : "Lưu phân công"}
        </button>
      </form>
    </div>
  );
}

function displayName(member: MemberRecord) { return member.user?.name ?? member.name; }
function displayTitle(member: MemberRecord) { const title = member.user?.profession ?? member.academicTitle; return title ? `${title} ` : ""; }
function displayOrganization(member: MemberRecord) { return member.user?.organization ?? member.organization; }
function displayNote(member: MemberRecord) { return member.note || member.bio; }
function displayPhoto(member: MemberRecord) { return member.user?.avatarId ? `/api/media/${member.user.avatarId}` : member.photoUrl; }

function MemberPortrait({ member }: { member: MemberRecord }) {
  const photo = displayPhoto(member);
  return (
    <div className="relative self-start pb-2 pr-2">
      <span className="absolute bottom-0 right-0 h-[calc(100%-8px)] w-[calc(100%-8px)] border-b-2 border-r-2 border-[#9db4ce] bg-[#e8eff7]" />
      <div className="relative aspect-[4/5] overflow-hidden border border-[#c9d6e5] bg-[#eef3f8] p-1 shadow-[0_6px_18px_rgba(20,78,140,0.12)]">
        {photo ? <Image src={photo} alt={`Ảnh ${displayName(member)}`} width={224} height={280} unoptimized className="size-full object-cover object-top" /> : <div className="grid size-full place-items-center text-[#8298b0]"><UserRound size={34} strokeWidth={1.25} /></div>}
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="block"><span className="mb-1.5 block text-xs font-bold text-[var(--uel-navy)]">{label}</span>{children}</label>;
}
