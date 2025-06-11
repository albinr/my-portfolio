"use client";

import React from "react";
import Link from "next/link";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "ghost";
  className?: string;
  href?: string;
}

export default function Button({
  variant = "primary",
  className = "",
  children,
  href,
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-full font-medium transition duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--foreground)] active:scale-95";

  const padding = "px-6 py-2 sm:px-5 sm:py-2.5 text-sm sm:text-base";

  const variants: Record<string, string> = {
    primary: `
      bg-[var(--foreground)]
      text-[var(--background)]
      hover:opacity-90
      shadow-[var(--glow)]
    `,
    outline: `
      border border-[var(--foreground)]
      text-[var(--foreground)]
      bg-transparent
      hover:bg-[var(--foreground)]
      hover:text-[var(--background)]
    `,
    ghost: `
      text-[var(--foreground)]
      bg-transparent
      hover:bg-[var(--foreground)]
      hover:text-[var(--background)]
    `,
  };

  const combined =
    `${base} ${padding} ${variants[variant]} ${className}`.trim();

  if (href) {
    return (
      <Link href={href} className={combined}>
        {children}
      </Link>
    );
  }

  return (
    <button className={combined} {...props}>
      {children}
    </button>
  );
}
