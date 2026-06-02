"use client";
import { useReducer } from "react";
import { apiPost } from "@/app/lib/api";
import { Loader2, Send } from "lucide-react";

export default function ContactForm() {
  const [state, dispatch] = useReducer(
    (
      current: {
        name: string;
        email: string;
        message: string;
        status: string;
        loading: boolean;
      },
      next: Partial<typeof current>,
    ) => ({ ...current, ...next }),
    {
      name: "",
      email: "",
      message: "",
      status: "",
      loading: false,
    },
  );

  const { name, email, message, status, loading } = state;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch({ loading: true });

    try {
      await apiPost("/contact", { name, email, message });
      dispatch({
        status: "Message sent successfully!",
        name: "",
        email: "",
        message: "",
      });
    } catch {
      dispatch({ status: "Failed to send message." });
    } finally {
      dispatch({ loading: false });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-5">
        {/* Name Field */}
        <div className="space-y-2">
          <input
            aria-label="Your name"
            placeholder="Your name"
            className="w-full h-[48px] bg-white/5 border border-white/10 rounded-xl px-4 focus:border-zinc-500/50 focus:bg-white/10 transition-all outline-hidden text-white placeholder:text-zinc-500 text-sm font-medium"
            value={name}
            onChange={(e) => dispatch({ name: e.target.value })}
            required
          />
        </div>

        {/* Email Field */}
        <div className="space-y-2">
          <input
            aria-label="Your email"
            type="email"
            placeholder="Your email"
            className="w-full h-[48px] bg-white/5 border border-white/10 rounded-xl px-4  focus:bg-white/10 focus:border-zinc-500/50 transition-all outline-hidden text-white placeholder:text-zinc-500 text-sm font-medium"
            value={email}
            onChange={(e) => dispatch({ email: e.target.value })}
            required
          />
        </div>

        {/* Message Field */}
        <div className="space-y-2">
          <textarea
            aria-label="Your message"
            placeholder="Your message"
            className="w-full h-[120px] bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:bg-white/10 focus:border-zinc-500/50 transition-all outline-hidden text-white placeholder:text-zinc-500 text-sm font-medium resize-none"
            value={message}
            onChange={(e) => dispatch({ message: e.target.value })}
            required
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="relative w-full h-[45px] rounded-full bg-linear-to-b from-blue-500 to-blue-700 hover:bg-linear-to-b from-blue-400 to-blue-600 text-white font-bold tracking-wide transition-all shadow-[0_0_30px_rgba(37,99,235,0.15)] hover:shadow-[0_0_40px_rgba(37,99,235,0.3)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group overflow-hidden"
      >
        <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12" />

        {loading ? (
          <Loader2 className="size-5 animate-spin relative z-10" />
        ) : (
          <>
            <span className="relative z-10 text-sm">Send Message</span>
            <Send className="size-4 relative z-10 group-hover:translate-x-1 transition-transform" />
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
