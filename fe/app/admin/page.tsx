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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link
          href="/admin/projects"
          className="p-6 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors group"
        >
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h2 className="text-lg font-bold text-white">Projects</h2>
              <p className="text-sm text-gray-500">Kelola project portfolio.</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-2xl">
              🚀
            </div>
          </div>
        </Link>

        <Link
          href="/admin/experience"
          className="p-6 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors group"
        >
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h2 className="text-lg font-bold text-white">Experience</h2>
              <p className="text-sm text-gray-500">Kelola pengalaman kerja.</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-rose-500/10 flex items-center justify-center text-2xl">
              💼
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
