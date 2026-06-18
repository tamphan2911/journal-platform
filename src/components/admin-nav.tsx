"use client";

import {
  BookOpenText,
  ContactRound,
  FileCheck2,
  FileText,
  LayoutDashboard,
  Newspaper,
  Settings2,
  Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { href: "/workspace/admin", label: "Tổng quan", icon: LayoutDashboard },
  { href: "/workspace/admin/news", label: "Tin tức", icon: Newspaper },
  { href: "/workspace/admin/members", label: "Thành viên", icon: ContactRound },
  { href: "/workspace/admin/settings", label: "Header & footer", icon: Settings2 },
  { href: "/workspace/admin/users", label: "Người dùng", icon: Users },
  { href: "/workspace/admin/submissions", label: "Bản thảo", icon: FileText },
  { href: "/workspace/admin/articles", label: "Bài xuất bản", icon: FileCheck2 },
  { href: "/workspace/admin/issues", label: "Tập & số", icon: BookOpenText },
];

export function AdminNav() {
  const pathname = usePathname();

  return (
    <nav aria-label="Quản trị hệ thống" className="flex gap-1 overflow-x-auto lg:block lg:space-y-1">
      {items.map((item) => {
        const Icon = item.icon;
        const active = item.href === "/workspace/admin" ? pathname === item.href : pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex h-11 shrink-0 items-center gap-3 border-l-4 px-3 text-sm font-bold transition-colors lg:w-full ${
              active
                ? "border-[var(--uel-gold)] bg-[#edf4fb] text-[var(--uel-brand-blue)]"
                : "border-transparent text-[var(--muted)] hover:bg-[#f5f7fa] hover:text-[var(--uel-brand-blue)]"
            }`}
          >
            <Icon size={18} />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
