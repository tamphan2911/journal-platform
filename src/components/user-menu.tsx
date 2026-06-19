"use client";

import { LayoutDashboard, LogOut, UserRound } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export function UserMenu({ name, avatarId, dark = false, className = "" }: { name: string; avatarId: string | null; dark?: boolean; className?: string }) {
  const [open, setOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function close(event: PointerEvent) { if (!ref.current?.contains(event.target as Node)) setOpen(false); }
    function escape(event: KeyboardEvent) { if (event.key === "Escape") setOpen(false); }
    document.addEventListener("pointerdown", close);
    document.addEventListener("keydown", escape);
    return () => { document.removeEventListener("pointerdown", close); document.removeEventListener("keydown", escape); };
  }, [open]);

  async function logout() {
    setLoggingOut(true);
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.assign("/");
  }

  return (
    <div ref={ref} className={`relative shrink-0 ${className}`}>
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="menu"
        aria-label="Mở menu hồ sơ"
        title="Hồ sơ cá nhân"
        onClick={() => setOpen((value) => !value)}
        className={`grid overflow-hidden rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 ${dark ? "size-7 bg-white/15 text-white hover:bg-white/25 focus-visible:outline-white" : "size-9 border border-[#cbd8e8] bg-white text-[var(--uel-brand-blue)] hover:bg-[#edf4fb] focus-visible:outline-[var(--uel-brand-blue)]"}`}
      >
        {avatarId ? <Image src={`/api/media/${avatarId}`} alt="" width={72} height={72} unoptimized className="size-full object-cover" /> : <UserRound size={dark ? 17 : 20} className="m-auto" />}
      </button>
      {open ? (
        <div role="menu" className="absolute right-0 top-[calc(100%+10px)] z-50 w-56 border-t-3 border-[var(--uel-gold)] bg-white py-2 text-[var(--ink)] shadow-[0_16px_38px_rgba(0,43,92,0.22)]">
          <div className="border-b border-[#e2e8f0] px-4 pb-2 pt-1">
            <p className="truncate text-xs font-bold text-[var(--uel-navy)]">{name}</p>
          </div>
          <Link role="menuitem" href="/dashboard" onClick={() => setOpen(false)} className="flex h-10 items-center gap-3 px-4 text-sm font-semibold text-[var(--muted)] hover:bg-[#f3f7fb] hover:text-[var(--uel-brand-blue)]">
            <LayoutDashboard size={17} /> Dashboard
          </Link>
          <Link role="menuitem" href="/ho-so" onClick={() => setOpen(false)} className="flex h-10 items-center gap-3 px-4 text-sm font-semibold text-[var(--muted)] hover:bg-[#f3f7fb] hover:text-[var(--uel-brand-blue)]">
            <UserRound size={17} /> Hồ sơ cá nhân
          </Link>
          <button role="menuitem" type="button" disabled={loggingOut} onClick={logout} className="flex h-10 w-full items-center gap-3 px-4 text-left text-sm font-semibold text-[#a63b2b] hover:bg-[#fff5f2] disabled:opacity-60">
            <LogOut size={17} /> {loggingOut ? "Đang đăng xuất..." : "Đăng xuất"}
          </button>
        </div>
      ) : null}
    </div>
  );
}
