"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (password === "admin123") {
      document.cookie = "admin_auth=true; path=/";
      router.push("/admin");
    } else {
      setError("Password salah!");
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-start justify-center px-4 sm:px-6 pt-12 sm:pt-0 relative overflow-hidden">
      <div className="w-full max-w-sm sm:max-w-md relative z-10">
        {/* Branding */}
        <div className="text-center mb-3">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-[0_0_40px_rgba(37,99,235,0.3)]">
            <span className="text-white font-bold text-2xl">K</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Admin Login
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Masukkan password untuk melanjutkan
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white/7 border border-white/10 p-6 sm:p-6 rounded-2xl backdrop-blur-xl">
          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-400">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 sm:py-3.5 bg-white/5 border border-white/10 rounded-xl text-white focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all font-mono placeholder:text-gray-600"
                placeholder="••••••••"
                required
              />
            </div>

            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl">
                <p className="text-red-400 text-sm font-medium">{error}</p>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 sm:py-3.5 rounded-xl transition-all shadow-[0_0_25px_rgba(37,99,235,0.3)] relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-700 skew-x-12" />
              <span className="relative z-10">Masuk</span>
            </button>
          </form>
        </div>

        {/* Footer */}
        <p className="text-center text-gray-600 text-xs mt-2">
          © 2024 Kuchikamizake. All rights reserved.
        </p>
      </div>
    </div>
  );
}
