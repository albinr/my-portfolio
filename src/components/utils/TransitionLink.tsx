"use client";

import Link, { LinkProps } from "next/link";
import { ReactNode } from "react";
import { useRouter } from "next/navigation";

interface TransitionLinkProps extends LinkProps {
  children: ReactNode;
  href: string;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const TransitionLink = ({
  children,
  href,
  className = "",
  onClick,
  ...props
}: TransitionLinkProps) => {
  const router = useRouter();

  const handleTransition = async (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.preventDefault();

    // First run internal animation
    const main = document.querySelector("main");
    main?.classList.add("page-transition");
    await sleep(400);

    // Then navigate
    router.push(href);

    // Optional: post-animation cleanup
    await sleep(400);
    main?.classList.remove("page-transition");

    // Then call custom onClick if provided
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <Link
      href={href}
      className={className}
      onClick={handleTransition}
      {...props}
    >
      {children}
    </Link>
  );
};
