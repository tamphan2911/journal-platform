import Link from "next/link";
import { authLinks, journalName, navItems } from "@/lib/journal-data";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[var(--page-bg)] text-[var(--ink)]">
      <header className="sticky top-0 z-30 border-b border-[#d8e1ef] bg-white/96 shadow-sm shadow-[#002b5c]/5 backdrop-blur">
        <div className="hidden bg-[var(--uel-navy)] text-white sm:block">
          <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-3 px-4 py-1.5 text-xs md:px-8">
            <span>Trường Đại học Kinh tế - Luật, ĐHQG-HCM</span>
            <span className="hidden text-white/75 sm:inline">
              Nghiên cứu - Công bố khoa học - Phản biện học thuật
            </span>
          </div>
        </div>
        <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4 px-4 py-2.5 md:px-8 md:py-3">
          <Link href="/" className="flex min-w-0 items-center gap-3" aria-label="Trang chủ Chuyên san">
            <BrandMark />
            <span className="min-w-0">
              <span className="block truncate text-[10px] font-extrabold uppercase text-[var(--nav-blue)]">
                UEL Journal Platform
              </span>
              <span className="block truncate font-serif text-lg font-bold leading-5 text-[var(--uel-navy)] md:text-xl">
                {journalName}
              </span>
            </span>
          </Link>
          <nav className="hidden items-center gap-0.5 xl:flex">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="inline-flex items-center gap-1.5 rounded-[4px] px-3 py-2 text-sm font-bold text-slate-600 transition hover:bg-[#eef4fb] hover:text-[var(--nav-blue)]"
                >
                  <Icon size={16} strokeWidth={1.9} />
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="hidden items-center gap-2 md:flex">
            {authLinks.map((item, index) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`inline-flex items-center gap-1.5 rounded-[4px] px-3 py-2 text-sm font-extrabold transition ${
                    index === 0
                      ? "border border-[#cbd8ea] bg-white text-[var(--uel-navy)] hover:bg-[#f7faff]"
                      : "bg-[var(--uel-gold)] text-[var(--uel-navy)] hover:bg-[#ffc84a]"
                  }`}
                >
                  <Icon size={16} />
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
        <nav className="flex gap-2 overflow-x-auto border-t border-[#edf1f7] px-4 py-1.5 xl:hidden">
          {[...navItems, ...authLinks].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="shrink-0 rounded-[4px] border border-[#dbe4f1] bg-white px-3 py-1.5 text-xs font-bold text-slate-600"
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
    <span className="relative grid h-11 w-11 flex-none place-items-center overflow-hidden rounded-[6px] bg-[var(--nav-blue)] text-white shadow-md shadow-[#004b93]/16">
      <span className="absolute inset-x-0 top-0 h-1.5 bg-[var(--uel-gold)]" />
      <span className="font-serif text-sm font-extrabold">UEL</span>
    </span>
  );
}
