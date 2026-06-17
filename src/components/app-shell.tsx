import Link from "next/link";
import { Search } from "lucide-react";

const utilityLinks = [
  "Viên chức, người lao động",
  "Người học",
  "Người học tiềm năng",
  "Cựu người học",
  "Đối tác",
];

const mainLinks = [
  { href: "/gioi-thieu", label: "GIỚI THIỆU" },
  { href: "/tac-gia", label: "TUYỂN SINH" },
  { href: "/workspace", label: "ĐÀO TẠO" },
  { href: "/luu-tru", label: "NGHIÊN CỨU" },
  { href: "/phan-bien", label: "GẮN KẾT CỘNG ĐỒNG" },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[var(--page-bg)] text-[var(--ink)] [--site-header-height:164px] lg:[--site-header-height:128px]">
      <header className="sticky top-0 z-30 border-t-[2px] border-[#155394] bg-white shadow-sm shadow-[#002b5c]/10">
        <div className="lg:hidden">
          <nav className="flex h-[34px] items-center gap-5 overflow-x-auto bg-[#155394] px-4 text-xs font-bold text-white">
            {utilityLinks.map((item) => (
              <Link key={item} href="/" className="shrink-0 whitespace-nowrap">
                {item}
              </Link>
            ))}
            <span className="ml-auto flex shrink-0 items-center gap-2">
              <Link href="/">EN</Link>
              <span className="h-4 w-px bg-white/70" />
              <Link href="/" className="border-b border-white">
                VI
              </Link>
            </span>
          </nav>
          <div className="flex h-[78px] items-center gap-3 px-4">
            <Link href="/" className="flex min-w-0 items-center gap-3" aria-label="Trang chủ UEL">
              <UelSeal />
              <span className="min-w-0">
                <span className="block truncate text-[12px] font-semibold uppercase leading-4 text-[#155394]">
                  ĐẠI HỌC QUỐC GIA TP. HỒ CHÍ MINH
                </span>
                <span className="block truncate text-[18px] font-extrabold uppercase leading-6 text-[#155394]">
                  TRƯỜNG ĐẠI HỌC KINH TẾ - LUẬT
                </span>
              </span>
            </Link>
          </div>
          <nav className="flex h-[50px] items-center gap-2 overflow-x-auto border-t border-[#e7eef7] px-4 text-[13px] font-extrabold text-[#104a88]">
            {mainLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="flex h-11 shrink-0 items-center rounded-[4px] border border-[#dbe6f7] bg-white px-3 leading-none"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/archives"
              aria-label="Tìm kiếm"
              className="grid h-11 w-11 shrink-0 place-items-center rounded-full text-[#f15a24]"
            >
              <Search size={20} strokeWidth={1.8} />
            </Link>
          </nav>
        </div>

        <div className="relative mx-auto hidden min-h-[126px] max-w-[1920px] overflow-hidden lg:block">
          <div className="absolute right-0 top-0 flex h-[46px] w-[52%] items-center justify-end gap-8 rounded-bl-[48px] bg-[#155394] px-10 text-[17px] font-bold text-white">
            {utilityLinks.map((item) => (
              <Link key={item} href="/" className="whitespace-nowrap leading-none hover:text-white/80">
                {item}
              </Link>
            ))}
            <div className="flex items-center gap-2 whitespace-nowrap">
              <Link href="/" className="hover:text-white/80">
                EN
              </Link>
              <span className="h-5 w-px bg-white/70" />
              <Link href="/" className="border-b-2 border-white pb-0.5 hover:text-white/80">
                VI
              </Link>
            </div>
          </div>

          <div className="grid min-h-[126px] grid-cols-[860px_1fr] items-center gap-4 px-[86px]">
            <Link href="/" className="flex min-w-0 items-center gap-5" aria-label="Trang chủ UEL">
              <UelSeal />
              <div className="min-w-0">
                <p className="truncate text-[24px] font-medium uppercase leading-8 text-[#155394]">
                  ĐẠI HỌC QUỐC GIA THÀNH PHỐ HỒ CHÍ MINH
                </p>
                <p className="truncate text-[32px] font-extrabold uppercase leading-10 text-[#155394]">
                  TRƯỜNG ĐẠI HỌC KINH TẾ - LUẬT
                </p>
              </div>
            </Link>

            <div className="flex flex-col items-end self-end pb-7">
              <nav className="flex items-center gap-8 text-[20px] font-extrabold text-[#104a88]">
                {mainLinks.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="inline-flex whitespace-nowrap leading-none hover:text-[#f15a24]"
                  >
                    {item.label}
                  </Link>
                ))}
                <Link href="/archives" aria-label="Tìm kiếm" className="text-[#f15a24]">
                  <Search size={25} strokeWidth={1.7} />
                </Link>
              </nav>
            </div>
          </div>
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
}

function UelSeal() {
  return (
    <span className="relative grid h-14 w-14 flex-none place-items-center rounded-full border-[3px] border-[#155394] bg-white text-[#155394] lg:h-[102px] lg:w-[102px] lg:border-[5px]">
      <span className="absolute inset-[4px] rounded-full border border-[#155394] lg:inset-[6px]" />
      <span className="absolute top-[8px] hidden text-[8px] font-extrabold uppercase tracking-[0.08em] lg:block">
        Trường Đại học Kinh tế - Luật
      </span>
      <span className="text-[23px] font-black leading-none tracking-[-0.08em] lg:text-[42px]">UEL</span>
      <span className="absolute bottom-[7px] h-[7px] w-[34px] rounded-b-full border-b-[3px] border-[#155394] lg:bottom-[10px] lg:h-[12px] lg:w-[58px] lg:border-b-[5px]" />
      <span className="absolute bottom-[4px] hidden text-[7px] font-bold uppercase lg:block">
        Economics & Law
      </span>
    </span>
  );
}
