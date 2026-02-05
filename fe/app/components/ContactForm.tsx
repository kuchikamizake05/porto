"use client";
import { useState } from "react";
import { apiPost } from "../lib/api";
import { Loader2, Send } from "lucide-react";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await apiPost("/contact", { name, email, message });
      setStatus("Message sent successfully!");
      setName("");
      setEmail("");
      setMessage("");
    } catch {
      setStatus("Failed to send message.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-5">
        {/* Name Field */}
        <div className="space-y-2">
          <input
            placeholder="Your name"
            className="w-full h-[48px] bg-white/5 border border-white/10 rounded-xl px-4 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:bg-white/10 transition-all outline-hidden text-white placeholder:text-zinc-500 text-sm font-medium"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        {/* Email Field */}
        <div className="space-y-2">
          <input
            type="email"
            placeholder="Your email"
            className="w-full h-[48px] bg-white/5 border border-white/10 rounded-xl px-4 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:bg-white/10 transition-all outline-hidden text-white placeholder:text-zinc-500 text-sm font-medium"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* Message Field */}
        <div className="space-y-2">
          <textarea
            placeholder="Your message"
            className="w-full h-[120px] bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:bg-white/10 transition-all outline-hidden text-white placeholder:text-zinc-500 text-sm font-medium resize-none"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="relative w-full h-[45px] rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold tracking-wide transition-all shadow-[0_0_30px_rgba(37,99,235,0.15)] hover:shadow-[0_0_40px_rgba(37,99,235,0.3)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group overflow-hidden"
      >
        <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12" />

        {loading ? (
          <Loader2 className="w-5 h-5 animate-spin relative z-10" />
        ) : (
          <>
            <span className="relative z-10 text-sm">Send Message</span>
            <Send className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
          </>
        )}
      </button>

      {status && (
        <div
          className={`text-center p-3 rounded-xl text-xs font-bold uppercase tracking-widest border ${
            status.includes("successfully")
              ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-400"
              : "border-rose-500/20 bg-rose-500/10 text-rose-400"
          }`}
        >
          {status}
        </div>
      )}
    </form>
  );
}
