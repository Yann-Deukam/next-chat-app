"use client";

import clsx from "clsx";
import Link from "next/link";

interface DesktopItemProps {
  label: string;
  icon: any;
  href: string;
  onClick?: () => void;
  active?: boolean;
}

export default function DesktopItem({
  label,
  icon: Icon,
  href,
  onClick,
  active,
}: DesktopItemProps) {
  const handleClick = () => {
    if (onClick) {
      return onClick();
    }
  };
  return (
    <li
      onClick={handleClick}
      className={clsx(
        "group flex flex-col items-center gap-x-3 p-3 text-sm leading-6 font-semibold text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50",
        active && "bg-zinc-50 text-black"
      )}
    >
      <Link href={href}>
        <Icon className="w-6 h-6 shrink-0 " />
        <span className="sr-only">{label} </span>
      </Link>
    </li>
  );
}
