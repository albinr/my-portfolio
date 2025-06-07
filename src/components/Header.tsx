// components/Header.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Contact", href: "/contact" },
  { label: "Resume", href: "/resume" },
];

export default function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <header
      className="sticky top-0 z-50 shadow-md border-b"
      style={{
        backgroundColor: "var(--glass)",
        borderColor: "var(--foreground)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)"
      }}
    >
      <nav className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link
          href="/"
          className="text-xl font-bold text-[var(--foreground)] hover:text-blue-500 transition"
          onClick={closeMenu}
        >
          albinr.dev
        </Link>

        {/* Desktop nav */}
        <div className="hidden sm:flex gap-6 items-center">
          <ul className="flex gap-6 text-sm font-medium">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`transition ${
                    pathname === item.href
                      ? "text-blue-500"
                      : "text-[var(--foreground)]/70 hover:text-[var(--foreground)]"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <ThemeToggle />
        </div>

        {/* Mobile menu toggle */}
        <button
          className="sm:hidden text-[var(--foreground)]"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {isOpen && (
        <div
          className="sm:hidden border-t"
          style={{
            backgroundColor: "var(--glass-light)",
            borderColor: "var(--foreground)",
            backdropFilter: "blur(6px)",
            WebkitBackdropFilter: "blur(6px)"
          }}
        >
          <ul className="flex flex-col items-center py-4 gap-4 text-sm font-medium">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={closeMenu}
                  className={`transition ${
                    pathname === item.href
                      ? "text-blue-500"
                      : "text-[var(--foreground)]/70 hover:text-[var(--foreground)]"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex justify-center pb-4">
            <ThemeToggle />
          </div>
        </div>
      )}
    </header>
  );
}
