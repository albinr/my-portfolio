"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { TransitionLink } from "@/components/utils/TransitionLink";
import ThemeToggle from "@/components/ThemeToggle";
import { X } from "lucide-react";

interface NavItem {
  label: string;
  href: string;
}

interface MobileNavProps {
  isOpen: boolean;
  closeMenu: () => void;
  navItems: NavItem[];
}

export default function MobileNav({
  isOpen,
  closeMenu,
  navItems,
}: MobileNavProps) {
  const pathname = usePathname();
  const panelRef = useRef<HTMLDivElement>(null);

  // Optional: click outside to close
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        closeMenu();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, closeMenu]);

  return (
    <>
      {/* Background overlay */}
      <div
        className={`fixed inset-0 bg-black/40 transition-opacity duration-300 z-40 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={closeMenu}
      />

      {/* Slide-in panel */}
      <div
        ref={panelRef}
        className={`fixed inset-0 z-50 sm:hidden transition-transform duration-300 transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{
          backgroundColor: "var(--glass)",
          borderLeft: "1px solid var(--foreground)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
        }}
      >
        {/* Close button */}
        <button
          onClick={closeMenu}
          className="absolute top-4 right-4 p-2 rounded-full text-[var(--foreground)] hover:bg-[var(--foreground)]/10 transition"
          aria-label="Close menu"
        >
          <X size={24} />
        </button>

        {/* Nav items */}
        <ul className="flex flex-col items-center justify-center h-full gap-6 text-lg font-medium">
          {navItems.map((item) => (
            <li key={item.href}>
              <TransitionLink
                href={item.href}
                onClick={closeMenu}
                className={`transition ${
                  pathname === item.href
                    ? "text-blue-500"
                    : "text-[var(--foreground)]/70 hover:text-[var(--foreground)]"
                }`}
              >
                {item.label}
              </TransitionLink>
            </li>
          ))}
        </ul>

        {/* Theme toggle */}
        <div className="absolute bottom-8 w-full flex justify-center">
          <ThemeToggle />
        </div>
      </div>
    </>
  );
}
