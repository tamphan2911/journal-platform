import Link from "next/link";
import { navItems } from "@/lib/journal-data";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[var(--page-bg)] text-[var(--ink)]">
      <div className="fixed inset-0 -z-10 overflow-hidden bg-[linear-gradient(120deg,#ecf3ff_0%,#f6f9ff_52%,#e9f7fb_100%)]">
        <div className="absolute -left-40 top-10 h-[720px] w-[720px] rounded-[46%] border-[90px] border-[#86a8e2]/30" />
        <div className="absolute right-[-180px] top-[-220px] h-[620px] w-[780px] rotate-[-18deg] rounded-[44%] bg-[#2f55a0]/10" />
      </div>
      <aside className="fixed left-0 top-0 z-20 hidden h-screen w-[116px] bg-[var(--nav-blue)] text-white shadow-2xl shadow-[#213d78]/20 lg:block">
        <Link
          href="/"
          className="flex h-[140px] flex-col items-center justify-center border-b border-white/12 bg-[#36539c]"
          aria-label="Trang chủ Chuyên san"
        >
          <div className="relative h-14 w-14 overflow-hidden rounded-full bg-white">
            <span className="absolute left-[-10px] top-6 h-3 w-20 rotate-12 rounded-full bg-[#36539c]" />
            <span className="absolute left-4 top-[-6px] h-20 w-3 -rotate-45 rounded-full bg-[#36539c]" />
          </div>
          <span className="mt-3 text-lg font-extrabold">Chuyên san</span>
        </Link>
        <nav className="grid">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="group flex h-[92px] flex-col items-center justify-center gap-2 border-b border-white/8 text-sm text-white/82 transition hover:bg-white hover:text-[var(--nav-blue)]"
              >
                <Icon size={24} strokeWidth={1.8} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>
      <header className="sticky top-0 z-10 border-b border-[#dbe6f7] bg-white/86 px-5 py-3 backdrop-blur lg:hidden">
        <div className="flex items-center justify-between">
          <Link href="/" className="font-serif text-xl font-bold text-[var(--nav-blue)]">
            Chuyên san
          </Link>
          <Link
            href="/nop-bai"
            className="rounded-md bg-[var(--nav-blue)] px-4 py-2 text-sm font-semibold text-white"
          >
            Nộp bài
          </Link>
        </div>
        <nav className="mt-3 flex gap-2 overflow-x-auto pb-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="shrink-0 rounded-md border border-[#dbe6f7] bg-white px-3 py-2 text-sm text-[var(--muted)]"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </header>
      <main className="lg:pl-[116px]">{children}</main>
    </div>
  );
}
