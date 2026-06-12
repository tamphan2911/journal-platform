import { Download, Search } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { StatusPill } from "@/components/status-pill";
import { issueArticles } from "@/lib/journal-data";

const issues = [
  { volume: "Tập 12", number: "Số 2", year: "2026", theme: "Dữ liệu, giáo dục và đổi mới" },
  { volume: "Tập 12", number: "Số 1", year: "2026", theme: "Chính sách công trong kỷ nguyên số" },
  { volume: "Tập 11", number: "Số 4", year: "2025", theme: "Y tế cộng đồng và bằng chứng" },
  { volume: "Tập 11", number: "Số 3", year: "2025", theme: "Công nghệ trong khoa học xã hội" },
];

export default function ArchivePage() {
  return (
    <AppShell>
      <section className="mx-auto min-h-screen w-full max-w-[1320px] px-5 py-8 md:px-8 lg:px-12 lg:py-12">
        <div className="grid gap-8 lg:grid-cols-[360px_1fr]">
          <aside className="space-y-5">
            <div>
              <p className="text-sm font-bold uppercase text-[var(--nav-blue)]">Lưu trữ</p>
              <h1 className="mt-2 font-serif text-5xl font-extrabold text-black">
                Các số đã xuất bản
              </h1>
            </div>
            <div className="panel p-4">
              <label className="text-sm font-bold text-black" htmlFor="archive-search">
                Tìm kiếm bài viết
              </label>
              <div className="mt-3 flex items-center gap-2 rounded-md border border-[#cfdbef] bg-white px-3">
                <Search size={18} className="text-[var(--muted)]" />
                <input
                  id="archive-search"
                  className="min-h-11 flex-1 bg-transparent text-sm outline-none"
                  placeholder="Tên bài, tác giả, DOI"
                />
              </div>
            </div>
            <div className="space-y-3">
              {issues.map((issue, index) => (
                <button
                  key={`${issue.volume}-${issue.number}`}
                  className={`w-full rounded-md border p-4 text-left transition ${
                    index === 0
                      ? "border-[var(--nav-blue)] bg-white shadow-lg shadow-[#354f96]/12"
                      : "border-[#dbe6f7] bg-white/72 hover:bg-white"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <p className="font-extrabold text-black">
                      {issue.volume}, {issue.number}
                    </p>
                    <StatusPill tone={index === 0 ? "green" : "blue"}>{issue.year}</StatusPill>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{issue.theme}</p>
                </button>
              ))}
            </div>
          </aside>

          <main className="panel overflow-hidden">
            <div className="border-b border-[#dbe6f7] bg-[#f8fbff] p-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <StatusPill tone="green">Đã xuất bản</StatusPill>
                  <h2 className="mt-3 font-serif text-4xl font-bold text-black">
                    Tập 12, Số 2, 2026
                  </h2>
                  <p className="mt-2 text-[var(--muted)]">
                    Dữ liệu, giáo dục và đổi mới · xuất bản ngày 30/06/2026
                  </p>
                </div>
                <button className="inline-flex items-center gap-2 rounded-md bg-[var(--nav-blue)] px-4 py-3 text-sm font-bold text-white">
                  <Download size={17} />
                  Tải mục lục
                </button>
              </div>
            </div>
            <div className="divide-y divide-[#dbe6f7]">
              {issueArticles.map((article, index) => (
                <article key={article.title} className="grid gap-4 p-6 md:grid-cols-[82px_1fr_120px]">
                  <div className="grid h-16 w-16 place-items-center rounded-md bg-[#eaf1ff] text-xl font-extrabold text-[var(--nav-blue)]">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <div>
                    <StatusPill tone={index % 2 === 0 ? "blue" : "cyan"}>{article.field}</StatusPill>
                    <h3 className="mt-3 text-xl font-extrabold leading-7 text-black">
                      {article.title}
                    </h3>
                    <p className="mt-2 text-sm text-[var(--muted)]">{article.authors}</p>
                    <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                      Tóm tắt và metadata được lưu trữ để hỗ trợ tìm kiếm, DOI,
                      chỉ mục hóa và thống kê truy cập.
                    </p>
                  </div>
                  <div className="text-sm font-bold text-[var(--nav-blue)]">
                    Trang {article.pages}
                  </div>
                </article>
              ))}
            </div>
          </main>
        </div>
      </section>
    </AppShell>
  );
}
