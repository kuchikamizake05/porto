"use client";
import { useState } from "react";
import { apiPost } from "../lib/api";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
        await apiPost("/contact", { name, message });
        setStatus("Message sent successfully!");
        setName("");
        setMessage("");
    } catch {
        setStatus("Failed to send message.");
    }
  }
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">
          Name
        </label>
        <input
          className="w-full border rounded-md px-3 py-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Message
        </label>
        <textarea
          className="w-full border rounded-md px-3 py-2"
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
      </div>

      <button
        type="submit"
        className="px-4 py-2 rounded-md bg-black text-white hover:bg-gray-800"
      >
        Send Message
      </button>

      {status && (
        <p className="text-sm text-gray-600">{status}</p>
      )}
    </form>
  );
}
