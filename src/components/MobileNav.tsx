"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { TransitionLink } from "@/components/utils/TransitionLink";
import ThemeToggle from "@/components/ThemeToggle";

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

      {/* Slide-down panel */}
      <div
        ref={panelRef}
        className={`fixed top-16 left-0 right-0 z-50 sm:hidden border-t transition-all duration-300 transform ${
          isOpen
            ? "opacity-100 translate-y-0 visible"
            : "opacity-0 -translate-y-4 invisible"
        }`}
        style={{
          backgroundColor: "var(--glass-light)",
          borderColor: "var(--foreground)",
          backdropFilter: "blur(6px)",
          WebkitBackdropFilter: "blur(6px)",
        }}
      >
        <ul className="flex flex-col items-center py-4 gap-4 text-sm font-medium">
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
        <div className="flex justify-center pb-4">
          <ThemeToggle />
        </div>
      </div>
    </>
  );
}
