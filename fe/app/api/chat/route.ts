import Groq from "groq-sdk";
import { NextResponse } from "next/server";
import prisma from "@/app/lib/db";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "GROQ_API_KEY is not set" },
        { status: 500 }
      );
    }

    // Fetch dynamic data from database
    const [experiences, educations, projects] = await Promise.all([
      prisma.experience.findMany(),
      prisma.education.findMany(),
      prisma.project.findMany(),
    ]);

    // Build dynamic context strings
    const experienceContext = experiences
      .map(
        (e) =>
          `- ${e.role} at ${e.company} (${e.duration})${e.description ? `: ${e.description}` : ""}`
      )
      .join("\n");

    const educationContext = educations
      .map(
        (e) =>
          `- ${e.degree} at ${e.school} (${e.duration})${e.description ? `: ${e.description}` : ""}`
      )
      .join("\n");

    const projectContext = projects
      .map(
        (p) =>
          `- ${p.title} [${p.category}]: ${p.description}${p.tech ? ` | Tech: ${p.tech}` : ""}${p.siteUrl ? ` | Live: ${p.siteUrl}` : ""}${p.repoUrl ? ` | Repo: ${p.repoUrl}` : ""}`
      )
      .join("\n");

    const systemPrompt = `You are a personal AI assistant for Faaid Sakhaa's (also known as "Sako") portfolio website. Answer questions about Faaid briefly and naturally. IMPORTANT: Keep every response to a maximum of 2-3 short sentences. Never write long paragraphs or lists. Be direct and friendly. Only answer questions related to Faaid and his portfolio — if asked about something unrelated, politely redirect in one sentence.

## About Faaid
- **Full Name:** Faaid Sakhaa (goes by "Sako")
- **Status:** Undergraduate Information Engineering student at Universitas Gadjah Mada (UGM)
- **Bio:** Undergraduate Information Engineering student at Universitas Gadjah Mada with experience in event management, logistics coordination, and leadership roles. Strong interest in information technology, particularly in cyber security and digital infrastructure. Highly motivated to develop technical skills and professional discipline while continuously expanding academic and organizational experience.

## Tech Stack / Skills
Python, TypeScript, JavaScript, C++, React, Next.js, Node.js, TailwindCSS, MySQL, MongoDB, Docker, Supabase, AWS, Google Cloud, Git, GitHub

## Contact & Socials
- **Email:** faaidsakhaa@gmail.com
- **GitHub:** https://github.com/kuchikamizake05
- **LinkedIn:** https://linkedin.com/in/faaid-sakhaa

## Work Experience
${experienceContext || "No experience data available yet."}

## Education
${educationContext || "No education data available yet."}

## Projects
${projectContext || "No project data available yet."}

Keep your answers concise (2-4 sentences max unless more detail is clearly needed). Be friendly and speak as if you personally know Faaid.`;

    const groq = new Groq({ apiKey });

    // Convert messages to Groq format, skip initial bot greeting
    const chatHistory: Array<{ role: "user" | "assistant"; content: string }> =
      [];
    for (let index = 0; index < messages.length - 1; index += 1) {
      const message = messages[index];
      if (message.sender === "bot" && index === 0) continue;

      chatHistory.push({
        role: message.sender === "user" ? "user" : "assistant",
        content: message.text,
      });
    }

    const lastMessage = messages[messages.length - 1].text;

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: systemPrompt },
        ...chatHistory,
        { role: "user", content: lastMessage },
      ],
      max_tokens: 512,
    });

    const text = completion.choices[0]?.message?.content ?? "No response";

    return NextResponse.json({ text });
  } catch (error: any) {
    console.error("Error in chat API:", error?.message ?? error);
    return NextResponse.json(
      {
        error: "Failed to process chat request",
        detail: error?.message ?? String(error),
      },
      { status: 500 }
    );
  }
}
