"use client";
import Image from "next/image";
import Timeline from "@/components/Timeline";

export default function AboutPage() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 py-20 sm:py-32 text-center font-sans">
      <div className="max-w-3xl">
        <Image
          src="/images/me-1.jpg"
          alt="Albin Ryberg"
          width={160}
          height={160}
          className="rounded-full mx-auto mb-6"
        />

        <h1 className="text-4xl sm:text-5xl font-bold mb-4">About Me</h1>
        <p className="text-lg sm:text-xl mb-6">
          I’m Albin, a passionate web developer based in Sweden, currently in my
          second year of a Bachelor’s in Web Programming. My interests lie in
          building clean, responsive, and performant web applications.
        </p>
        <p className="text-lg sm:text-xl mb-6">
          I have experience with tools like Next.js, React, Tailwind CSS,
          TypeScript, and also backend technologies like Node.js, Python, and
          Flask. I enjoy turning complex problems into elegant solutions.
        </p>
        <p className="text-lg sm:text-xl mb-6">
          Outside of coding, I’m into fitness, the outdoors, and exploring how
          technology can solve real-world problems. I believe in continuous
          learning and love working on meaningful projects.
        </p>
      </div>
      <Timeline />
    </section>
  );
}
