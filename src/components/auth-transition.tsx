"use client";

import { usePathname } from "next/navigation";

export function AuthTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div key={pathname} className="auth-page-enter">
      {children}
    </div>
  );
}
