"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, this should be an API call or a more secure check.
    // For now, we'll use a simple environment-variable based check or hardcoded one for demo.
    // But since we can't easily check server-side env in a client component without an API,
    // we'll set a cookie and check it in middleware.
    
    // For simplicity, let's just set a cookie. 
    // The user should set a secure password later.
    if (password === "admin123") { // Temporary hardcoded password
      document.cookie = "admin_auth=true; path=/";
      router.push("/admin");
    } else {
      setError("Password salah!");
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-zinc-900/50 border border-white/10 p-8 rounded-2xl backdrop-blur-xl">
        <h1 className="text-2xl font-bold text-white mb-6 text-center">Admin Login</h1>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-mono"
              placeholder="••••••••"
              required
            />
          </div>
          
          {error && <p className="text-red-500 text-sm">{error}</p>}
          
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)]"
          >
            Masuk
          </button>
        </form>
      </div>
    </div>
  );
}
