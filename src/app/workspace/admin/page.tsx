import Link from "next/link";
import { ArrowRight, BookOpenText, FileCheck2, FileText, Newspaper, Settings2, Users } from "lucide-react";
import { prisma } from "@/lib/prisma";

const modules = [
  { href: "/workspace/admin/news", label: "Tin tức", detail: "Soạn, duyệt và xuất bản tin", icon: Newspaper, countKey: "news" },
  { href: "/workspace/admin/users", label: "Người dùng", detail: "Vai trò và trạng thái tài khoản", icon: Users, countKey: "users" },
  { href: "/workspace/admin/submissions", label: "Bản thảo", detail: "Theo dõi toàn bộ quy trình", icon: FileText, countKey: "submissions" },
  { href: "/workspace/admin/articles", label: "Bài xuất bản", detail: "Metadata, DOI và tệp bài", icon: FileCheck2, countKey: "articles" },
  { href: "/workspace/admin/issues", label: "Tập & số", detail: "Lập kế hoạch và phát hành", icon: BookOpenText, countKey: "issues" },
  { href: "/workspace/admin/settings", label: "Header & footer", detail: "Nội dung hiển thị toàn site", icon: Settings2, countKey: "settings" },
] as const;

export default async function AdminWorkspacePage() {
  const [news, users, submissions, articles, issues, settings] = await Promise.all([
    prisma.newsPost.count(),
    prisma.user.count(),
    prisma.manuscript.count(),
    prisma.article.count(),
    prisma.journalIssue.count(),
    prisma.siteSetting.count(),
  ]);
  const counts = { news, users, submissions, articles, issues, settings };

  return (
    <div>
      <p className="section-kicker">Điều hành hệ thống</p>
      <h1 className="mt-2 text-3xl font-extrabold text-[var(--uel-navy)] md:text-4xl">Tổng quan quản trị</h1>
      <p className="mt-3 max-w-3xl text-sm leading-6 text-[var(--muted)]">
        Quản lý nội dung công khai, tài khoản và toàn bộ vòng đời xuất bản từ một console thống nhất.
      </p>
      <div className="mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {modules.map((module) => {
          const Icon = module.icon;
          return (
            <Link key={module.href} href={module.href} className="panel group p-5 transition hover:border-[#b8cce4]">
              <div className="flex items-start justify-between gap-4">
                <Icon size={23} className="text-[var(--uel-brand-blue)]" />
                <span className="text-3xl font-extrabold text-[var(--uel-brand-blue)]">{counts[module.countKey]}</span>
              </div>
              <h2 className="uel-block-title mt-6 text-xl">{module.label}</h2>
              <div className="mt-2 flex items-center justify-between gap-3">
                <p className="uel-block-copy text-sm">{module.detail}</p>
                <ArrowRight size={17} className="shrink-0 text-[var(--uel-gold)] transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
