"use client";

import { Plus, Save } from "lucide-react";
import { useState } from "react";

const roleLabels: Record<string, string> = {
  USER: "Người dùng", ADMIN: "Quản trị", EDITOR_IN_CHIEF: "Tổng biên tập", SECTION_EDITOR: "Biên tập viên", REVIEWER: "Phản biện", AUTHOR: "Tác giả",
};
const roles = Object.keys(roleLabels);
const manuscriptStatuses = ["DRAFT", "SUBMITTED", "SCREENING", "ASSIGNED", "UNDER_REVIEW", "REVISION_REQUESTED", "REVISED", "ACCEPTED", "REJECTED", "PUBLISHED"];
const issueStatuses = ["DRAFT", "OPEN", "PUBLISHED", "ARCHIVED"];

export function UsersManager({ initialUsers }: { initialUsers: Array<{ id: string; name: string; email: string; role: string; isActive: boolean; organization: string | null; phone: string | null; facebookUrl: string | null }> }) {
  const [users, setUsers] = useState(initialUsers);
  const [message, setMessage] = useState("");
  async function update(user: (typeof users)[number]) {
    const response = await fetch(`/api/admin/users/${user.id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ role: user.role, isActive: user.isActive }) });
    const result = await response.json();
    setMessage(response.ok ? `Đã cập nhật ${user.email}.` : result.error ?? "Không thể cập nhật.");
  }
  return (
    <AdminTable headers={["Người dùng", "Đơn vị", "Liên hệ", "Vai trò", "Hoạt động", ""]} message={message}>
      {users.map((user) => (
        <tr key={user.id} className="border-t border-[#e2e8f0] align-top">
          <Cell><p className="font-bold text-[var(--uel-brand-blue)]">{user.name}</p><p className="mt-1 text-xs text-[var(--muted)]">{user.email}</p></Cell>
          <Cell>{user.organization ?? "-"}</Cell>
          <Cell><p>{user.phone ?? "-"}</p>{user.facebookUrl ? <a href={user.facebookUrl} target="_blank" rel="noreferrer" className="mt-1 inline-block text-xs font-semibold text-[var(--uel-brand-blue)] hover:underline">Facebook</a> : null}</Cell>
          <Cell><select className="field min-w-40" value={user.role} onChange={(event) => setUsers((current) => current.map((item) => item.id === user.id ? { ...item, role: event.target.value } : item))}>{roles.map((role) => <option key={role} value={role}>{roleLabels[role]}</option>)}</select></Cell>
          <Cell><label className="inline-flex items-center gap-2"><input type="checkbox" checked={user.isActive} onChange={(event) => setUsers((current) => current.map((item) => item.id === user.id ? { ...item, isActive: event.target.checked } : item))} />{user.isActive ? "Có" : "Không"}</label></Cell>
          <Cell><SaveButton onClick={() => update(user)} /></Cell>
        </tr>
      ))}
    </AdminTable>
  );
}

export function SubmissionsManager({ initialItems }: { initialItems: Array<{ id: string; code: string; title: string; status: string; field: string; author: { name: string } }> }) {
  const [items, setItems] = useState(initialItems);
  const [message, setMessage] = useState("");
  async function update(item: (typeof items)[number]) {
    const response = await fetch(`/api/admin/submissions/${item.id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status: item.status }) });
    const result = await response.json();
    setMessage(response.ok ? `Đã cập nhật ${item.code}.` : result.error ?? "Không thể cập nhật.");
  }
  return (
    <AdminTable headers={["Mã", "Bản thảo", "Tác giả", "Lĩnh vực", "Trạng thái", ""]} message={message}>
      {items.map((item) => <tr key={item.id} className="border-t border-[#e2e8f0] align-top"><Cell><strong>{item.code}</strong></Cell><Cell><p className="max-w-sm font-bold text-[var(--uel-brand-blue)]">{item.title}</p></Cell><Cell>{item.author.name}</Cell><Cell>{item.field}</Cell><Cell><select className="field min-w-48" value={item.status} onChange={(event) => setItems((current) => current.map((candidate) => candidate.id === item.id ? { ...candidate, status: event.target.value } : candidate))}>{manuscriptStatuses.map((status) => <option key={status}>{status}</option>)}</select></Cell><Cell><SaveButton onClick={() => update(item)} /></Cell></tr>)}
    </AdminTable>
  );
}

