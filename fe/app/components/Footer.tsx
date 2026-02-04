import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 relative z-10">
      <div className="max-w-4xl mx-auto px-6">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/5 to-transparent mb-12" />
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-col items-center md:items-start gap-2">
            <Link href="/" className="text-xl font-bold tracking-tight text-white group flex items-center gap-1">
              Faaid <span className="text-blue-500 group-hover:drop-shadow-[0_0_8px_rgba(59,130,246,0.5)] transition-all">Sakhaa</span>
            </Link>
            <p className="text-[10px] text-gray-600 font-bold uppercase tracking-[0.4em]">
              © {currentYear} • Digital Excellence
            </p>
          </div>

          <div className="flex items-center gap-8">
            {[
              { label: "Github", href: "https://github.com" },
              { label: "Linkedin", href: "https://linkedin.com" },
              { label: "Email", href: "mailto:your@email.com" }
            ].map((link, i) => (
              <a 
                key={i} 
                href={link.href}
                className="text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-blue-400 transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
