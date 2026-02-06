import Link from "next/link";
import { Github, Twitter, Facebook } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-zinc-300 pb-20">
      {/* TOP DIVIDER */}
      <div className="h-px w-full bg-white/10" />
      <div className="max-w-7xl mx-auto px-6 md:px-20 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-50 justify-items-center md:justify-items-start text-center md:text-left">
          {/* BRAND */}
          <div className="space-y-4">
            <h3 className="text-xl font-extrabold text-white tracking-tight">
              Kuchikamizake<span className="text-blue-500">.</span>
            </h3>
            <p className="text-base text-zinc-400 leading-relaxed max-w-sm">
              Let's make everything better!
            </p>

            {/* SOCIAL */}
            <div className="flex justify-center md:justify-start items-center gap-6 pt-2">
              <a href="#" className="hover:text-white transition-colors">
                <Github className="w-6 h-6" />
              </a>
              <a href="#" className="hover:text-sky-400 transition-colors">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="#" className="hover:text-blue-500 transition-colors">
                <Facebook className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* UTAMA */}
          <div className="space-y-4">
            <h4 className="text-white text-xl font-semibold">Quick Links</h4>
            <ul className="space-y-3 text-base">
              <li>
                <Link href="#" className="hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  About
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Project
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* KOMUNITAS */}
          <div className="space-y-4">
            <h4 className="text-white text-xl font-semibold">Contact</h4>
            <ul className="space-y-3 text-base">
              <li>
                <Link href="#" className="hover:text-white">
                  Email
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Phone
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Address
                </Link>
              </li>
            </ul>
          </div>

          {/* RESOURCES */}
          <div className="space-y-4">
            <h4 className="text-white text-xl font-semibold">Socials</h4>
            <ul className="space-y-3 text-base">
              <li>
                <Link href="#" className="hover:text-white">
                  Github
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Twitter
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Facebook
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Instagram
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* BOTTOM DIVIDER */}
      <div className="h-px w-full bg-white/10" />
      {/* COPYRIGHT */}
      <div className="text-center py-6 text-xs text-zinc-500">
        © {currentYear} Kuchikamizake. All rights reserved.
      </div>
    </footer>
  );
}
