import Image from "next/image";

type ProjectCardProps = {
  title: string;
  description: string;
  tech: string | string[];
  imageUrl?: string;
  repoUrl?: string;
};

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
    <div className="group bg-white/2 rounded-3xl border border-white/5 overflow-hidden hover:shadow-[0_0_50px_rgba(37,99,235,0.15)] hover:border-blue-500/30 hover:-translate-y-2 transition-all duration-500 flex flex-col h-full backdrop-blur-sm">
      <div className="relative aspect-video bg-white/2 overflow-hidden">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out brightness-[0.85] group-hover:brightness-100"
          />
        ) : (
          <div className="w-full h-full bg-linear-to-br from-white/5 to-white/2 flex items-center justify-center">
            <span className="text-4xl group-hover:scale-110 transition-transform duration-500 filter grayscale group-hover:grayscale-0">🚀</span>
          </div>
        )}
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
        
        {repoUrl && (
          <div className="absolute top-4 right-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
            <a
              href={repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-blue-600/90 backdrop-blur-md rounded-2xl text-white hover:bg-blue-500 transition-all shadow-2xl text-[10px] uppercase font-bold tracking-widest"
            >
              View Repository ↗
            </a>
          </div>
        )}
      </div>

      <div className="p-8 flex flex-col flex-1">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
            {title}
          </h2>
          <p className="text-gray-400 text-sm leading-relaxed line-clamp-3 font-light">
            {description}
          </p>
        </div>

        <div className="mt-auto pt-6 border-t border-white/5 flex flex-wrap gap-2">
          {techArray.map((t) => (
            <span
              key={t}
              className="px-3 py-1 bg-white/5 text-gray-500 rounded-lg text-[10px] font-bold uppercase tracking-wider hover:bg-blue-500/10 hover:text-blue-400 border border-white/5 transition-colors cursor-default"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
