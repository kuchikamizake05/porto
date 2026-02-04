import Link from "next/link";
import { Github, Linkedin, Twitter, Mail } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const social = [
    { label: "GitHub", href: "https://github.com", icon: Github },
    { label: "LinkedIn", href: "https://linkedin.com", icon: Linkedin },
    { label: "Twitter", href: "https://twitter.com", icon: Twitter },
    { label: "Email", href: "mailto:hello@example.com", icon: Mail },
  ];

  return (
    <footer className="relative z-10 pt-8 pb-24 bg-white dark:bg-zinc-950 border-t border-zinc-100 dark:border-white/5">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Brand & Copyright */}
          <div className="flex flex-col items-center md:items-start gap-1">
            <Link href="/" className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white group flex items-center gap-1">
              Faaid <span className="text-blue-500 group-hover:drop-shadow-[0_0_8px_rgba(59,130,246,0.5)] transition-all">Sakhaa</span>
            </Link>
            <p className="text-[11px] text-zinc-500 dark:text-zinc-400 font-bold uppercase tracking-widest">
              © {currentYear} • Digital Excellence
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-6">
            {social.map((item) => (
              <a 
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="text-zinc-400 hover:text-blue-500 transition-colors"
                aria-label={item.label}
              >
                <item.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
