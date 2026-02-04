"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const navLinks = [
    { href: "/#about", label: "About" },
    { href: "/#projects", label: "Projects" },
    { href: "/#experience", label: "Experience" },
    { href: "/#contact", label: "Contact" },
  ];

  return (
    <nav className="sticky top-0 z-50 px-6 py-5 border-b border-white/5 bg-black/40 backdrop-blur-xl">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="group flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-lg transform group-hover:rotate-12 transition-transform shadow-[0_0_20px_rgba(37,99,235,0.4)]">
            K
          </div>
          <span className="text-lg font-bold tracking-tight text-white group-hover:text-blue-400 transition-colors">
            Kuchikamizake<span className="text-blue-500">.</span>
          </span>
        </Link>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 text-sm font-semibold rounded-xl transition-all duration-300 ${
                  isActive
                    ? "text-blue-400 bg-blue-500/10"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Mobile Nav Placeholder or Action Button */}
        <div className="md:hidden w-8 h-8 flex items-center justify-center">
          <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </div>
      </div>
    </nav>
  );
}