type ArticleItem = { id: string; title: string; slug: string; pages: string | null; doi: string | null; pdfUrl: string | null; issue: { volume: number; number: number; year: number } };
export function ArticlesManager({ initialItems }: { initialItems: ArticleItem[] }) {
  const [items, setItems] = useState(initialItems);
  const [message, setMessage] = useState("");
  async function update(item: ArticleItem) {
    const response = await fetch(`/api/admin/articles/${item.id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ title: item.title, pages: item.pages ?? "", doi: item.doi ?? "", pdfUrl: item.pdfUrl ?? "" }) });
    const result = await response.json();
    setMessage(response.ok ? `Đã cập nhật “${item.title}”.` : result.error ?? "Không thể cập nhật.");
  }
  return (
    <AdminTable headers={["Bài viết", "Tập / số", "Trang", "DOI", "PDF", ""]} message={message}>
      {items.map((item) => <tr key={item.id} className="border-t border-[#e2e8f0] align-top"><Cell><input className="field min-w-72" value={item.title} onChange={(event) => setItems((current) => current.map((candidate) => candidate.id === item.id ? { ...candidate, title: event.target.value } : candidate))} /><p className="mt-1 text-xs text-[var(--muted)]">/{item.slug}</p></Cell><Cell>T{item.issue.volume} · S{item.issue.number}/{item.issue.year}</Cell><Cell><input className="field w-24" value={item.pages ?? ""} onChange={(event) => setItems((current) => current.map((candidate) => candidate.id === item.id ? { ...candidate, pages: event.target.value } : candidate))} /></Cell><Cell><input className="field min-w-40" value={item.doi ?? ""} onChange={(event) => setItems((current) => current.map((candidate) => candidate.id === item.id ? { ...candidate, doi: event.target.value } : candidate))} /></Cell><Cell><input className="field min-w-48" value={item.pdfUrl ?? ""} onChange={(event) => setItems((current) => current.map((candidate) => candidate.id === item.id ? { ...candidate, pdfUrl: event.target.value } : candidate))} /></Cell><Cell><SaveButton onClick={() => update(item)} /></Cell></tr>)}
      {!items.length ? <EmptyRow colSpan={6} text="Chưa có bài xuất bản trong cơ sở dữ liệu." /> : null}
    </AdminTable>
  );
}

type IssueItem = { id: string; volume: number; number: number; year: number; title: string; theme: string | null; status: string; articleCount: number };
export function IssuesManager({ initialItems }: { initialItems: IssueItem[] }) {
  const [items, setItems] = useState(initialItems);
  const [form, setForm] = useState({ volume: 1, number: 1, year: new Date().getFullYear(), title: "", theme: "" });
  const [message, setMessage] = useState("");
  async function create(event: React.FormEvent) {
    event.preventDefault();
    const response = await fetch("/api/admin/issues", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    const result = await response.json();
    if (response.ok) { setItems((current) => [{ ...result.issue, articleCount: 0 }, ...current]); setForm({ ...form, number: form.number + 1, title: "", theme: "" }); }
    setMessage(response.ok ? "Đã tạo số xuất bản." : result.error ?? "Không thể tạo số.");
  }
  async function update(item: IssueItem) {
    const response = await fetch(`/api/admin/issues/${item.id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ title: item.title, theme: item.theme ?? "", status: item.status }) });
    const result = await response.json();
    setMessage(response.ok ? `Đã cập nhật Tập ${item.volume}, Số ${item.number}.` : result.error ?? "Không thể cập nhật.");
  }
  return (
    <div className="space-y-5">
      <form onSubmit={create} className="panel grid gap-3 p-5 md:grid-cols-[90px_90px_110px_1fr_1fr_auto] md:items-end">
        <NumberField label="Tập" value={form.volume} onChange={(value) => setForm({ ...form, volume: value })} /><NumberField label="Số" value={form.number} onChange={(value) => setForm({ ...form, number: value })} /><NumberField label="Năm" value={form.year} onChange={(value) => setForm({ ...form, year: value })} />
        <TextField label="Tiêu đề" value={form.title} onChange={(value) => setForm({ ...form, title: value })} /><TextField label="Chủ đề" value={form.theme} onChange={(value) => setForm({ ...form, theme: value })} />
        <button className="inline-flex h-11 items-center gap-2 bg-[var(--uel-brand-blue)] px-4 text-sm font-bold text-white"><Plus size={17} />Tạo</button>
      </form>
      <AdminTable headers={["Tập / số", "Tiêu đề", "Chủ đề", "Bài", "Trạng thái", ""]} message={message}>
        {items.map((item) => <tr key={item.id} className="border-t border-[#e2e8f0] align-top"><Cell><strong>T{item.volume} · S{item.number}/{item.year}</strong></Cell><Cell><input className="field min-w-56" value={item.title} onChange={(event) => setItems((current) => current.map((candidate) => candidate.id === item.id ? { ...candidate, title: event.target.value } : candidate))} /></Cell><Cell><input className="field min-w-56" value={item.theme ?? ""} onChange={(event) => setItems((current) => current.map((candidate) => candidate.id === item.id ? { ...candidate, theme: event.target.value } : candidate))} /></Cell><Cell>{item.articleCount}</Cell><Cell><select className="field min-w-36" value={item.status} onChange={(event) => setItems((current) => current.map((candidate) => candidate.id === item.id ? { ...candidate, status: event.target.value } : candidate))}>{issueStatuses.map((status) => <option key={status}>{status}</option>)}</select></Cell><Cell><SaveButton onClick={() => update(item)} /></Cell></tr>)}
      </AdminTable>
    </div>
  );
}

