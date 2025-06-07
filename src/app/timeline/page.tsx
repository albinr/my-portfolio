// components/Timeline.tsx
"use client";

import { useState } from "react";

export type TimelineItem = {
  date: Date;
  title: string;
  type: "education" | "project";
  description: string;
};

const timelineData: TimelineItem[] = [
  {
    date: new Date("2022-08-20"),
    title: "Started BSc Web Programming at BTH",
    type: "education",
    description: "Began 3-year Bachelor's program focused on full-stack web development, modern frameworks, and agile workflows."
  },
  {
    date: new Date("2023-05-30"),
    title: "C2 Security Application Project",
    type: "project",
    description: "Built a full Command and Control app for the Swedish Blue Team. Developed a Python/Quart backend and Tkinter/WebSocket-based client."
  },
  {
    date: new Date("2023-11-15"),
    title: "Studentpoolen Project – Admin Dashboard",
    type: "project",
    description: "Created a modern admin interface using Next.js, Tailwind, and TypeScript. Integrated with Spring Boot backend and Auth0 for roles."
  },
  {
    date: new Date("2024-06-01"),
    title: "Started AI Trading Bot (Stonkbot)",
    type: "project",
    description: "Launched personal summer project to build a reinforcement learning-based trading bot using Python and Flask."
  }
];

export default function Timeline() {
  const [filter, setFilter] = useState<"all" | "education" | "project">("all");

  const filtered =
    filter === "all" ? timelineData : timelineData.filter((t) => t.type === filter);

  const formatDate = (date: Date) => {
    return date.toLocaleString("default", { month: "long", year: "numeric" });
  };

  return (
    <section className="w-full py-12 px-4">
      <h2 className="text-2xl font-bold mb-6">My Journey</h2>

      <div className="flex gap-4 mb-6">
        {(["all", "education", "project"] as const).map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-4 py-2 rounded-full border transition ${
              filter === type
                ? "bg-[var(--foreground)] text-[var(--background)]"
                : "bg-transparent text-[var(--foreground)] border-[var(--foreground)]"
            }`}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

      <div className="space-y-6 border-l-2 border-[var(--foreground)]/30 pl-4">
        {filtered.map((item, index) => (
          <div key={index} className="relative ml-4">
            <span className="absolute -left-4 top-2 w-3 h-3 rounded-full bg-[var(--foreground)] shadow-[var(--shadow-glow)]" />
            <div
              className="p-4 rounded-xl border border-[var(--foreground)]/20"
              style={{
                backgroundColor: "var(--glass-dark)",
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
                boxShadow: "var(--shadow-glow)",
                color: "var(--foreground)"
              }}
            >
              <p className="text-sm opacity-70">
                {formatDate(item.date)}
              </p>
              <h3 className="text-xl font-semibold mt-1">
                {item.title}
              </h3>
              <p className="mt-2 text-sm opacity-80">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
