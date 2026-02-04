"use client";

import ContactForm from "./ContactForm";
import { Mail, MapPin, Github, Linkedin, Twitter, ArrowRight } from "lucide-react";

export default function ContactSection() {
  return (
    <section id="contact" className="pt-12 pb-12 scroll-mt-24 px-4 md:px-0">
      <div className="max-w-6xl mx-auto">
        
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          
          {/* Left Column: Contact Info */}
          <div className="space-y-12">
            <div>
              <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">
                Let's <span className="text-blue-500 italic">Connect</span>
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground font-light leading-relaxed max-w-md">
                Have a vision for your next project? Let's bridge the gap between concept and reality.
              </p>
            </div>

            <div className="space-y-8">
              {/* Contact Details */}
              <div className="space-y-6">
                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-blue-500/10 transition-colors">
                    <MapPin className="w-5 h-5 text-gray-400 group-hover:text-blue-400 transition-colors" />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-zinc-500 block mb-1">Base Location</span>
                    <span className="text-zinc-200">Jakarta, Indonesia</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-blue-500/10 transition-colors">
                    <Mail className="w-5 h-5 text-gray-400 group-hover:text-blue-400 transition-colors" />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-zinc-500 block mb-1">Email Inquiry</span>
                    <a href="mailto:hello@example.com" className="text-zinc-200 hover:text-blue-400 transition-colors">
                      hello@example.com
                    </a>
                  </div>
                </div>
              </div>

              {/* Socials Divider */}
              <div className="h-px w-32 bg-white/10" />

              {/* Social Links */}
              <div className="flex flex-col gap-4">
                {[
                  { label: "Follow on GitHub", icon: Github, href: "https://github.com" },
                  { label: "Connect on LinkedIn", icon: Linkedin, href: "https://linkedin.com" },
                  { label: "Follow on Twitter", icon: Twitter, href: "https://twitter.com" }
                ].map((item) => (
                  <a 
                    key={item.label}
                    href={item.href}
                    target="_blank" 
                    rel="noreferrer"
                    className="flex items-center gap-3 text-zinc-500 hover:text-white transition-colors group w-fit"
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="text-sm font-medium">{item.label}</span>
                    <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Form Container */}
          <div className="relative">
             {/* Glow Effect */}
             <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-[24px] blur-xl opacity-50" />
             
             <div className="glass-card p-8 md:p-10 rounded-[24px] border border-white/5 relative bg-zinc-900/50 backdrop-blur-xl">
                <div className="mb-8">
                  <h3 className="text-xl font-medium text-white mb-2">Send me a message</h3>
                  <p className="text-sm text-zinc-400">I usually respond within 24 hours.</p>
                </div>
                <ContactForm />
             </div>
          </div>

        </div>
      </div>
    </section>
  );
}
