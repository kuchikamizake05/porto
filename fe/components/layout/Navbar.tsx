"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { m as motion } from "motion/react";
import { User, Home, Clock, Github, Linkedin, Code, Mail } from "lucide-react";
import Magnetic from "../ui/Magnetic";
import Image from "next/image";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const navItems = [
    { href: "/", icon: Home, label: "Home" },
    { href: "/about", icon: User, label: "About" },
    { href: "/projects", icon: Code, label: "Projects" },
  ];

  const socialItems = [
    {
      href: "https://github.com/kuchikamizake05",
      icon: Github,
      label: "GitHub",
    },
    {
      href: "https://linkedin.com/in/faaid-sakhaa",
      icon: Linkedin,
      label: "LinkedIn",
    },
  ];

  const scrollToContact = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    } else {
      sessionStorage.setItem("scrollToContact", "true");
      router.push("/");
    }
  };

  return (
    <>
      {/* Top Header Bar */}
      <div className="fixed top-0 left-0 w-full z-20 p-8 pointer-events-none">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="pointer-events-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="group"
            >
              <Image
                src="/logo.png"
                alt="Kuchikamizake Logo"
                width={36}
                height={36}
                className="transition-opacity group-hover:opacity-80"
                priority
              />
            </motion.div>
          </Link>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center text-foreground/75 font-mono text-sm pointer-events-auto"
          >
            <span suppressHydrationWarning>
              {time.toLocaleTimeString("en-GB", {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: false,
              })}
            </span>
          </motion.div>
        </div>
      </div>

      {/* Floating Pill Navigation */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] pointer-events-none">
        <motion.nav
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-auto h-[48px] px-4 py-1 rounded-full border border-white/15 flex items-center gap-2 shadow-[0px_15px_40px_rgba(0,0,0,0.2)] bg-transparent/20 backdrop-blur-[20px]"
        >
          {/* Navigation */}
          <div className="flex items-center gap-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Magnetic key={item.label} strength={0.05}>
                  <Link
                    href={item.href}
                    className={`relative size-8 flex items-center justify-center rounded-full transition-all duration-300 group ${
                      isActive
                        ? "text-blue-400"
                        : "text-foreground/50 hover:text-foreground"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="nav-pill-active"
                        className="absolute size-7 bg-blue-500/15 rounded-full"
                        transition={{
                          type: "spring",
                          bounce: 0.2,
                          duration: 0.6,
                        }}
                      />
                    )}
                    <item.icon className="size-[18px] relative z-10 transition-transform duration-300 group-hover:scale-110" />
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-foreground text-background text-[9px] font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none uppercase tracking-widest leading-none translate-y-2 group-hover:translate-y-0 shadow-lg border border-border/50">
                      {item.label}
                    </div>
                  </Link>
                </Magnetic>
              );
            })}
          </div>

          <div className="w-[1px] h-5 bg-foreground/40 mx-1" />

          {/* Socials */}
          <div className="flex items-center gap-2">
            {socialItems.map((item) => (
              <Magnetic key={item.label} strength={0.05}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative size-8 flex items-center justify-center rounded-full transition-all duration-300 group text-foreground/50 hover:text-foreground"
                >
                  <item.icon className="size-[18px] relative z-10 transition-transform duration-300 group-hover:scale-110" />
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-foreground text-background text-[9px] font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none uppercase tracking-widest leading-none translate-y-2 group-hover:translate-y-0 shadow-lg border border-border/50">
                    {item.label}
                  </div>
                </a>
              </Magnetic>
            ))}
            <Magnetic strength={0.05}>
              <button
                type="button"
                onClick={scrollToContact}
                className="relative size-8 flex items-center justify-center rounded-full transition-all duration-300 group text-foreground/50 hover:text-foreground"
              >
                <Mail className="size-[18px] relative z-10 transition-transform duration-300 group-hover:scale-110" />
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-foreground text-background text-[9px] font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none uppercase tracking-widest leading-none translate-y-2 group-hover:translate-y-0 shadow-lg border border-border/50">
                  Email
                </div>
              </button>
            </Magnetic>
          </div>
        </motion.nav>
      </div>
    </>
  );
}
