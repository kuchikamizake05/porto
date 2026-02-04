type ProjectCardProps = {
  title: string;
  description: string;
  tech: string[];
};

export default function ProjectCard({
  title,
  description,
  tech,
}: ProjectCardProps) {
  return (
    <div className="rounded-lg border bg-white p-4 space-y-2">
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="text-gray-600">{description}</p>

      <div className="flex flex-wrap gap-2 pt-2">
        {tech.map((t) => (
          <span
            key={t}
            className="px-2 py-1 text-xs rounded-full bg-gray-100 border"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
