import { CalendarDays } from "lucide-react";
import { notFound } from "next/navigation";
import { AppShell } from "@/components/app-shell";
import { formatNewsDate, getPublishedNews } from "@/lib/news";

export default async function NewsDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = (await getPublishedNews()).find((item) => item.slug === slug);
  if (!post) notFound();

  return (
    <AppShell>
      <article className="mx-auto min-h-[70vh] w-full max-w-[900px] px-4 py-10 md:px-8 lg:py-16">
        <p className="section-kicker">Tin tức</p>
        <h1 className="mt-3 text-4xl font-extrabold leading-tight text-[var(--uel-navy)] md:text-5xl">{post.title}</h1>
        <p className="mt-5 flex items-center gap-2 border-b border-[#dbe4ee] pb-6 text-sm font-semibold text-[var(--muted)]"><CalendarDays size={17} />{formatNewsDate(post.publishedAt)}</p>
        <p className="mt-8 text-lg font-semibold leading-8 text-[var(--uel-brand-blue)]">{post.summary}</p>
        <div className="mt-7 space-y-5 text-base leading-8 text-[var(--ink)]">
          {post.content.split(/\n{2,}/).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
      </article>
    </AppShell>
  );
}
