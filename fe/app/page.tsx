"use client";

import { useEffect, useState } from "react";
import { apiGet } from "./lib/api";
import Link from "next/link";
import ProjectsSection from "./components/ProjectsSection";
import ExperienceSection from "./components/ExperienceSection";
import ContactSection from "./components/ContactSection";

type Profile = {
  name: string;
  role: string;
  stack: string[];
};

export default function Home() {
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    apiGet<Profile>("/profile")
      .then(setProfile)
      .catch(console.error);
  }, []);

  return (
    <div className="space-y-20 pb-20">
      {/* Hero / About Section */}
      <section id="about" className="min-h-[85vh] flex flex-col justify-center scroll-mt-20 relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl -z-10" />
        <div className="absolute top-1/2 -left-24 w-72 h-72 bg-indigo-600/10 rounded-full blur-3xl -z-10" />

        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-5 duration-1000">
          {/* Greeting */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-blue-400 text-xs font-bold uppercase tracking-widest shadow-2xl">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Available for new projects
          </div>

          {/* Name & Title */}
          {!profile && (
            <div className="space-y-4">
              <div className="h-16 w-80 bg-white/5 rounded-lg animate-pulse" />
              <div className="h-8 w-56 bg-white/5 rounded-lg animate-pulse" />
            </div>
          )}

          {profile && (
            <div className="space-y-4">
              <h1 className="text-5xl md:text-8xl font-bold tracking-tight text-white leading-[1.1]">
                {profile.name}
              </h1>
              <p className="text-2xl md:text-4xl font-semibold text-transparent bg-clip-text bg-linear-to-r from-blue-400 via-indigo-400 to-blue-400 animate-gradient-x">
                {profile.role}
              </p>
            </div>
          )}

          {/* Bio */}
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl leading-relaxed font-light italic">
            &quot;I bridge the gap between complex logic and elegant design, 
            creating seamless digital experiences that leave a lasting impression.&quot;
          </p>

          {/* Tech Stack */}
          {profile && (
            <div className="space-y-5 pt-4">
              <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-500">
                Core Competencies
              </h3>
              <ul className="flex flex-wrap gap-2">
                {profile.stack.map((tech) => (
                  <li
                    key={tech}
                    className="px-4 py-2 text-xs font-semibold rounded-xl bg-white/5 border border-white/5 text-gray-300 hover:border-blue-500/50 hover:bg-blue-500/5 hover:text-blue-400 transition-all duration-300 cursor-default"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-6 pt-10">
            <Link
              href="#projects"
              className="px-8 py-4 rounded-2xl bg-blue-600 text-white font-bold hover:bg-blue-500 transition-all hover:scale-[1.05] active:scale-95 shadow-[0_0_30px_rgba(37,99,235,0.3)] group"
            >
              View My Work
              <span className="ml-2 group-hover:translate-x-1 inline-block transition-transform">→</span>
            </Link>

            <Link
              href="#contact"
              className="px-8 py-4 rounded-2xl border border-white/10 bg-white/5 font-bold text-white hover:bg-white/10 transition-all hover:scale-[1.05] active:scale-95"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <ProjectsSection />

      {/* Experience Section */}
      <ExperienceSection />

      {/* Contact Section */}
      <ContactSection />
    </div>
  );
}
