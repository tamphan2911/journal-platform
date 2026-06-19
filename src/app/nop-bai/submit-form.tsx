"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp, Check, Plus, ShieldCheck, Trash2, UploadCloud, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo, useRef, useState } from "react";

type Author = { firstName: string; middleLastName: string; email: string; affiliation: string; bio: string | null; isCorresponding: boolean };
type Issue = { id: string; volume: number; number: number; year: number; title: string; status: string };
type Draft = { id: string; code: string; title: string; field: string; issueId: string | null; declarations: Record<string, boolean>; submissionStep: number; abstract: string; keywords: string[]; funding: string | null; authorsConfirmed: boolean; fileName: string | null; contributors: Author[] };

const sections = ["Tài chính", "Ngân hàng", "Công nghệ tài chính", "Tài chính định lượng", "Quản trị tài chính", "Nghiên cứu liên ngành"];
const declarations = [
  ["copyright", "Tôi xác nhận có quyền nộp bản thảo và đồng ý chính sách bản quyền của Chuyên san."],
  ["originality", "Bản thảo là công trình nguyên gốc, chưa công bố và không đồng thời gửi nơi khác."],
  ["plagiarismCheck", "Tôi đã kiểm tra đạo văn và chịu trách nhiệm về tính liêm chính học thuật."],
  ["aiUse", "Tôi đã khai báo đầy đủ việc sử dụng công cụ AI, nếu có, trong bản thảo."],
  ["conflictOfInterest", "Tôi đã khai báo mọi xung đột lợi ích tài chính hoặc phi tài chính."],
  ["publicationEthics", "Tôi đã đọc và đồng ý tuân thủ quy định đạo đức xuất bản."],
] as const;
const steps = ["Thông tin", "Bản thảo", "Tác giả", "Metadata"];

