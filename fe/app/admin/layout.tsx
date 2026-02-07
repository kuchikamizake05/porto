import AdminSidebar from "./components/Sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[#050505]">
      <AdminSidebar />
      <main className="flex-1 lg:ml-72 min-h-screen">
        <header className="h-18 border-b border-white/5 bg-black/60 backdrop-blur-xl sticky top-0 z-10 hidden lg:flex items-center justify-between px-12 shadow-[0_4px_30px_rgba(0,0,0,0.3)]">
          <div className="flex items-center gap-3">
            <span className="text-gray-600 text-sm">Pages</span>
            <span className="text-gray-700">/</span>
            <span className="text-white font-semibold tracking-tight">
              Dashboard
            </span>
          </div>
          <div className="flex items-center gap-4"></div>
        </header>
        <div className="p-6 lg:p-6 max-w-6xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
