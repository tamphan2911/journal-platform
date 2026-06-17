"use client";

import { useState } from "react";
import { Send } from "lucide-react";

type SubmitState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; code: string }
  | { status: "error"; message: string };

export function SubmitForm() {
  const [state, setState] = useState<SubmitState>({ status: "idle" });

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState({ status: "loading" });

    const form = new FormData(event.currentTarget);
    const manuscriptFile = form.get("manuscriptFile");

    const payload = {
      authorName: String(form.get("authorName") ?? ""),
      authorEmail: String(form.get("authorEmail") ?? ""),
      affiliation: String(form.get("affiliation") ?? ""),
      title: String(form.get("title") ?? ""),
      abstract: String(form.get("abstract") ?? ""),
      field: String(form.get("field") ?? ""),
      keywords: String(form.get("keywords") ?? "")
        .split(",")
        .map((keyword) => keyword.trim())
        .filter(Boolean),
      fileName: manuscriptFile instanceof File ? manuscriptFile.name : "manuscript.docx",
      fileSize: manuscriptFile instanceof File ? manuscriptFile.size : 0,
    };

    const response = await fetch("/api/submissions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const result = await response.json();
    if (!response.ok) {
      setState({
        status: "error",
        message: result?.error ?? "Không thể nộp bản thảo. Vui lòng thử lại.",
      });
      return;
    }

    setState({ status: "success", code: result.code });
    event.currentTarget.reset();
  }

  return (
    <form onSubmit={onSubmit} className="panel mt-8 p-5 md:p-6">
      <div className="grid gap-5 md:grid-cols-2">
        <label className="block">
          <span className="text-sm font-bold text-[var(--uel-navy)]">Họ tên tác giả liên hệ</span>
          <input className="field mt-2" name="authorName" required placeholder="Nguyễn Minh Anh" />
        </label>
        <label className="block">
          <span className="text-sm font-bold text-[var(--uel-navy)]">Email</span>
          <input
            className="field mt-2"
            name="authorEmail"
            type="email"
            required
            placeholder="tacgia@example.edu.vn"
          />
        </label>
        <label className="block">
          <span className="text-sm font-bold text-[var(--uel-navy)]">Đơn vị công tác</span>
          <input
            className="field mt-2"
            name="affiliation"
            placeholder="Trường / Viện / Cơ quan"
          />
        </label>
        <label className="block">
          <span className="text-sm font-bold text-[var(--uel-navy)]">Chuyên mục</span>
          <select className="field mt-2" name="field" required defaultValue="">
            <option value="" disabled>
              Chọn chuyên mục
            </option>
            <option>Quản trị công</option>
            <option>Kinh tế số</option>
            <option>Luật kinh tế</option>
            <option>Tài chính</option>
            <option>Chính sách công</option>
          </select>
        </label>
      </div>

      <label className="mt-5 block">
        <span className="text-sm font-bold text-[var(--uel-navy)]">Tên bài viết</span>
        <input
          className="field mt-2"
          name="title"
          required
          minLength={12}
          placeholder="Tên bản thảo bằng tiếng Việt"
        />
      </label>

      <label className="mt-5 block">
        <span className="text-sm font-bold text-[var(--uel-navy)]">Tóm tắt</span>
        <textarea
          className="field mt-2 min-h-[150px]"
          name="abstract"
          required
          minLength={80}
          placeholder="Mục tiêu, phương pháp, kết quả chính và đóng góp của nghiên cứu"
        />
      </label>

      <div className="mt-5 grid gap-5 md:grid-cols-2">
        <label className="block">
          <span className="text-sm font-bold text-[var(--uel-navy)]">Từ khóa</span>
          <input className="field mt-2" name="keywords" placeholder="dữ liệu mở, chính sách công, AI" />
        </label>
        <label className="block">
          <span className="text-sm font-bold text-[var(--uel-navy)]">Tệp bản thảo</span>
          <input className="field mt-2 p-2" name="manuscriptFile" type="file" />
        </label>
      </div>

      <label className="mt-5 flex gap-3 rounded-[4px] border border-[#dbe6f7] bg-[#fbfcff] p-4">
        <input className="mt-1" type="checkbox" required />
        <span className="text-sm leading-6 text-[var(--muted)]">
          Tôi xác nhận bản thảo chưa được công bố ở nơi khác, tuân thủ đạo đức
          nghiên cứu và đồng ý quy trình phản biện của tạp chí.
        </span>
      </label>

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <button
          className="inline-flex items-center gap-2 rounded-[4px] bg-[var(--nav-blue)] px-5 py-3 text-sm font-bold text-white shadow-lg shadow-[#354f96]/20 transition hover:bg-[var(--uel-navy)] disabled:cursor-not-allowed disabled:opacity-60"
          disabled={state.status === "loading"}
        >
          <Send size={17} />
          {state.status === "loading" ? "Đang nộp..." : "Nộp bản thảo"}
        </button>
        {state.status === "success" && (
          <p className="text-sm font-bold text-[#216c37]">
            Đã nhận hồ sơ. Mã bản thảo: {state.code}
          </p>
        )}
        {state.status === "error" && (
          <p className="text-sm font-bold text-[#b42318]">{state.message}</p>
        )}
      </div>
    </form>
  );
}