export function SubmissionWizard({ issues, defaultAuthor, initialDraft }: { issues: Issue[]; defaultAuthor: Author; initialDraft: Draft | null }) {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);
  const [id, setId] = useState(initialDraft?.id ?? "");
  const [step, setStep] = useState(initialDraft?.submissionStep ?? 1);
  const [maxStep, setMaxStep] = useState(initialDraft?.submissionStep ?? 1);
  const [info, setInfo] = useState({ issueId: initialDraft?.issueId ?? issues[0]?.id ?? "", section: initialDraft?.field ?? "", title: initialDraft?.title ?? "", declarations: Object.fromEntries(declarations.map(([key]) => [key, initialDraft?.declarations[key] ?? false])) as Record<string, boolean> });
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState(initialDraft?.fileName ?? "");
  const [authors, setAuthors] = useState<Author[]>(initialDraft?.contributors.length ? initialDraft.contributors : [defaultAuthor]);
  const [authorsConfirmed, setAuthorsConfirmed] = useState(initialDraft?.authorsConfirmed ?? false);
  const [metadata, setMetadata] = useState({ abstract: initialDraft?.abstract ?? "", keywords: initialDraft?.keywords.join(", ") ?? "", funding: initialDraft?.funding ?? "" });
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const wordCount = useMemo(() => metadata.abstract.trim() ? metadata.abstract.trim().split(/\s+/u).length : 0, [metadata.abstract]);

  async function saveInfo(event: React.FormEvent) {
    event.preventDefault(); setBusy(true); setMessage("");
    const response = await fetch("/api/submissions", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ manuscriptId: id || undefined, ...info }) });
    const result = await response.json(); setBusy(false);
    if (!response.ok) return setMessage(result.error ?? "Không thể tạo bản thảo.");
    setId(result.id); setStep(2); setMaxStep(Math.max(maxStep, 2)); router.replace(`/nop-bai?id=${result.id}`);
  }

  async function upload(event: React.FormEvent) {
    event.preventDefault();
    if (!file && fileName) { setStep(3); setMaxStep(Math.max(maxStep, 3)); return; }
    if (!file) return setMessage("Vui lòng chọn tệp Word.");
    if (file.size > 2 * 1024 * 1024) return setMessage("Tệp bản thảo không được vượt quá 2 MB.");
    setBusy(true); setMessage(""); const body = new FormData(); body.set("manuscript", file);
    const response = await fetch(`/api/submissions/${id}/manuscript`, { method: "POST", body }); const result = await response.json(); setBusy(false);
    if (!response.ok) return setMessage(result.error ?? "Không thể tải bản thảo.");
    setFileName(result.fileName); setFile(null); setStep(3); setMaxStep(Math.max(maxStep, 3));
  }

  async function saveAuthors(event: React.FormEvent) {
    event.preventDefault(); setBusy(true); setMessage("");
    const response = await fetch(`/api/submissions/${id}/authors`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ authors, confirmed: authorsConfirmed }) }); const result = await response.json(); setBusy(false);
    if (!response.ok) return setMessage(result.error ?? "Thông tin tác giả chưa hợp lệ.");
    setStep(4); setMaxStep(4);
  }

  async function finish() {
    setBusy(true); setMessage("");
    const keywords = metadata.keywords.split(",").map((item) => item.trim()).filter(Boolean);
    const response = await fetch(`/api/submissions/${id}/finalize`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ abstract: metadata.abstract, keywords, funding: metadata.funding }) }); const result = await response.json(); setBusy(false);
    if (!response.ok) { setConfirmOpen(false); return setMessage(result.error ?? "Không thể hoàn tất bản thảo."); }
    router.push(`/nop-bai/hoan-tat/${id}`);
  }

  function updateAuthor(index: number, patch: Partial<Author>) { setAuthors((current) => current.map((author, i) => i === index ? { ...author, ...patch } : author)); setAuthorsConfirmed(false); }
  function moveAuthor(index: number, direction: -1 | 1) { const next = [...authors]; const target = index + direction; if (target < 0 || target >= next.length) return; [next[index], next[target]] = [next[target], next[index]]; setAuthors(next); setAuthorsConfirmed(false); }
  function addAuthor() { setAuthors([...authors, { firstName: "", middleLastName: "", email: "", affiliation: "", bio: "", isCorresponding: false }]); setAuthorsConfirmed(false); }

  return (
    <section className="mx-auto min-h-[calc(100dvh-var(--site-header-height))] max-w-[1180px] px-4 py-8 md:px-8 lg:py-12">
      <div className="max-w-3xl"><p className="section-kicker">Cổng nộp bài</p><h1 className="mt-2 text-3xl font-extrabold text-[var(--uel-navy)] md:text-4xl">Nộp bản thảo mới</h1><p className="mt-3 text-sm leading-6 text-[var(--muted)]">Hồ sơ được lưu dưới dạng chưa hoàn tất sau bước đầu tiên. Bạn có thể tiếp tục từ Dashboard.</p></div>
      <ol className="mt-7 grid grid-cols-4 border-y border-[#d8e1ec] bg-white">
        {steps.map((label, index) => { const number = index + 1; const done = maxStep > number; const active = step === number; return <li key={label}><button type="button" disabled={number > maxStep} onClick={() => setStep(number)} className={`flex min-h-16 w-full items-center gap-2 border-b-3 px-2 text-left text-xs font-bold md:px-4 md:text-sm ${active ? "border-[var(--uel-gold)] text-[var(--uel-brand-blue)]" : "border-transparent text-[var(--muted)]"}`}><span className={`grid size-7 shrink-0 place-items-center rounded-full ${done ? "bg-[#267447] text-white" : active ? "bg-[var(--uel-brand-blue)] text-white" : "bg-[#e9eef4]"}`}>{done ? <Check size={15} /> : number}</span><span className="hidden sm:block">{label}</span></button></li>; })}
      </ol>
      <div className="mt-6 panel p-5 md:p-8">
        {step === 1 ? <StepInfo info={info} setInfo={setInfo} issues={issues} onSubmit={saveInfo} busy={busy} /> : null}
        {step === 2 ? <StepFile file={file} fileName={fileName} setFile={setFile} fileRef={fileRef} onSubmit={upload} onBack={() => setStep(1)} busy={busy} /> : null}
        {step === 3 ? <StepAuthors authors={authors} confirmed={authorsConfirmed} setConfirmed={setAuthorsConfirmed} update={updateAuthor} move={moveAuthor} add={addAuthor} remove={(i: number) => { if (authors.length > 1) setAuthors(authors.filter((_: Author, index: number) => index !== i)); }} onSubmit={saveAuthors} onBack={() => setStep(2)} busy={busy} /> : null}
        {step === 4 ? <StepMetadata metadata={metadata} setMetadata={setMetadata} wordCount={wordCount} onBack={() => setStep(3)} onConfirm={() => setConfirmOpen(true)} busy={busy} /> : null}
        {message ? <p className="mt-5 border-l-3 border-[#b42318] bg-[#fff5f2] px-4 py-3 text-sm font-semibold text-[#9f2f22]">{message}</p> : null}
      </div>
      {confirmOpen ? <ConfirmDialog title={info.title} busy={busy} onClose={() => setConfirmOpen(false)} onConfirm={finish} /> : null}
    </section>
  );
}

