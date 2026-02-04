"use client";
import { useEffect, useState } from "react";

type Profile = {
  name: string;
  role: string;
  stack: string[];
};

export default function Home() {
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    fetch("http://localhost:8000/profile")
      .then((res) => res.json())
      .then((data) => setProfile(data));
  }, []);

  return (
  <main style={{ padding: 20 }}>
    <h1>My Portfolio</h1>

    {!profile && <p>Loading...</p>}

    {profile && (
      <>
        <h2>{profile.name}</h2>
        <p>{profile.role}</p>

        <h3>Tech Stack</h3>
        <ul>
          {profile.stack.map((tech) => (
            <li key={tech}>{tech}</li>
          ))}
        </ul>

        <hr />

        <a href="/projects">→ View My Projects</a>
      </>
    )}
  </main>
);

}
