"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

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
    <header className="bg-glass-light backdrop-blur-sm dark:bg-glass-dark backdrop-blur-soft shadow-md sticky top-0 z-50 border-b border-gray-200 dark:border-gray-800">
      <nav className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link
          href="/"
          className="text-xl font-bold text-primary dark:text-primary-light"
          onClick={closeMenu}
        >
          Albin
        </Link>

        {/* Desktop menu */}
        <ul className="hidden sm:flex gap-6 text-sm font-medium">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`transition hover:text-primary dark:hover:text-primary-light ${
                  pathname === item.href
                    ? "text-primary dark:text-primary-light"
                    : "text-foreground dark:text-gray-300"
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile toggle */}
        <button
          className="sm:hidden text-foreground dark:text-white"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {isOpen && (
        <div className="sm:hidden backdrop-blur-soft bg-glass-light dark:bg-glass-dark border-t border-gray-200 dark:border-gray-800">
          <ul className="flex flex-col items-center py-4 gap-4 text-sm font-medium">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={closeMenu}
                  className={`block transition hover:text-primary dark:hover:text-primary-light ${
                    pathname === item.href
                      ? "text-primary dark:text-primary-light"
                      : "text-foreground dark:text-gray-300"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
