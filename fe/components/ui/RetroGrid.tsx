export default function RetroGrid({ className }: { className?: string }) {
  return (
    <div
      className={`pointer-events-none absolute h-full w-full overflow-hidden opacity-50 [perspective:200px] ${className}`}
    >
      {/* Grid */}
      <div className="absolute inset-0 [transform:rotateX(35deg)]">
        <div
          className="animate-grid absolute -inset-[100%] h-[200%] w-[200%] [background-image:linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:60px_60px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_30%,transparent_100%)]"
        />
      </div>

      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent to-90%" />

      <style jsx>{`
        .animate-grid {
          animation: grid 15s linear infinite;
        }

        @keyframes grid {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(60px);
          }
        }
      `}</style>
    </div>
  );
}
