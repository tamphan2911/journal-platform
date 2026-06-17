import Link from "next/link";
import { navItems } from "@/lib/journal-data";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[var(--page-bg)] text-[var(--ink)] paper-grid">
      <header className="sticky top-0 z-30 border-b border-[#d8e1ef] bg-white/95 shadow-sm shadow-[#002b5c]/5 backdrop-blur">
        <div className="bg-[var(--uel-navy)] text-white">
          <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-3 px-5 py-2 text-xs md:px-8 lg:px-12">
            <span>Trường Đại học Kinh tế - Luật, ĐHQG-HCM</span>
            <span className="hidden text-white/75 sm:inline">
              Nghiên cứu · Công bố khoa học · Phản biện học thuật
            </span>
          </div>
        </div>
        <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-5 px-5 py-4 md:px-8 lg:px-12">
          <Link href="/" className="flex min-w-0 items-center gap-3" aria-label="Trang chủ Chuyên san">
            <BrandMark />
            <span className="min-w-0">
              <span className="block truncate text-[11px] font-extrabold uppercase tracking-[0.16em] text-[var(--nav-blue)]">
                UEL Journal Platform
              </span>
              <span className="block truncate font-serif text-xl font-bold leading-6 text-[var(--uel-navy)]">
                Chuyên san Khoa học Kinh tế - Luật
              </span>
            </span>
          </Link>
          <nav className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group inline-flex items-center gap-2 border-b-2 border-transparent px-4 py-3 text-sm font-bold text-slate-600 transition hover:border-[var(--uel-gold)] hover:text-[var(--nav-blue)]"
                >
                  <Icon size={17} strokeWidth={1.9} />
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <Link
            href="/nop-bai"
            className="hidden rounded-[4px] bg-[var(--uel-gold)] px-4 py-2.5 text-sm font-extrabold text-[var(--uel-navy)] shadow-sm transition hover:bg-[#ffc84a] md:inline-flex"
          >
            Nộp bài
          </Link>
        </div>
        <nav className="flex gap-2 overflow-x-auto border-t border-[#edf1f7] px-5 py-2 lg:hidden">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="shrink-0 rounded-[4px] border border-[#dbe4f1] bg-white px-3 py-2 text-sm font-semibold text-slate-600"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </header>
      <main>{children}</main>
    </div>
  );
}

function BrandMark() {
  return (
    <span className="relative grid h-14 w-14 flex-none place-items-center overflow-hidden rounded-full bg-[var(--nav-blue)] text-white shadow-lg shadow-[#004b93]/20">
      <span className="absolute inset-x-0 top-0 h-2 bg-[var(--uel-gold)]" />
      <span className="font-serif text-lg font-extrabold">UEL</span>
    </span>
  );
}
