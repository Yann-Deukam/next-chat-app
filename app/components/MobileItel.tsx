"use client";

import clsx from "clsx";
import Link from "next/link";

interface MobileItemProps {
  icon: any;
  href: string;
  onClick?: () => void;
  active?: boolean;
}

export default function MobileItem({
  icon: Icon,
  href,
  onClick,
  active,
}: MobileItemProps) {
  const handleClick = () => {
    if (onClick) {
      return onClick();
    }
  };
  return (
    <li
      onClick={handleClick}
      className={clsx(
        "group flex justify-center gap-x-3 p-4 text-sm leading-6 font-semibold w-full text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50",
        active && "bg-zinc-50 text-black"
      )}
    >
      <Link href={href}>
        <Icon className="w-6 h-6 shrink-0 " />
      </Link>
    </li>
  );
}
