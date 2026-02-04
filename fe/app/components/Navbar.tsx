import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="px-6 py-4 border-b bg-white">
      <div className="max-w-3xl mx-auto flex gap-6">
        <Link href="/" className="font-medium hover:underline">
          Home
        </Link>
        <Link href="/projects" className="font-medium hover:underline">
          Projects
        </Link>
        <Link href="/contact" className="font-medium hover:underline">
          Contact
        </Link>
      </div>
    </nav>
  );
}
