import Link from "next/link";

export default function AdminDashboard() {
  return (
    <div className="space-y-8 pt-20 md:pt-0">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-white">
          Dashboard
        </h1>
        <p className="text-gray-500 text-sm">Kelola konten portfolio kamu.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          href="/admin/projects"
          className="p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-blue-500/10 hover:border-blue-500/30 transition-all group relative overflow-hidden"
        >
          <div className="flex flex-col gap-4">
            <div className="size-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
              🚀
            </div>
            <div className="space-y-1">
              <h2 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">
                Projects
              </h2>
              <p className="text-sm text-gray-500">Kelola project portfolio.</p>
            </div>
          </div>
        </Link>

        <Link
          href="/admin/experience"
          className="p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-rose-500/10 hover:border-rose-500/30 transition-all group relative overflow-hidden"
        >
          <div className="flex flex-col gap-4">
            <div className="size-12 rounded-xl bg-rose-500/10 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
              💼
            </div>
            <div className="space-y-1">
              <h2 className="text-lg font-bold text-white group-hover:text-rose-400 transition-colors">
                Experience
              </h2>
              <p className="text-sm text-gray-500">Kelola pengalaman kerja.</p>
            </div>
          </div>
        </Link>

        <Link
          href="/admin/education"
          className="p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-amber-500/10 hover:border-amber-500/30 transition-all group relative overflow-hidden"
        >
          <div className="flex flex-col gap-4">
            <div className="size-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
              🎓
            </div>
            <div className="space-y-1">
              <h2 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors">
                Education
              </h2>
              <p className="text-sm text-gray-500">
                Kelola riwayat pendidikan.
              </p>
            </div>
          </div>
        </Link>
      </div>

      <div className="p-6 bg-blue-500/5 border border-blue-500/10 rounded-xl">
        <h3 className="text-blue-400 font-bold mb-2">💡 Tips</h3>
        <p className="text-gray-400 text-sm leading-relaxed">
          Perubahan akan langsung terlihat di halaman portfolio publik.
        </p>
      </div>
    </div>
  );
}
