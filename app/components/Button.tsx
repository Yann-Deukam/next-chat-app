"use client";

import clsx from "clsx";

interface ButtonProps {
  type: "button" | "submit" | "reset" | undefined;
  fullWidth?: boolean;
  children?: React.ReactNode;
  onClick?: () => void;
  secondary?: boolean;
  danger?: boolean;
  disabled?: boolean;
}
export default function Button({
  type,
  fullWidth,
  children,
  onClick,
  secondary,
  danger,
  disabled,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={clsx(
        `flex justify-center px-3 py-2 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2`,
        disabled && "opacity-50 cursor-default",
        fullWidth && "w-full",
        secondary ? "text-zinc-900" : "text-white",
        danger && "bg-red-500 hover:bg-red-600 focus-visible:outline-red-600",
        !secondary &&
          !danger &&
          "bg-purple-500 hover:bg-purple-600 focus-visible:outline-purple-600"
      )}
    >
      {children}
    </button>
  );
}
