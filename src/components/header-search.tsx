"use client";

import { Search, X } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";

export function HeaderSearch({ compact = false }: { compact?: boolean }) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;

    inputRef.current?.focus();

    function onPointerDown(event: PointerEvent) {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false);
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div ref={containerRef} className="relative shrink-0">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? "Đóng tìm kiếm" : "Tìm kiếm bài viết"}
        title={open ? "Đóng tìm kiếm" : "Tìm kiếm bài viết"}
        onClick={() => setOpen((value) => !value)}
        className={`${compact ? "size-9" : "size-10"} grid place-items-center text-[#ef5a2c] transition-colors hover:text-[var(--uel-brand-blue)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--uel-brand-blue)]`}
      >
        {open ? <X size={21} /> : <Search size={23} strokeWidth={2.2} />}
      </button>

      {open ? (
        <div
          id={panelId}
          className="absolute right-0 top-[calc(100%+12px)] z-50 w-[min(380px,calc(100vw-2rem))] border-t-4 border-[var(--uel-gold)] bg-white p-4 shadow-[0_18px_45px_rgba(0,43,92,0.18)]"
        >
          <form action="/tim-kiem" method="get" className="flex items-stretch">
            <label htmlFor={`${panelId}-input`} className="sr-only">
              Từ khóa tìm kiếm
            </label>
            <input
              ref={inputRef}
              id={`${panelId}-input`}
              name="q"
              type="search"
              required
              placeholder="Tên bài viết, tác giả, lĩnh vực..."
              className="min-w-0 flex-1 border border-r-0 border-[#c9d6e6] bg-white px-3 text-sm text-[var(--ink)] outline-none transition focus:border-[var(--uel-brand-blue)]"
            />
            <button
              type="submit"
              className="grid size-11 shrink-0 place-items-center bg-[var(--uel-brand-blue)] text-white transition-colors hover:bg-[var(--uel-navy)]"
              aria-label="Tìm kiếm"
              title="Tìm kiếm"
            >
              <Search size={19} />
            </button>
          </form>
        </div>
      ) : null}
    </div>
  );
}
