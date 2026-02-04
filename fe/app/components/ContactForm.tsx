"use client";
import { useState } from "react";
import { apiPost } from "../lib/api";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
        await apiPost("/contact", { name, message });
        setStatus("Message sent successfully!");
        setName("");
        setMessage("");
    } catch {
        setStatus("Failed to send message.");
    }
  }
  
  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="space-y-3">
        <label className="text-[10px] font-bold text-blue-300 uppercase tracking-[0.2em] ml-1">
          Full Name
        </label>
        <input
          placeholder="e.g. Alexander Pierce"
          className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-blue-500 focus:bg-white/10 transition-all outline-hidden text-white placeholder:text-gray-600 font-light"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div className="space-y-3">
        <label className="text-[10px] font-bold text-blue-300 uppercase tracking-[0.2em] ml-1">
          Project Brief
        </label>
        <textarea
          placeholder="Describe your vision here..."
          className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-blue-500 focus:bg-white/10 transition-all outline-hidden text-white placeholder:text-gray-600 font-light resize-none"
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
      </div>

      <button
        type="submit"
        className="w-full py-5 rounded-2xl bg-white text-black font-bold hover:bg-blue-400 hover:text-white transition-all hover:scale-[1.02] active:scale-95 shadow-2xl group flex items-center justify-center gap-3"
      >
        Initiate Project
        <span className="group-hover:translate-x-1 transition-transform">🚀</span>
      </button>

      {status && (
        <div className={`text-center p-4 rounded-2xl text-xs font-bold uppercase tracking-widest border ${
          status.includes("successfully") 
            ? "border-green-500/20 bg-green-500/10 text-green-400" 
            : "border-red-500/20 bg-red-500/10 text-red-400"
        }`}>
          {status}
        </div>
      )}
    </form>
  );
}
