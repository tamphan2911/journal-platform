import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
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
    <div className="min-h-screen bg-[var(--page-bg)] text-[var(--ink)] [--site-header-height:97px] lg:[--site-header-height:109px] xl:[--site-header-height:80px]">
      <header className="sticky top-0 z-30 bg-white shadow-[0_3px_14px_rgba(20,78,140,0.10)]">
        <div className="h-1 bg-[var(--uel-brand-blue)]" />

        <div className="relative mx-auto h-[58px] max-w-[1536px] lg:h-[70px] xl:h-[76px]">
          <nav
            aria-label="Khu vực người dùng"
            className="absolute right-0 top-0 hidden h-7 min-w-[58%] items-center justify-end gap-2 bg-[var(--uel-brand-blue)] pl-12 pr-8 text-white lg:flex"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 128 28"
              preserveAspectRatio="none"
              className="pointer-events-none absolute -left-32 top-0 h-7 w-32 text-[var(--uel-brand-blue)]"
            >
              <path d="M0 0 C58 0 70 28 128 28 L128 0 Z" fill="currentColor" />
            </svg>
            {audienceLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-2 py-1 text-xs font-semibold transition-colors hover:text-[#ffd269]"
              >
                {item.label}
              </Link>
            ))}
            <span className="mx-1 text-white/55" aria-hidden="true">|</span>
            <Link href="/dang-nhap" className="px-2 py-1 text-xs font-bold transition-colors hover:text-[#ffd269]">
              Đăng nhập
            </Link>
          </nav>

          <div className="flex h-full items-center justify-between gap-4 px-4 md:px-8">
            <Link
              href="/"
              className="z-10 min-w-0 shrink"
              aria-label={`Trang chủ ${journalName}`}
            >
              <Image
                src="/brand/bfat-logo.png"
                width={512}
                height={512}
                priority
                alt="Chuyên san Tài chính và Công nghệ ứng dụng BFAT"
                className="size-[50px] object-contain sm:size-[54px] lg:size-[62px] xl:size-[68px]"
              />
            </Link>

            <nav aria-label="Điều hướng chính" className="hidden h-12 self-end items-center justify-end xl:flex">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="relative px-3 py-3 text-[12px] font-extrabold uppercase text-[var(--uel-brand-blue)] transition-colors after:absolute after:inset-x-3 after:bottom-1 after:h-0.5 after:origin-left after:scale-x-0 after:bg-[var(--uel-gold)] after:transition-transform hover:text-[#0b3768] hover:after:scale-x-100 2xl:px-4 2xl:text-[13px]"
                >
                  {item.label}
                </Link>
              ))}
              <div className="ml-2">
                <HeaderSearch />
              </div>
            </nav>

            <div className="flex items-center self-end pb-2 xl:hidden">
              <Link
                href="/dang-nhap"
                className="hidden shrink-0 border border-[var(--uel-brand-blue)] px-3 py-2 text-xs font-bold text-[var(--uel-brand-blue)] transition-colors hover:bg-[var(--uel-brand-blue)] hover:text-white md:inline-flex lg:hidden"
              >
                Đăng nhập
              </Link>
              <HeaderSearch compact />
            </div>
          </div>

        </div>

        <nav
          aria-label="Điều hướng trên thiết bị di động"
          className="flex h-[35px] gap-1 overflow-x-auto border-t border-[#e6edf5] px-4 xl:hidden"
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex h-[34px] shrink-0 items-center px-2.5 text-[11px] font-extrabold uppercase text-[var(--uel-brand-blue)] transition-colors hover:bg-[#edf4fb]"
            >
              {item.label}
            </Link>
          ))}
          <Link href="/tac-gia" className="flex h-[34px] shrink-0 items-center px-2.5 text-[11px] font-extrabold uppercase text-[var(--uel-brand-blue)] transition-colors hover:bg-[#edf4fb]">
            Thông tin cho tác giả
          </Link>
          <Link href="/nop-bai" className="flex h-[34px] shrink-0 items-center px-2.5 text-[11px] font-extrabold uppercase text-[var(--uel-brand-blue)] transition-colors hover:bg-[#edf4fb]">
            Nộp bài
          </Link>
          <Link href="/dang-nhap" className="flex h-[34px] shrink-0 items-center px-2.5 text-[11px] font-extrabold uppercase text-[#a44124] sm:hidden">
            Đăng nhập
          </Link>
        </nav>
      </header>
      <main>{children}</main>
      <footer className="border-t-4 border-[var(--uel-gold)] bg-[var(--uel-navy)] text-white">
        <div className="mx-auto grid max-w-[1320px] gap-10 px-4 py-10 md:grid-cols-[1.35fr_0.75fr_1fr] md:px-8 lg:gap-14 lg:py-12">
          <div>
            <div className="flex items-center gap-4">
              <div className="grid size-[92px] shrink-0 place-items-center overflow-hidden rounded-full bg-white p-1.5 shadow-[0_8px_24px_rgba(0,0,0,0.18)]">
                <Image
                  src="/brand/bfat-logo.png"
                  width={512}
                  height={512}
                  alt="Chuyên san Tài chính và Công nghệ ứng dụng BFAT"
                  className="size-full object-contain"
                />
              </div>
              <div>
                <p className="text-xs font-extrabold uppercase tracking-wide text-[#ffd269]">BFAT</p>
                <p className="mt-1 max-w-sm text-base font-bold leading-6 text-white">{journalName}</p>
              </div>
            </div>
            <p className="mt-2 max-w-md text-sm leading-6 text-white/68">
              Công bố và lan tỏa các nghiên cứu có giá trị trong lĩnh vực kinh tế, luật, quản trị và chính sách công.
            </p>
          </div>

          <div>
            <p className="text-xs font-extrabold uppercase text-[#ffd269]">Điều hướng</p>
            <nav aria-label="Điều hướng chân trang" className="mt-4 grid gap-2.5 text-sm">
              {[...navItems, { href: "/tac-gia", label: settings.header_author_label }, { href: "/nop-bai", label: "Nộp bài" }].map((item) => (
                <Link key={item.href} href={item.href} className="group inline-flex w-fit items-center gap-1.5 text-white/76 transition-colors hover:text-white">
                  {item.label}<ArrowUpRight size={13} className="opacity-0 transition-opacity group-hover:opacity-100" />
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <p className="text-xs font-extrabold uppercase text-[#ffd269]">Liên hệ</p>
            <div className="mt-4 space-y-4 text-sm text-white/76">
              <p className="flex items-start gap-3"><MapPin size={17} className="mt-0.5 shrink-0 text-[#ffd269]" /><span>{settings.footer_address}</span></p>
              <a href={`tel:${settings.footer_phone.replace(/[^+\d]/g, "")}`} className="flex w-fit items-center gap-3 transition-colors hover:text-white"><Phone size={17} className="shrink-0 text-[#ffd269]" />{settings.footer_phone}</a>
              <a href={`mailto:${settings.footer_email}`} className="flex w-fit items-center gap-3 transition-colors hover:text-white"><Mail size={17} className="shrink-0 text-[#ffd269]" />{settings.footer_email}</a>
            </div>
          </div>
        </div>
        <div className="border-t border-white/12">
          <div className="mx-auto flex max-w-[1320px] flex-col gap-2 px-4 py-4 text-xs text-white/58 md:flex-row md:items-center md:justify-between md:px-8">
            <p>© {new Date().getFullYear()} {settings.footer_copyright}</p>
            <Link href="/dieu-khoan" className="w-fit transition-colors hover:text-white">Điều khoản sử dụng</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
