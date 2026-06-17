import { AppShell } from "@/components/app-shell";

export function AuthShell({
  title,
  subtitle,
  children,
  wide = false,
  scrollable = false,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  wide?: boolean;
  scrollable?: boolean;
}) {
  return (
    <AppShell>
      <section
        className={`grid bg-[var(--uel-navy)] px-4 py-6 text-[var(--ink)] ${
          scrollable ? "min-h-[calc(100dvh-122px)]" : "min-h-[calc(100dvh-122px)] overflow-hidden"
        }`}
      >
        <div
          className={`m-auto w-full rounded-[8px] border border-white/18 bg-white shadow-2xl shadow-black/24 ${
            wide ? "max-w-[860px]" : "max-w-[430px]"
          }`}
        >
          <div className="border-b border-[#dbe6f7] px-5 py-4">
            <h1 className="font-serif text-3xl font-extrabold text-[var(--uel-navy)]">{title}</h1>
            <p className="mt-1 text-sm leading-6 text-[var(--muted)]">{subtitle}</p>
          </div>
          <div className="px-5 py-4">{children}</div>
        </div>
      </section>
    </AppShell>
  );
}
