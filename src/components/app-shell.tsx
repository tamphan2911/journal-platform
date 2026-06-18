import Image from "next/image";
import Link from "next/link";
import { HeaderSearch } from "@/components/header-search";
import { getSiteSettings } from "@/lib/site-settings";

const journalName = "Chuyên san Khoa học Kinh tế - Luật";

export async function AppShell({ children }: { children: React.ReactNode }) {
  const settings = await getSiteSettings();
  const navItems = [
    { href: "/gioi-thieu", label: settings.header_about_label },
    { href: "/luu-tru", label: settings.header_published_label },
    { href: "/tin-tuc", label: settings.header_news_label },
  ];
  const audienceLinks = [
    { href: "/tac-gia", label: settings.header_author_label },
    { href: "/nop-bai", label: "Nộp bài" },
  ];
  return (
    <div className="min-h-screen bg-[var(--page-bg)] text-[var(--ink)] [--site-header-height:125px] lg:[--site-header-height:166px] xl:[--site-header-height:121px]">
      <header className="sticky top-0 z-30 bg-white shadow-[0_3px_14px_rgba(20,78,140,0.10)]">
        <div className="h-1 bg-[var(--uel-brand-blue)]" />

        <div className="relative mx-auto max-w-[1536px]">
          <div className="hidden h-[41px] justify-end lg:flex">
            <nav
              aria-label="Khu vực người dùng"
              className="relative flex min-w-[62%] items-center justify-end gap-1 bg-[var(--uel-brand-blue)] pl-14 pr-5 text-white lg:gap-3 lg:pr-8"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 160 41"
                preserveAspectRatio="none"
                className="pointer-events-none absolute -left-40 top-0 h-[41px] w-40 text-[var(--uel-brand-blue)]"
              >
                <path d="M0 0 C80 0 80 41 160 41 L160 0 Z" fill="currentColor" />
              </svg>
              {audienceLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="px-2 py-2.5 text-xs font-semibold transition-colors hover:text-[#ffd269] lg:text-sm"
                >
                  {item.label}
                </Link>
              ))}
              <span className="mx-1 text-white/55" aria-hidden="true">|</span>
              <Link
                href="/dang-nhap"
                className="px-2 py-2.5 text-xs font-bold transition-colors hover:text-[#ffd269] lg:text-sm"
              >
                Đăng nhập
              </Link>
            </nav>
          </div>

          <div className="flex min-h-[76px] items-center justify-between gap-5 px-4 py-1 md:px-8">
            <Link
              href="/"
              className="min-w-0 shrink lg:absolute lg:left-8 lg:top-2 lg:z-10"
              aria-label={`Trang chủ ${journalName}`}
            >
              <Image
                src="/uel-logo.svg"
                width={455}
                height={80}
                priority
                alt="Trường Đại học Kinh tế - Luật, Đại học Quốc gia Thành phố Hồ Chí Minh"
                className="h-auto w-[280px] max-w-full sm:w-[340px] lg:w-[360px] xl:w-[390px]"
              />
            </Link>
            <span className="hidden w-[360px] shrink-0 lg:block xl:w-[390px]" aria-hidden="true" />

            <nav aria-label="Điều hướng chính" className="hidden items-center justify-end xl:flex">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="relative px-3 py-4 text-[13px] font-extrabold uppercase text-[var(--uel-brand-blue)] transition-colors after:absolute after:inset-x-3 after:bottom-2 after:h-0.5 after:origin-left after:scale-x-0 after:bg-[var(--uel-gold)] after:transition-transform hover:text-[#0b3768] hover:after:scale-x-100 2xl:px-4 2xl:text-sm"
                >
                  {item.label}
                </Link>
              ))}
              <div className="ml-2">
                <HeaderSearch />
              </div>
            </nav>

            <div className="flex items-center xl:hidden">
              <Link
                href="/dang-nhap"
                className="hidden shrink-0 border border-[var(--uel-brand-blue)] px-3 py-2 text-xs font-bold text-[var(--uel-brand-blue)] transition-colors hover:bg-[var(--uel-brand-blue)] hover:text-white md:inline-flex"
              >
                Đăng nhập
              </Link>
              <HeaderSearch compact />
            </div>
          </div>

          <nav
            aria-label="Điều hướng trên thiết bị di động"
            className="flex gap-1 overflow-x-auto border-t border-[#e6edf5] px-4 py-1.5 xl:hidden"
          >
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex h-8 shrink-0 items-center px-2.5 text-[11px] font-extrabold uppercase text-[var(--uel-brand-blue)] transition-colors hover:bg-[#edf4fb]"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/tac-gia"
              className="flex h-8 shrink-0 items-center px-2.5 text-[11px] font-extrabold uppercase text-[var(--uel-brand-blue)] transition-colors hover:bg-[#edf4fb]"
            >
              Thông tin cho tác giả
            </Link>
            <Link
              href="/nop-bai"
              className="flex h-8 shrink-0 items-center px-2.5 text-[11px] font-extrabold uppercase text-[var(--uel-brand-blue)] transition-colors hover:bg-[#edf4fb]"
            >
              Nộp bài
            </Link>
            <Link
              href="/dang-nhap"
              className="flex h-8 shrink-0 items-center px-2.5 text-[11px] font-extrabold uppercase text-[#a44124] sm:hidden"
            >
              Đăng nhập
            </Link>
          </nav>
        </div>
      </header>
      <main>{children}</main>
      <footer className="border-t border-[#d7e1ec] bg-white">
        <div className="mx-auto grid max-w-[1320px] gap-5 px-4 py-7 text-sm md:grid-cols-[1fr_auto] md:px-8">
          <div>
            <p className="font-bold text-[var(--uel-brand-blue)]">Chuyên san Khoa học Kinh tế - Luật</p>
            <p className="mt-2 text-[var(--muted)]">{settings.footer_address}</p>
          </div>
          <div className="space-y-1 text-[var(--muted)] md:text-right">
            <p>{settings.footer_phone} · {settings.footer_email}</p>
            <p>© {new Date().getFullYear()} {settings.footer_copyright}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
