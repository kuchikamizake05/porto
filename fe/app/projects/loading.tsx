const filters = ["ALL", "WEBAPP", "WEBSITE", "UI/UX", "GRAPHIC"];

export default function ProjectsLoading() {
  return (
    <div className="min-h-screen md:pt-12 pt-24 pb-28 relative overflow-hidden bg-transparent">
      <div className="max-w-[1100px] mx-auto px-6 md:px-10">
        <div className="mb-4 flex flex-col items-center">
          <div className="h-12 w-64 animate-pulse rounded-xl bg-white/10 md:h-14 md:w-80" />
        </div>

        <div className="mx-auto mt-5 md:mt-0 mb-6 flex max-w-full items-center justify-start md:justify-center gap-3 overflow-x-auto px-1 pb-2">
          {filters.map((filter) => (
            <div
              key={filter}
              className="h-12 w-28 shrink-0 animate-pulse rounded-xl border border-white/10 bg-white/[0.08]"
            />
          ))}
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="glass-card rounded-[16px] border border-white/10 p-5"
            >
              <div className="aspect-[16/10] w-full animate-pulse rounded-[16px] bg-white/5" />
              <div className="mt-4 h-5 w-3/4 animate-pulse rounded-md bg-white/10" />
              <div className="mt-3 h-4 w-full animate-pulse rounded-md bg-white/5" />
              <div className="mt-2 h-4 w-2/3 animate-pulse rounded-md bg-white/5" />
              <div className="mt-4 flex gap-2">
                <div className="h-7 w-20 animate-pulse rounded-lg bg-white/10" />
                <div className="h-7 w-20 animate-pulse rounded-lg bg-white/10" />
              </div>
              <div className="mt-5 flex gap-2">
                <div className="h-[35px] flex-1 animate-pulse rounded-xl bg-blue-500/20" />
                <div className="h-[35px] flex-[1.2] animate-pulse rounded-xl bg-white/10" />
              </div>
            </div>
          ))}
        </div>

        <div className="h-40" />
      </div>
    </div>
  );
}
