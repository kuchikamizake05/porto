"use client";
import { useState } from "react";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("http://localhost:8000/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, message }),
    });

    if (res.ok) {
      setStatus("Message sent!");
      setName("");
      setMessage("");
    } else {
      setStatus("Failed to send message");
    }
  };

  return (
    <main style={{ padding: 20 }}>
      <h1>Contact Me</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <input
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <textarea
            placeholder="Your message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>

        <button type="submit">Send</button>
      </form>

      {status && <p>{status}</p>}
    </main>
  );
}
