import Image from "next/image";
import ShineBorder from "./core/ShineBorder";

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
  const techArray =
    typeof tech === "string" ? tech.split(",").map((t) => t.trim()) : tech;

  return (
    <ShineBorder
      className="group h-full"
      borderRadius="2rem"
      borderWidth={1}
      duration={20}
      color={["#2563eb", "#4f46e5", "#2563eb"]}
    >
      <div
        className="
          bg-white/5 backdrop-blur-xl border border-white/5
          overflow-hidden flex flex-col h-full
          transition-all duration-500 ease-[0.16,1,0.3,1]
          group-hover/card:-translate-y-1
          group-hover/card:shadow-[0_20px_60px_rgba(0,0,0,0.6)]
          group/card
        "
      >
        {/* IMAGE */}
        <div className="relative h-[45%] bg-zinc-900 overflow-hidden">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="
                object-cover
                transition-transform duration-700 ease-[0.16,1,0.3,1]
                group-hover/card:scale-105
              "
            />
          ) : (
            <div className="w-full h-full bg-white/5 flex items-center justify-center">
              <span className="text-6xl opacity-20">🚀</span>
            </div>
          )}

          {/* OVERLAY */}
          <div
            className="
              absolute inset-0
              bg-gradient-to-t from-zinc-950/60 via-zinc-950/20 to-transparent
              transition-opacity duration-500
              group-hover/card:opacity-40
            "
          />

          {/* REPO BUTTON */}
          {repoUrl && (
            <a
              href={repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="
                absolute top-4 right-4
                px-4 py-2 rounded-xl
                bg-blue-600/90 text-white
                text-[10px] font-bold uppercase tracking-widest
                opacity-0 translate-y-2
                transition-all duration-500
                group-hover/card:opacity-100 group-hover/card:translate-y-0
              "
            >
              View Repo ↗
            </a>
          )}
        </div>

        {/* CONTENT */}
        <div className="p-6 flex flex-col flex-1">
          <div className="mb-4">
            <h3
              className="
                text-xl font-bold text-white mb-2
                transition-colors duration-300
                group-hover/card:text-blue-400
              "
            >
              {title}
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">
              {description}
            </p>
          </div>

          {/* TECH */}
          <div className="mt-auto pt-4 border-t border-white/5 flex flex-wrap gap-2">
            {techArray.map((t) => (
              <span
                key={t}
                className="
                  px-3 py-1 text-[9px]
                  text-gray-500 uppercase tracking-wider font-bold
                  border border-white/5 rounded-lg
                  transition-colors duration-300
                  group-hover/card:text-blue-400
                  group-hover/card:border-blue-500/30
                "
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
