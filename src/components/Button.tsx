import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "ghost";
  className?: string;
}

export default function Button({
  variant = "primary",
  className = "",
  children,
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center px-6 py-2 rounded-full font-medium transition focus:outline-none";

  const variants: Record<string, string> = {
    primary: `
      bg-[var(--color-primary)] 
      text-[var(--color-text)] 
      hover:bg-[var(--color-primary-dark)] 
      shadow-[var(--shadow-glow)]
    `,
    outline: `
      border border-[var(--color-border)] 
      text-[var(--color-primary)] 
      hover:bg-[var(--color-primary)] 
      hover:text-[var(--color-text)]
    `,
    ghost: `
      text-[var(--color-primary)] 
      hover:bg-[var(--color-primary)] 
      hover:text-[var(--color-text)]
    `,
  };

  const combined = `${base} ${variants[variant]} ${className}`;

  return (
    <button className={combined} {...props}>
      {children}
    </button>
  );
}