function StepInfo({ info, setInfo, issues, onSubmit, busy }: any) { return <form onSubmit={onSubmit}><StepHeading number="01" title="Thông tin bản thảo" detail="Chọn số xuất bản, chuyên mục và xác nhận các yêu cầu trước khi bắt đầu." /><div className="mt-6 grid gap-5 md:grid-cols-2"><Field label="Số xuất bản"><select className="field" required value={info.issueId} onChange={(e) => setInfo({ ...info, issueId: e.target.value })}><option value="">Chọn số xuất bản</option>{issues.map((issue: Issue) => <option key={issue.id} value={issue.id}>Tập {issue.volume}, Số {issue.number}/{issue.year} · {issue.title}</option>)}</select></Field><Field label="Chuyên mục"><select className="field" required value={info.section} onChange={(e) => setInfo({ ...info, section: e.target.value })}><option value="">Chọn chuyên mục</option>{sections.map((item) => <option key={item}>{item}</option>)}</select></Field></div><Field label="Tiêu đề bản thảo" className="mt-5"><input className="field" required minLength={10} value={info.title} onChange={(e) => setInfo({ ...info, title: e.target.value })} /></Field><div className="mt-7 border-t border-[#dbe4ee] pt-5"><h3 className="font-bold text-[var(--uel-navy)]">Cam kết trước khi nộp</h3><div className="mt-3 space-y-2">{declarations.map(([key, label]) => <label key={key} className="flex gap-3 border border-[#e0e7ef] p-3 text-sm leading-6 text-[var(--muted)]"><input type="checkbox" required checked={info.declarations[key]} onChange={(e) => setInfo({ ...info, declarations: { ...info.declarations, [key]: e.target.checked } })} className="mt-1 size-4 accent-[var(--uel-brand-blue)]" />{label}</label>)}</div></div><NextButton busy={busy} /></form>; }

