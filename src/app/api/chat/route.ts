// app/api/chat/route.ts
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: NextRequest) {
  const { message } = await req.json();

  const context = `
You are an assistant that helps users learn about Albin Ryberg, a web developer from Sweden.
- He studies at BTH (Blekinge Institute of Technology).
- His main projects include: C2 Security App (Python/Quart), Studentpoolen (Next.js + MongoDB), and Stonkbot (AI trading bot with Flask).
- He works with TypeScript, Tailwind CSS, Next.js, React, Python, Flask, and MongoDB.
- He is interested in AI, security, and building strong UIs with React.
`;

  const chat = await openai.chat.completions.create({
    messages: [
      { role: "system", content: context },
      { role: "user", content: message },
    ],
    model: "gpt-3.5-turbo",
  });

  return NextResponse.json({ reply: chat.choices[0].message.content });
}
