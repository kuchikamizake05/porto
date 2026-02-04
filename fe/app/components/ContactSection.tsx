"use client";

import ContactForm from "./ContactForm";

export default function ContactSection() {
  return (
    <section id="contact" className="py-32 scroll-mt-20">
      <div className="bg-linear-to-br from-blue-700 to-indigo-900 rounded-[3rem] p-12 md:p-20 text-white relative overflow-hidden shadow-[0_0_80px_rgba(37,99,235,0.25)] border border-white/10">
        {/* Decorative Background */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-black/30 rounded-full blur-3xl hover:bg-black/40 transition-colors" />

        <div className="relative z-10 grid lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-10">
            <div className="space-y-6">
              <h2 className="text-5xl md:text-6xl font-bold tracking-tight leading-[1.1]">Let&apos;s build the <span className="text-blue-300">future</span>.</h2>
              <p className="text-blue-100/70 text-xl font-light leading-relaxed">
                Available for worldwide collaborations and ambitious digital projects. 
                Your vision, powered by precision development.
              </p>
            </div>

            <div className="space-y-8">
              <a href="mailto:hello@example.com" className="flex items-center gap-6 group w-fit">
                <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-3xl group-hover:bg-white group-hover:text-blue-600 transition-all duration-500 shadow-xl">
                  ✉️
                </div>
                <div>
                  <p className="text-blue-300 text-[10px] font-bold uppercase tracking-[0.3em] mb-1">Direct Communication</p>
                  <p className="text-2xl font-semibold tracking-tight">hello@example.com</p>
                </div>
              </a>
              
              <div className="flex items-center gap-6 group w-fit">
                <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-3xl shadow-xl">
                  📍
                </div>
                <div>
                  <p className="text-blue-300 text-[10px] font-bold uppercase tracking-[0.3em] mb-1">Base Location</p>
                  <p className="text-2xl font-semibold tracking-tight">Jakarta, Indonesia</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-black/20 backdrop-blur-xl rounded-[2.5rem] p-10 md:p-12 border border-white/10 shadow-2xl">
            <h3 className="text-2xl font-bold mb-10 text-white tracking-tight flex items-center gap-3">
              <span className="w-8 h-px bg-blue-400" />
              Write a message
            </h3>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
