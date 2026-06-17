export function PageHeader({
  kicker,
  title,
  description,
}: {
  kicker: string;
  title: string;
  description: string;
}) {
  return (
    <div>
      <p className="section-kicker">{kicker}</p>
      <h1 className="gold-rule mt-2 max-w-4xl font-serif text-4xl font-extrabold leading-tight text-[var(--uel-navy)] md:text-5xl">
        {title}
      </h1>
      <p className="mt-4 max-w-3xl text-base leading-7 text-[var(--muted)]">{description}</p>
    </div>
  );
}

export function InfoCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="panel p-5 md:p-6">
      <h2 className="font-serif text-2xl font-bold text-[var(--uel-navy)]">{title}</h2>
      <div className="mt-4 text-sm leading-7 text-[var(--muted)]">{children}</div>
    </section>
  );
}
