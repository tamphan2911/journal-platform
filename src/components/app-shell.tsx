import Link from "next/link";
import { ChevronDown, Search } from "lucide-react";

const utilityLinks = [
  "Viên chức, người lao động",
  "Người học",
  "Người học tiềm năng",
  "Cựu người học",
  "Đối tác",
];

const mainLinks = [
  { href: "/gioi-thieu", label: "GIỚI THIỆU", dropdown: true },
  { href: "/tac-gia", label: "TUYỂN SINH" },
  { href: "/workspace", label: "ĐÀO TẠO", dropdown: true },
  { href: "/luu-tru", label: "NGHIÊN CỨU" },
  { href: "/phan-bien", label: "GẮN KẾT CỘNG ĐỒNG" },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[var(--page-bg)] text-[var(--ink)] [--site-header-height:217px] lg:[--site-header-height:128px]">
      <header className="sticky top-0 z-30 border-t-[2px] border-[#155394] bg-white shadow-sm shadow-[#002b5c]/10">
        <div className="relative mx-auto min-h-[126px] max-w-[1920px] overflow-hidden">
          <div className="absolute right-0 top-0 hidden h-[46px] w-[52%] items-center justify-end gap-8 rounded-bl-[48px] bg-[#155394] px-10 text-[17px] font-bold text-white lg:flex">
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

          <div className="grid min-h-[126px] grid-cols-[minmax(0,1fr)] items-center gap-4 px-5 py-4 lg:grid-cols-[860px_1fr] lg:px-[86px] lg:py-0">
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

            <div className="flex flex-col items-start gap-3 lg:items-end lg:self-end lg:pb-7">
              <nav className="hidden items-center gap-8 text-[20px] font-extrabold text-[#104a88] lg:flex">
                {mainLinks.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="inline-flex items-center gap-1.5 whitespace-nowrap leading-none hover:text-[#f15a24]"
                  >
                    {item.label}
                    {item.dropdown && <ChevronDown size={17} strokeWidth={1.8} />}
                  </Link>
                ))}
                <Link href="/archives" aria-label="Tìm kiếm" className="text-[#f15a24]">
                  <Search size={25} strokeWidth={1.7} />
                </Link>
              </nav>
              <nav className="flex w-full gap-2 overflow-x-auto border-t border-[#e7eef7] pt-3 text-sm font-extrabold text-[#104a88] lg:hidden">
                {[...mainLinks, { href: "/dang-nhap", label: "ĐĂNG NHẬP" }].map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="shrink-0 rounded-[4px] border border-[#dbe6f7] px-3 py-2"
                  >
                    {item.label}
                  </Link>
                ))}
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
    <span className="relative grid h-[102px] w-[102px] flex-none place-items-center rounded-full border-[5px] border-[#155394] bg-white text-[#155394]">
      <span className="absolute inset-[6px] rounded-full border border-[#155394]" />
      <span className="absolute top-[8px] text-[8px] font-extrabold uppercase tracking-[0.08em]">
        Trường Đại học Kinh tế - Luật
      </span>
      <span className="text-[42px] font-black leading-none tracking-[-0.08em]">UEL</span>
      <span className="absolute bottom-[10px] h-[12px] w-[58px] rounded-b-full border-b-[5px] border-[#155394]" />
      <span className="absolute bottom-[4px] text-[7px] font-bold uppercase">
        Economics & Law
      </span>
    </span>
  );
}
