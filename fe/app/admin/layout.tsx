import AdminSidebar from "../components/admin/Sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[#050505]">
      <AdminSidebar />
      <main className="flex-1 lg:ml-72 min-h-screen">
        <header className="h-20 border-b border-white/5 bg-black/40 backdrop-blur-md sticky top-0 z-10 hidden lg:flex items-center justify-between px-12">
          <div className="flex items-center gap-2">
            <span className="text-gray-500 font-medium">Pages</span>
            <span className="text-gray-800">/</span>
            <span className="text-white font-semibold tracking-tight">Dashboard</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-xs font-bold text-gray-400">
              AD
            </div>
          </div>
        </header>
        <div className="p-6 lg:p-12 max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
