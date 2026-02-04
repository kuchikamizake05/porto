import Image from "next/image";

type ProjectCardProps = {
  title: string;
  description: string;
  tech: string | string[];
  imageUrl?: string;
  repoUrl?: string;
};

import ShineBorder from "./core/ShineBorder";

export default function ProjectCard({
  title,
  description,
  tech,
  imageUrl,
  repoUrl,
}: ProjectCardProps) {
  const techArray = typeof tech === "string" 
    ? tech.split(",").map(t => t.trim()) 
    : tech;

  return (
    <ShineBorder
      className="group h-full"
      borderRadius="2rem"
      borderWidth={1}
      duration={20}
      color={["#2563eb", "#4f46e5", "#2563eb"]}
    >
      <div className="bg-white/5 backdrop-blur-xl border border-white/5 overflow-hidden flex flex-col h-full group/card">
        <div className="relative aspect-video bg-zinc-900 overflow-hidden">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-700 ease-[0.16,1,0.3,1] brightness-[0.7] group-hover:brightness-100"
            />
          ) : (
            <div className="w-full h-full bg-white/5 flex items-center justify-center">
              <span className="text-4xl group-hover:scale-110 transition-transform duration-500 opacity-20 filter grayscale group-hover:grayscale-0">🚀</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
          
          {repoUrl && (
            <div className="absolute top-4 right-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
              <a
                href={repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 bg-blue-600/90 backdrop-blur-md rounded-xl text-white hover:bg-blue-500 transition-all shadow-2xl text-[10px] uppercase font-bold tracking-widest"
              >
                View Repository ↗
              </a>
            </div>
          )}
        </div>

        <div className="p-8 flex flex-col flex-1">
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
              {title}
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed line-clamp-3 font-light">
              {description}
            </p>
          </div>

          <div className="mt-auto pt-6 border-t border-white/5 flex flex-wrap gap-2">
            {techArray.map((t) => (
              <span
                key={t}
                className="px-3 py-1 bg-white/5 text-gray-500 rounded-lg text-[9px] font-bold uppercase tracking-wider hover:bg-blue-500/10 hover:text-blue-400 border border-white/5 transition-colors cursor-default"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </ShineBorder>
  );
}
