"use client";

import { ArrowRight, LockKeyhole, ShieldCheck, User } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function LoginPage() {
  const [username, setUsername] = useState("kuchikamizake05");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const body = await response.json().catch(() => null);
        setError(body?.error || "Username atau password salah");
        return;
      }

      window.location.href = "/admin";
    } catch {
      setError("Login gagal. Coba lagi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <div className="min-h-screen grid lg:grid-cols-[0.9fr_1.1fr]">
        <section className="hidden lg:flex flex-col justify-between border-r border-white/10 bg-white/[0.02] px-12 py-10">
          <div className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="Kuchikamizake"
              width={40}
              height={40}
              className="rounded-xl"
              priority
            />
            <div>
              <p className="text-sm font-semibold tracking-tight">
                Kuchikamizake
              </p>
              <p className="text-xs text-gray-500">Portfolio Admin</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-sm text-blue-200">
              <ShieldCheck className="h-4 w-4" />
              Secure admin session
            </div>
            <div className="space-y-4">
              <h1 className="max-w-md text-5xl font-bold leading-tight tracking-tight">
                Kelola portfolio dari satu dashboard.
              </h1>
            </div>
          </div>

          <p className="text-xs text-gray-600">
            Copyright 2024 Kuchikamizake. All rights reserved.
          </p>
        </section>

        <section className="flex min-h-screen items-center justify-center px-5 py-10">
          <div className="w-full max-w-[430px]">
            <div className="mb-8 lg:hidden flex items-center justify-center">
              <Image
                src="/logo.png"
                alt="Kuchikamizake"
                width={48}
                height={48}
                className="rounded-xl"
                priority
              />
            </div>

            <div className="mb-8 space-y-3 text-center lg:text-left">
              <div className="mx-auto lg:mx-0 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] shadow-[0_20px_60px_rgba(37,99,235,0.18)]">
                <LockKeyhole className="h-6 w-6 text-blue-400" />
              </div>
              <div>
                <h2 className="text-3xl font-bold tracking-tight">
                  Admin Login
                </h2>
                <p className="mt-2 text-sm text-gray-500">
                  Masuk untuk mengelola konten portfolio.
                </p>
              </div>
            </div>

            <form
              onSubmit={handleLogin}
              className="space-y-4 rounded-2xl border border-white/10 bg-white/[0.04] p-5 shadow-2xl shadow-black/40 backdrop-blur"
            >
              <label className="block space-y-2">
                <span className="text-sm font-semibold text-gray-300">
                  Username
                </span>
                <span className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/40 px-4 py-3.5 transition focus-within:border-blue-500/60 focus-within:ring-2 focus-within:ring-blue-500/15">
                  <User className="h-5 w-5 text-gray-500" />
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-gray-700"
                    placeholder="kuchikamizake05"
                    autoComplete="username"
                    required
                  />
                </span>
              </label>

              <label className="block space-y-2">
                <span className="text-sm font-semibold text-gray-300">
                  Password
                </span>
                <span className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/40 px-4 py-3.5 transition focus-within:border-blue-500/60 focus-within:ring-2 focus-within:ring-blue-500/15">
                  <LockKeyhole className="h-5 w-5 text-gray-500" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-gray-700"
                    placeholder="Masukkan password"
                    autoComplete="current-password"
                    required
                  />
                </span>
              </label>

              {error && (
                <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3">
                  <p className="text-sm font-medium text-red-300">{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="group mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3.5 text-sm font-bold text-white shadow-[0_18px_50px_rgba(37,99,235,0.35)] transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-blue-600"
              >
                {isSubmitting ? "Memproses..." : "Masuk"}
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </button>
            </form>
          </div>
        </section>
      </div>
    </main>
  );
}
