"use client";

import { ExternalLink, FilePlus2, Pencil, Save, Trash2, X } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

type NewsRecord = {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  coverImage: string | null;
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
  publishedAt: string | null;
  updatedAt: string;
};

const emptyForm = {
  title: "",
  slug: "",
  summary: "",
  content: "",
  coverImage: "",
  status: "DRAFT" as NewsRecord["status"],
};

const statusLabels = { DRAFT: "Bản nháp", PUBLISHED: "Đã xuất bản", ARCHIVED: "Lưu trữ" };

export function NewsManager({ initialPosts }: { initialPosts: NewsRecord[] }) {
  const [posts, setPosts] = useState(initialPosts);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);
  const selected = useMemo(() => posts.find((post) => post.id === editingId), [editingId, posts]);

  function edit(post: NewsRecord) {
    setEditingId(post.id);
    setForm({
      title: post.title,
      slug: post.slug,
      summary: post.summary,
      content: post.content,
      coverImage: post.coverImage ?? "",
      status: post.status,
    });
    setMessage("");
  }

  function createNew() {
    setEditingId(null);
    setForm(emptyForm);
    setMessage("");
  }

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setSaving(true);
    setMessage("");
    const response = await fetch(editingId ? `/api/admin/news/${editingId}` : "/api/admin/news", {
      method: editingId ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const result = await response.json();
    setSaving(false);

    if (!response.ok) {
      setMessage(result.error ?? "Không thể lưu tin.");
      return;
    }

    const post = { ...result.post, publishedAt: result.post.publishedAt, updatedAt: result.post.updatedAt } as NewsRecord;
    setPosts((current) => editingId ? current.map((item) => item.id === post.id ? post : item) : [post, ...current]);
    setEditingId(post.id);
    setMessage("Đã lưu thay đổi.");
  }

  async function remove(post: NewsRecord) {
    if (!window.confirm(`Xóa tin “${post.title}”? Thao tác này không thể hoàn tác.`)) return;
    const response = await fetch(`/api/admin/news/${post.id}`, { method: "DELETE" });
    if (!response.ok) {
      setMessage("Không thể xóa tin.");
      return;
    }
    setPosts((current) => current.filter((item) => item.id !== post.id));
    if (editingId === post.id) createNew();
  }

  return (
    <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_430px]">
      <section className="panel overflow-hidden">
        <div className="flex items-center justify-between gap-4 border-b border-[#dbe4ee] px-5 py-4">
          <div>
            <h2 className="uel-block-title text-xl">Danh sách tin</h2>
            <p className="mt-1 text-xs text-[var(--muted)]">{posts.length} mục nội dung</p>
          </div>
          <button onClick={createNew} className="inline-flex items-center gap-2 bg-[var(--uel-brand-blue)] px-3 py-2 text-sm font-bold text-white">
            <FilePlus2 size={17} /> Tin mới
          </button>
        </div>
        <div className="divide-y divide-[#e2e8f0]">
          {posts.map((post) => (
            <article key={post.id} className={`grid gap-3 px-5 py-4 md:grid-cols-[1fr_120px_86px] ${editingId === post.id ? "bg-[#f2f7fc]" : "bg-white"}`}>
              <div className="min-w-0">
                <p className="truncate font-bold text-[var(--uel-brand-blue)]">{post.title}</p>
                <p className="mt-1 truncate text-xs text-[var(--muted)]">/{post.slug}</p>
              </div>
              <span className="self-start text-xs font-bold text-[var(--muted)]">{statusLabels[post.status]}</span>
              <div className="flex items-start justify-end gap-1">
                {post.status === "PUBLISHED" ? (
                  <Link href={`/tin-tuc/${post.slug}`} title="Xem tin" aria-label="Xem tin" className="grid size-8 place-items-center text-[var(--uel-brand-blue)]"><ExternalLink size={17} /></Link>
                ) : null}
                <button onClick={() => edit(post)} title="Chỉnh sửa" aria-label="Chỉnh sửa" className="grid size-8 place-items-center text-[var(--uel-brand-blue)]"><Pencil size={17} /></button>
                <button onClick={() => remove(post)} title="Xóa" aria-label="Xóa" className="grid size-8 place-items-center text-[#b42318]"><Trash2 size={17} /></button>
              </div>
            </article>
          ))}
          {!posts.length ? <p className="p-8 text-center text-sm text-[var(--muted)]">Chưa có tin tức.</p> : null}
        </div>
      </section>

      <form onSubmit={submit} className="panel p-5 xl:sticky xl:top-[145px]">
        <div className="flex items-center justify-between gap-3">
          <h2 className="uel-block-title text-xl">{selected ? "Chỉnh sửa tin" : "Tạo tin mới"}</h2>
          {selected ? <button type="button" onClick={createNew} title="Đóng" aria-label="Đóng" className="grid size-8 place-items-center text-[var(--muted)]"><X size={18} /></button> : null}
        </div>
        <div className="mt-5 space-y-4">
          <Field label="Tiêu đề"><input className="field" value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} required /></Field>
          <Field label="Đường dẫn"><input className="field" value={form.slug} onChange={(event) => setForm({ ...form, slug: event.target.value })} placeholder="Tự tạo từ tiêu đề" /></Field>
          <Field label="Tóm tắt"><textarea className="field min-h-24 resize-y" value={form.summary} onChange={(event) => setForm({ ...form, summary: event.target.value })} required /></Field>
          <Field label="Nội dung"><textarea className="field min-h-44 resize-y" value={form.content} onChange={(event) => setForm({ ...form, content: event.target.value })} required /></Field>
          <Field label="URL ảnh bìa"><input className="field" type="url" value={form.coverImage} onChange={(event) => setForm({ ...form, coverImage: event.target.value })} placeholder="https://..." /></Field>
          <Field label="Trạng thái">
            <select className="field" value={form.status} onChange={(event) => setForm({ ...form, status: event.target.value as NewsRecord["status"] })}>
              <option value="DRAFT">Bản nháp</option><option value="PUBLISHED">Đã xuất bản</option><option value="ARCHIVED">Lưu trữ</option>
            </select>
          </Field>
        </div>
        {message ? <p className="mt-4 text-sm font-semibold text-[var(--uel-brand-blue)]">{message}</p> : null}
        <button disabled={saving} className="mt-5 inline-flex w-full items-center justify-center gap-2 bg-[var(--uel-brand-blue)] px-4 py-3 text-sm font-bold text-white disabled:opacity-60">
          <Save size={18} /> {saving ? "Đang lưu..." : "Lưu tin"}
        </button>
      </form>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="block"><span className="mb-1.5 block text-xs font-bold text-[var(--uel-navy)]">{label}</span>{children}</label>;
}
