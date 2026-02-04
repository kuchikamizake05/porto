"use client";

import { useEffect, useState } from "react";
import { apiGet } from "./lib/api";
import Link from "next/link";

type Profile = {
  name: string;
  role: string;
  stack: string[];
};

export default function Home() {
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    apiGet<Profile>("/profile")
      .then(setProfile)
      .catch(console.error);
  }, []);

return (
  <section className="space-y-6">
    <header className="space-y-2">
      <h1 className="text-3xl font-bold tracking-tight">
        My Portfolio
      </h1>

      {profile && (
        <>
          <h2 className="text-xl font-semibold">
            {profile.name}
          </h2>
          <p className="text-gray-600">
            {profile.role}
          </p>
        </>
      )}
    </header>

    {!profile && (
      <p className="text-gray-500">Loading profile…</p>
    )}

    {profile && (
      <>
        <div>
          <h3 className="text-sm font-medium uppercase tracking-wide text-gray-500 mb-2">
            Tech Stack
          </h3>

          <ul className="flex flex-wrap gap-2">
            {profile.stack.map((tech) => (
              <li
                key={tech}
                className="px-3 py-1 text-sm rounded-full bg-gray-100 border"
              >
                {tech}
              </li>
            ))}
          </ul>
        </div>

        <div className="pt-4 flex gap-4">
          <Link
            href="/projects"
            className="px-4 py-2 rounded-md bg-black text-white hover:bg-gray-800 transition"
          >
            View Projects
          </Link>

          <Link
            href="/contact"
            className="px-4 py-2 rounded-md border hover:bg-gray-100 transition"
          >
            Contact Me
          </Link>
        </div>
      </>
    )}
  </section>
);

}
