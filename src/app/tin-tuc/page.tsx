import { CalendarDays } from "lucide-react";
import Link from "next/link";
import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/page-header";
import { UelIcon } from "@/components/uel-icon";
import { formatNewsDate, getPublishedNews } from "@/lib/news";

export default async function NewsPage() {
  const newsItems = await getPublishedNews();

  return (
    <AppShell>
      <section className="mx-auto min-h-[70vh] w-full max-w-[1120px] px-4 py-8 md:px-8 lg:py-12">
        <PageHeader kicker="Thông báo và hoạt động" title="Tin tức" description="Cập nhật thông báo xuất bản, hướng dẫn tác giả và hoạt động học thuật của chuyên san." />
        <div className="mt-8 space-y-4">
          {newsItems.map((item) => (
            <article key={item.id} className="panel grid gap-5 p-5 sm:grid-cols-[64px_1fr] md:p-6">
              <UelIcon name="publications" size={56} />
              <div>
                <p className="flex items-center gap-2 text-xs font-semibold text-[var(--muted)]"><CalendarDays size={15} />{formatNewsDate(item.publishedAt)}</p>
                <h2 className="uel-block-title mt-2 text-xl md:text-2xl"><Link href={`/tin-tuc/${item.slug}`} className="hover:underline hover:decoration-[var(--uel-gold)] hover:underline-offset-4">{item.title}</Link></h2>
                <p className="uel-block-copy mt-3 text-sm">{item.summary}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </AppShell>
  );
}
