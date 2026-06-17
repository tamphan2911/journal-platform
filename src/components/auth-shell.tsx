import Link from "next/link";
import { journalName } from "@/lib/journal-data";

export function AuthShell({
  title,
  subtitle,
  children,
  wide = false,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  wide?: boolean;
}) {
  return (
    <main className="grid h-dvh overflow-hidden bg-[var(--uel-navy)] px-4 py-4 text-[var(--ink)]">
      <section
        className={`m-auto w-full rounded-[8px] border border-white/18 bg-white shadow-2xl shadow-black/24 ${
          wide ? "max-w-[860px]" : "max-w-[430px]"
        }`}
      >
        <div className="border-b border-[#dbe6f7] px-5 py-4">
          <Link href="/" className="inline-flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-[6px] bg-[var(--nav-blue)] font-serif text-sm font-extrabold text-white">
              UEL
            </span>
            <span>
              <span className="block text-[10px] font-extrabold uppercase text-[var(--nav-blue)]">
                Journal Platform
              </span>
              <span className="block font-serif text-lg font-bold leading-5 text-[var(--uel-navy)]">
                {journalName}
              </span>
            </span>
          </Link>
          <h1 className="mt-4 font-serif text-3xl font-extrabold text-[var(--uel-navy)]">{title}</h1>
          <p className="mt-1 text-sm leading-6 text-[var(--muted)]">{subtitle}</p>
        </div>
        <div className="px-5 py-4">{children}</div>
      </section>
    </main>
  );
}
