"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

const navItems = [
  { name: "Dashboard", href: "/admin", icon: "📊" },
  { name: "Projects", href: "/admin/projects", icon: "🚀" },
  { name: "Experience", href: "/admin/experience", icon: "💼" },
  { name: "Back to Site", href: "/", icon: "🏠" },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  const handleLogout = () => {
    document.cookie =
      "admin_auth=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT";
    window.location.href = "/";
  };

  return (
    <aside className="fixed inset-y-0 left-0 w-72 bg-black/80 backdrop-blur-xl border-r border-white/5 hidden lg:flex flex-col">
      {/* Branding */}
      <div className="p-6 border-b border-white/5">
        <Link href="/admin" className="flex items-center gap-3 group">
          <div>
            <span className="text-black font-bold tracking-tight">.</span>
            <p className="text-[10px] text-black uppercase tracking-widest"></p>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-1">
        <p className="px-4 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-600 mb-4">
          Navigation
        </p>
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group relative overflow-hidden ${
                isActive
                  ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-[0_0_30px_rgba(37,99,235,0.25)] font-semibold"
                  : "text-gray-500 hover:text-white hover:bg-white/5"
              }`}
            >
              {/* Shine effect for active */}
              {isActive && (
                <div className="absolute inset-0 bg-white/10 -translate-x-full group-hover:translate-x-full transition-transform duration-700 skew-x-12" />
              )}
              <span
                className={`text-lg transition-transform relative z-10 ${!isActive && "group-hover:scale-110"}`}
              >
                {item.icon}
              </span>
              <span className="text-sm tracking-wide relative z-10">
                {item.name}
              </span>
              {isActive && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white shadow-sm relative z-10" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-white/5">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-500 hover:text-red-400 hover:bg-red-500/10 transition-all font-medium text-sm group"
        >
          <span className="group-hover:-translate-x-1 transition-transform">
            🚪
          </span>
          Logout
        </button>
      </div>
    </aside>
  );
}