function StepFile({ file, fileName, setFile, fileRef, onSubmit, onBack, busy }: any) { return <form onSubmit={onSubmit}><StepHeading number="02" title="Tải bản thảo ẩn danh" detail="Tệp này được gửi cho phản biện viên trong quy trình phản biện kín." /><div className="mt-6 border-l-4 border-[var(--uel-gold)] bg-[#fff9e9] p-4"><p className="font-bold text-[var(--uel-navy)]">Yêu cầu ẩn danh bắt buộc</p><p className="mt-2 text-sm leading-6 text-[var(--muted)]">Hãy xóa tên tác giả, đơn vị công tác, lời cảm ơn và mọi thông tin có thể nhận diện tác giả hoặc tổ chức khỏi tệp bản thảo để tránh xung đột lợi ích trong phản biện.</p></div><input ref={fileRef} type="file" accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" className="sr-only" onChange={(e) => setFile(e.target.files?.[0] ?? null)} /><button type="button" onClick={() => fileRef.current?.click()} className="mt-6 flex min-h-44 w-full flex-col items-center justify-center border border-dashed border-[#9eb2ca] bg-[#f7f9fc] p-6 text-center hover:border-[var(--uel-brand-blue)]"><UploadCloud size={34} className="text-[var(--uel-brand-blue)]" /><span className="mt-3 font-bold text-[var(--uel-navy)]">{file?.name || fileName || "Chọn tệp Word"}</span><span className="mt-1 text-xs text-[var(--muted)]">Chỉ .doc hoặc .docx · tối đa 2 MB</span></button><NavButtons onBack={onBack} busy={busy} label="Tiếp tục đến tác giả" /></form>; }

function StepAuthors({ authors, confirmed, setConfirmed, update, move, add, remove, onSubmit, onBack, busy }: any) { return <form onSubmit={onSubmit}><div className="flex flex-wrap items-start justify-between gap-4"><StepHeading number="03" title="Thông tin tác giả" detail="Thêm đầy đủ tác giả theo đúng thứ tự xuất hiện trên bài viết." /><button type="button" onClick={add} className="inline-flex h-10 items-center gap-2 border border-[var(--uel-brand-blue)] px-3 text-sm font-bold text-[var(--uel-brand-blue)]"><Plus size={16} />Thêm tác giả</button></div><div className="mt-6 space-y-4">{authors.map((author: Author, index: number) => <article key={index} className="border border-[#d8e1ec] p-4"><div className="flex items-center justify-between"><p className="font-bold text-[var(--uel-navy)]">Tác giả {index + 1}</p><div className="flex"><IconButton title="Di chuyển lên" disabled={index === 0} onClick={() => move(index, -1)} icon={ArrowUp} /><IconButton title="Di chuyển xuống" disabled={index === authors.length - 1} onClick={() => move(index, 1)} icon={ArrowDown} /><IconButton title="Xóa tác giả" disabled={authors.length === 1} onClick={() => remove(index)} icon={Trash2} danger /></div></div><div className="mt-4 grid gap-4 md:grid-cols-2"><Field label="Tên"><input className="field" required value={author.firstName} onChange={(e) => update(index, { firstName: e.target.value })} /></Field><Field label="Họ và tên đệm"><input className="field" required value={author.middleLastName} onChange={(e) => update(index, { middleLastName: e.target.value })} /></Field><Field label="Email"><input className="field" type="email" required value={author.email} onChange={(e) => update(index, { email: e.target.value })} /></Field><Field label="Đơn vị công tác"><input className="field" required value={author.affiliation} onChange={(e) => update(index, { affiliation: e.target.value })} /></Field></div><Field label="Tiểu sử (không bắt buộc)" className="mt-4"><textarea className="field min-h-20" value={author.bio ?? ""} onChange={(e) => update(index, { bio: e.target.value })} /></Field><label className="mt-4 flex items-center gap-2 text-sm font-bold text-[var(--uel-brand-blue)]"><input type="radio" name="corresponding" checked={author.isCorresponding} onChange={() => authors.forEach((_: Author, i: number) => update(i, { isCorresponding: i === index }))} />Tác giả liên hệ</label></article>)}</div><label className="mt-6 flex gap-3 border-l-4 border-[var(--uel-gold)] bg-[#fff9e9] p-4 text-sm leading-6 text-[var(--muted)]"><input type="checkbox" required checked={confirmed} onChange={(e) => setConfirmed(e.target.checked)} className="mt-1 size-4" />Tôi đã kiểm tra cẩn thận thứ tự và thông tin của tất cả tác giả. Tôi hiểu rằng mọi thay đổi sau bước này phải có sự đồng thuận của tất cả tác giả.</label><NavButtons onBack={onBack} busy={busy} label="Tiếp tục đến metadata" /></form>; }

function StepMetadata({ metadata, setMetadata, wordCount, onBack, onConfirm, busy }: any) { return <form onSubmit={(e) => { e.preventDefault(); if (wordCount <= 200) onConfirm(); }}><StepHeading number="04" title="Metadata bản thảo" detail="Thông tin này được dùng cho lập chỉ mục, tìm kiếm và xuất bản." /><Field label={`Tóm tắt · ${wordCount}/200 từ`} className="mt-6"><textarea className={`field min-h-52 ${wordCount > 200 ? "border-[#b42318]" : ""}`} required value={metadata.abstract} onChange={(e) => setMetadata({ ...metadata, abstract: e.target.value })} placeholder="Mục tiêu, phương pháp, kết quả chính và đóng góp của nghiên cứu" /></Field><Field label="Từ khóa (phân cách bằng dấu phẩy)" className="mt-5"><input className="field" required value={metadata.keywords} onChange={(e) => setMetadata({ ...metadata, keywords: e.target.value })} placeholder="tài chính, ngân hàng, công nghệ" /></Field><Field label="Nguồn tài trợ (nếu có)" className="mt-5"><textarea className="field min-h-24" value={metadata.funding} onChange={(e) => setMetadata({ ...metadata, funding: e.target.value })} /></Field><div className="mt-7 flex items-center justify-between"><BackButton onClick={onBack} /><button disabled={busy || wordCount > 200} className="inline-flex h-11 items-center gap-2 bg-[#267447] px-5 text-sm font-bold text-white disabled:opacity-50"><ShieldCheck size={17} />Hoàn tất nộp bài</button></div></form>; }

function ConfirmDialog({ title, busy, onClose, onConfirm }: any) { return <div className="fixed inset-0 z-[80] grid place-items-center bg-[#001d3d]/55 p-4"><div role="dialog" aria-modal="true" aria-labelledby="confirm-title" className="w-full max-w-lg border-t-4 border-[var(--uel-gold)] bg-white p-6 shadow-2xl"><div className="flex justify-between gap-4"><div><p className="section-kicker">Xác nhận cuối cùng</p><h2 id="confirm-title" className="uel-block-title mt-2 text-2xl">Gửi bản thảo đến tòa soạn?</h2></div><button type="button" onClick={onClose} title="Đóng" className="grid size-9 place-items-center"><X size={20} /></button></div><p className="mt-4 text-sm leading-6 text-[var(--muted)]">“{title}” sẽ chuyển sang trạng thái đã nộp và không thể tự chỉnh sửa thông tin tác giả.</p><div className="mt-6 flex justify-end gap-3"><button type="button" onClick={onClose} className="h-10 border border-[#cbd8e8] px-4 text-sm font-bold">Kiểm tra lại</button><button type="button" disabled={busy} onClick={onConfirm} className="h-10 bg-[#267447] px-4 text-sm font-bold text-white disabled:opacity-50">{busy ? "Đang gửi..." : "Xác nhận và gửi"}</button></div></div></div>; }
function StepHeading({ number, title, detail }: any) { return <div><p className="text-xs font-extrabold text-[var(--uel-gold)]">BƯỚC {number}</p><h2 className="uel-block-title mt-2 text-2xl">{title}</h2><p className="mt-2 text-sm leading-6 text-[var(--muted)]">{detail}</p></div>; }
function Field({ label, children, className = "" }: any) { return <label className={`block ${className}`}><span className="mb-1.5 block text-xs font-bold text-[var(--uel-navy)]">{label}</span>{children}</label>; }
function NextButton({ busy }: any) { return <div className="mt-7 flex justify-end"><button disabled={busy} className="inline-flex h-11 items-center gap-2 bg-[var(--uel-brand-blue)] px-5 text-sm font-bold text-white disabled:opacity-50">{busy ? "Đang lưu..." : "Lưu và tiếp tục"}<ArrowRight size={17} /></button></div>; }
function BackButton({ onClick }: any) { return <button type="button" onClick={onClick} className="inline-flex h-10 items-center gap-2 text-sm font-bold text-[var(--uel-brand-blue)]"><ArrowLeft size={17} />Quay lại</button>; }
function NavButtons({ onBack, busy, label }: any) { return <div className="mt-7 flex items-center justify-between"><BackButton onClick={onBack} /><button disabled={busy} className="inline-flex h-11 items-center gap-2 bg-[var(--uel-brand-blue)] px-5 text-sm font-bold text-white disabled:opacity-50">{busy ? "Đang lưu..." : label}<ArrowRight size={17} /></button></div>; }
function IconButton({ title, disabled, onClick, icon: Icon, danger = false }: any) { return <button type="button" title={title} aria-label={title} disabled={disabled} onClick={onClick} className={`grid size-8 place-items-center disabled:opacity-25 ${danger ? "text-[#b42318]" : "text-[var(--uel-brand-blue)]"}`}><Icon size={16} /></button>; }