function AdminTable({ headers, message, children }: { headers: string[]; message: string; children: React.ReactNode }) {
  return <section className="panel overflow-hidden"><div className="flex min-h-11 items-center justify-end border-b border-[#e2e8f0] px-4">{message ? <p className="text-xs font-semibold text-[var(--uel-brand-blue)]">{message}</p> : null}</div><div className="overflow-x-auto"><table className="w-full border-collapse text-left text-sm"><thead className="bg-[#f7f9fb] text-xs uppercase text-[var(--muted)]"><tr>{headers.map((header, index) => <th key={`${header}-${index}`} className="px-4 py-3 font-bold">{header}</th>)}</tr></thead><tbody>{children}</tbody></table></div></section>;
}
function Cell({ children }: { children: React.ReactNode }) { return <td className="px-4 py-4 text-sm text-[var(--ink)]">{children}</td>; }
function SaveButton({ onClick }: { onClick: () => void }) { return <button onClick={onClick} title="Lưu" aria-label="Lưu" className="grid size-9 place-items-center text-[var(--uel-brand-blue)]"><Save size={18} /></button>; }
function EmptyRow({ colSpan, text }: { colSpan: number; text: string }) { return <tr><td colSpan={colSpan} className="px-4 py-10 text-center text-sm text-[var(--muted)]">{text}</td></tr>; }
function NumberField({ label, value, onChange }: { label: string; value: number; onChange: (value: number) => void }) { return <label><span className="mb-1 block text-xs font-bold">{label}</span><input className="field" type="number" min={1} value={value} onChange={(event) => onChange(Number(event.target.value))} required /></label>; }
function TextField({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) { return <label><span className="mb-1 block text-xs font-bold">{label}</span><input className="field" value={value} onChange={(event) => onChange(event.target.value)} required={label === "Tiêu đề"} /></label>; }
