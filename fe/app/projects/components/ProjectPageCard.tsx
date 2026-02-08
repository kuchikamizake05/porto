"use client";

import Image from "next/image";
import { motion } from "framer-motion";

type ProjectPageCardProps = {
  title: string;
  description: string;
  tech: string | string[];
  imageUrl?: string;
  repoUrl?: string;
  siteUrl?: string;
};

export default function ProjectPageCard({
  title,
  description,
  tech,
  imageUrl,
  repoUrl,
  siteUrl,
}: ProjectPageCardProps) {
  const techArray =
    typeof tech === "string" ? tech.split(",").map((t) => t.trim()) : tech;

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="glass-card rounded-[16px] p-5 flex flex-col h-full border border-white/5 hover:border-blue-500/20 hover:shadow-[0_0_50px_rgba(37,99,235,0.05)] transition-all duration-500 group"
    >
      {/* Thumbnail */}
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[16px] bg-white/5">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-zinc-700">
            <span className="text-4xl opacity-20">🚀</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 pt-3">
        <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors line-clamp-1">
          {title}
        </h3>

        <p className="text-sm leading-relaxed text-zinc-400  line-clamp-2 font-light">
          {description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-3">
          {techArray.slice(0, 3).map((t) => (
            <span
              key={t}
              className="px-3 py-1 bg-white/[0.03] text-zinc-500 rounded-lg text-[9px] font-bold uppercase tracking-wider border border-white/5"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-2 mt-auto pt-4">
          <a
            href={siteUrl || "#"}
            className="flex-1 h-[35px] flex items-center justify-center bg-blue-600 text-white rounded-xl text-[8px] font-bold uppercase tracking-wider transition-all hover:bg-blue-500 shadow-[0_0_20px_rgba(37,99,235,0.2)]"
          >
            Visit Site
          </a>
          <a
            href={repoUrl || "#"}
            className="flex-[1.2] h-[35px] flex items-center justify-center bg-white/5 border border-white/10 text-white rounded-xl text-[8px] font-bold uppercase tracking-wider transition-all hover:bg-white/10"
          >
            Source Code
          </a>
        </div>
      </div>
    </motion.div>
  );
}
