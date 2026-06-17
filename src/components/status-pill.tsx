export function StatusPill({
  children,
  tone = "blue",
}: {
  children: React.ReactNode;
  tone?: "blue" | "cyan" | "green" | "dark";
}) {
  const tones = {
    blue: "bg-[#e8f0fb] text-[#004b93]",
    cyan: "bg-[#e6f6f8] text-[#1a6f7f]",
    green: "bg-[#e9f5ed] text-[#276a42]",
    dark: "bg-[#f8edd2] text-[#76530a]",
  };

  return (
    <span className={`inline-flex rounded-[4px] px-2.5 py-1 text-xs font-bold ${tones[tone]}`}>
      {children}
    </span>
  );
}
