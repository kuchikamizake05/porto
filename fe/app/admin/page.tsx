import Link from "next/link";

export default function AdminDashboard() {
  return (
    <div className="space-y-10">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight text-white">Dashboard Overview</h1>
        <p className="text-gray-400 font-light">Manage your professional presence and content.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link 
          href="/admin/projects"
          className="p-8 bg-white/2 border border-white/5 rounded-3xl hover:bg-white/4 transition-all group backdrop-blur-sm"
        >
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <h2 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">Projects</h2>
              <p className="text-sm text-gray-500 max-w-50 leading-relaxed">Manage your portfolio projects, tech stacks, and links.</p>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
              🚀
            </div>
          </div>
        </Link>

        <Link 
          href="/admin/experience"
          className="p-8 bg-white/2 border border-white/5 rounded-3xl hover:bg-white/4 transition-all group backdrop-blur-sm"
        >
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <h2 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">Experience</h2>
              <p className="text-sm text-gray-500 max-w-50 leading-relaxed">Update your work history and professional journey.</p>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
              💼
            </div>
          </div>
        </Link>
      </div>

      <div className="p-8 bg-blue-600/5 border border-blue-500/10 rounded-3xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-3xl -mr-16 -mt-16 rounded-full" />
        <h3 className="text-blue-400 font-bold mb-3 text-lg">Quick Tip</h3>
        <p className="text-gray-400 text-sm leading-relaxed max-w-2xl font-light">
          Changes made to your projects or experience items will be reflected instantly on your public portfolio home page. 
          Make sure to use high-quality images and clear descriptions for the best impact!
        </p>
      </div>
    </div>
  );
}
