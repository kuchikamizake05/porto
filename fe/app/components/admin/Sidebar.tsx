"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

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
    <aside className="fixed inset-y-0 left-0 w-72 bg-black border-r border-white/5 hidden lg:flex flex-col">
      <div className="p-8"></div>

      <nav className="flex-1 px-4 space-y-1">
        <p className="px-4 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-600 mb-4"></p>
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 group ${
                isActive
                  ? "bg-blue-600 text-white shadow-[0_0_30px_rgba(37,99,235,0.2)] font-semibold"
                  : "text-gray-500 hover:text-white hover:bg-white/5"
              }`}
            >
              <span
                className={`text-lg transition-transform ${isActive ? "" : "group-hover:scale-120"}`}
              >
                {item.icon}
              </span>
              <span className="text-sm tracking-wide">{item.name}</span>
              {isActive && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white shadow-sm" />
              )}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/5">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-4 rounded-2xl text-gray-400 hover:text-red-400 hover:bg-red-500/5 transition-all font-medium text-sm group"
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
