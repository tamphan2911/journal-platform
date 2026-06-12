export function StatusPill({
  children,
  tone = "blue",
}: {
  children: React.ReactNode;
  tone?: "blue" | "cyan" | "green" | "dark";
}) {
  const tones = {
    blue: "bg-[#dbe8ff] text-[#294f98]",
    cyan: "bg-[#d7f8fb] text-[#147485]",
    green: "bg-[#d9f9df] text-[#216c37]",
    dark: "bg-[#e7ebf3] text-[#1d2b45]",
  };

  return (
    <span className={`inline-flex rounded-md px-2.5 py-1 text-xs font-semibold ${tones[tone]}`}>
      {children}
    </span>
  );
}
