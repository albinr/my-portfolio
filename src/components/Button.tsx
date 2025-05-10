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
    primary:
      "bg-primary text-white hover:bg-primary-dark shadow-glow",
    outline:
      "border border-primary text-primary hover:bg-primary hover:text-white dark:border-primary dark:text-primary dark:hover:bg-primary dark:hover:text-white",
    ghost:
      "text-primary hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white",
  };

  const combined = `${base} ${variants[variant]} ${className}`;

  return (
    <button className={combined} {...props}>
      {children}
    </button>
  );
}
