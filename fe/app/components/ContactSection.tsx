"use client";

import ContactForm from "./ContactForm";

export default function ContactSection() {
  return (
    <section id="contact" className="py-24 scroll-mt-24 px-4 md:px-0">
      <div className="max-w-4xl mx-auto space-y-20">
        <div className="flex flex-col md:flex-row items-center gap-4">
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight shrink-0">
            Let's <span className="text-blue-500 italic">Connect</span>
          </h2>
          <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-12">
            <div className="space-y-6 text-center md:text-left">
              <h3 className="text-5xl md:text-6xl font-bold tracking-tight leading-[1.1] text-white">
                Available for <br />
                <span className="text-blue-400">Collaborations</span>
              </h3>
              <p className="text-gray-400 text-xl font-light leading-relaxed">
                Have a project in mind? Reach out and let's create something extraordinary together.
              </p>
            </div>

            <div className="grid gap-6">
              {[
                { label: "Direct Email", value: "hello@example.com", icon: "✉️" },
                { label: "Base Location", value: "Jakarta, Indonesia", icon: "📍" }
              ].map((item, i) => (
                <div key={i} className="group relative p-8 rounded-3xl bg-white/2 border border-white/5 transition-all duration-500 hover:bg-white/5 hover:border-blue-500/50">
                  <div className="flex items-center gap-6">
                    <div className="text-3xl transition-transform duration-500 group-hover:scale-110">{item.icon}</div>
                    <div>
                      <p className="text-blue-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-1">{item.label}</p>
                      <p className="text-xl md:text-2xl font-semibold text-white tracking-tight">{item.value}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card p-10 md:p-12 rounded-[2.5rem] border border-white/5 shadow-2xl relative">
            {/* Subtle glow behind form */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500/5 blur-[80px] -z-10" />
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
