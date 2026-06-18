import Link from "next/link";
import { Search } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/page-header";
import { StatusPill } from "@/components/status-pill";
import { UelIcon } from "@/components/uel-icon";
import { issueArticles } from "@/lib/journal-data";

function normalize(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase()
    .trim();
}

export default async function SearchResultsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string | string[] }>;
}) {
  const params = await searchParams;
  const rawQuery = Array.isArray(params.q) ? params.q[0] : params.q;
  const query = rawQuery?.trim() ?? "";
  const tokens = normalize(query).split(/\s+/).filter(Boolean);
  const results = query
    ? issueArticles.filter((article) => {
        const searchable = normalize(
          [article.title, article.authors, article.field, article.pages, "Tập 12 Số 2 2026"].join(" "),
        );
        return tokens.every((token) => searchable.includes(token));
      })
    : [];

  return (
    <AppShell>
      <section className="mx-auto min-h-[70vh] w-full max-w-[1120px] px-4 py-8 md:px-8 lg:py-12">
        <PageHeader
          kicker="Tra cứu học thuật"
          title="Kết quả tìm kiếm"
          description="Tìm trong tiêu đề, tác giả, lĩnh vực và thông tin số xuất bản của các bài đã công bố."
        />

        <form action="/tim-kiem" method="get" className="panel mt-8 flex items-stretch overflow-hidden p-2">
          <label htmlFor="results-search" className="sr-only">Từ khóa tìm kiếm</label>
          <input
            id="results-search"
            name="q"
            type="search"
            required
            defaultValue={query}
            placeholder="Nhập tên bài viết, tác giả hoặc lĩnh vực"
            className="min-h-12 min-w-0 flex-1 bg-transparent px-3 text-sm outline-none"
          />
          <button type="submit" className="inline-flex items-center gap-2 bg-[var(--uel-brand-blue)] px-5 text-sm font-bold text-white transition-colors hover:bg-[var(--uel-navy)]">
            <Search size={18} />
            <span className="hidden sm:inline">Tìm kiếm</span>
          </button>
        </form>

        {query ? (
          <div className="mt-8">
            <p className="text-sm font-semibold text-[var(--muted)]">
              {results.length} kết quả cho <span className="text-[var(--uel-brand-blue)]">“{query}”</span>
            </p>
            {results.length ? (
              <div className="mt-4 space-y-4">
                {results.map((article) => {
                  const index = issueArticles.indexOf(article);
                  return (
                    <article key={article.title} className="panel grid gap-5 p-5 sm:grid-cols-[64px_1fr] md:p-6">
                      <UelIcon name="publications" size={56} />
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <StatusPill tone="blue">{article.field}</StatusPill>
                          <span className="text-xs font-semibold text-[var(--muted)]">Tập 12, Số 2, 2026 · Trang {article.pages}</span>
                        </div>
                        <h2 className="uel-block-title mt-3 text-xl md:text-2xl">
                          <Link href={`/luu-tru#bai-${index + 1}`} className="hover:underline hover:decoration-[var(--uel-gold)] hover:underline-offset-4">
                            {article.title}
                          </Link>
                        </h2>
                        <p className="uel-block-copy mt-2 text-sm">{article.authors}</p>
                      </div>
                    </article>
                  );
                })}
              </div>
            ) : (
              <div className="panel mt-4 p-8 text-center">
                <UelIcon name="library" size={64} className="mx-auto" />
                <h2 className="uel-block-title mt-4 text-2xl">Không tìm thấy bài viết phù hợp</h2>
                <p className="uel-block-copy mx-auto mt-2 max-w-xl text-sm">Hãy thử tên tác giả, một phần tiêu đề hoặc lĩnh vực nghiên cứu ngắn hơn.</p>
              </div>
            )}
          </div>
        ) : (
          <div className="panel mt-8 p-8 text-center">
            <UelIcon name="brandIdentity" size={64} className="mx-auto" />
            <h2 className="uel-block-title mt-4 text-2xl">Nhập từ khóa để bắt đầu</h2>
          </div>
        )}
      </section>
    </AppShell>
  );
}
