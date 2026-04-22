"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Solutions", href: "/solutions" },
  { label: "Technology", href: "/technology" },
  { label: "Projects", href: "/projects" },
  { label: "Partners", href: "/partners" },
  { label: "Investors", href: "/investors" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 h-[68px] flex items-center justify-between px-6 md:px-12 transition-all duration-500 ${
          scrolled ? "glass-dark shadow-xl" : "bg-transparent"
        }`}
      >
        <Link href="/" className="flex items-center gap-2.5">
          <Image src="/logo-icon.svg" alt="Aeronyx" width={36} height={36} className="rounded-xl" />
          <span
            className="text-xl font-black tracking-tight"
            style={{ color: scrolled ? "#fff" : "#0f172a" }}
          >
            Aero<span className="gradient-text">nyx</span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1 nav-pill rounded-full px-2 py-1.5">
          {NAV_LINKS.map((item) => {
            const isActive = item.href === pathname;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`px-3.5 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 hover:bg-sky-50 hover:text-sky-600 ${
                  isActive
                    ? "bg-sky-500 text-white shadow-sm"
                    : "text-slate-600"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <button className="btn-primary text-white text-sm font-bold px-5 py-2.5 rounded-full">
            Get a Quote
          </button>
        </div>

        <button
          className="lg:hidden p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ color: scrolled ? "#fff" : "#0f172a" }}
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </header>

      {menuOpen && (
        <div
          className="fixed inset-0 z-40 glass-dark flex flex-col pt-20 px-8 lg:hidden"
          onClick={() => setMenuOpen(false)}
        >
          {NAV_LINKS.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-white text-xl font-semibold py-4 border-b border-white/10"
            >
              {item.label}
            </Link>
          ))}
          <button className="btn-primary text-white font-bold px-6 py-3 rounded-2xl mt-6">
            Get a Quote
          </button>
        </div>
      )}
    </>
  );
}
