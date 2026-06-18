import Image from "next/image";
import { uelIcons, type UelIconName } from "@/lib/uel-icons";

export function UelIcon({
  name,
  size = 56,
  className = "",
  decorative = true,
}: {
  name: UelIconName;
  size?: number;
  className?: string;
  decorative?: boolean;
}) {
  const icon = uelIcons[name];

  return (
    <Image
      src={icon.src}
      width={size}
      height={size}
      alt={decorative ? "" : icon.label}
      className={`shrink-0 object-contain ${className}`}
    />
  );
}
