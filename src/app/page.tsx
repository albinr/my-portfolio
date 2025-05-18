import Image from "next/image";
import Link from "next/link";
import Button from "@/components/Button";
import SocialLinks from "@/components/SocialLinks";

export default function Home() {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center text-center px-6 py-20 sm:py-32 font-sans bg-background text-foreground dark:text-white">
      <div className="max-w-3xl w-full">
        <Image
          src="/images/albin-ryberg.png"
          alt="Albin Ryberg"
          width={120}
          height={120}
          className="rounded-full mx-auto mb-6 shadow-glow"
        />

        <h1 className="text-4xl sm:text-5xl font-bold mb-4">
          Hi, I’m Albin 👋
        </h1>

        <p className="text-lg sm:text-xl text-muted dark:text-text-muted mb-8">
          I’m a web developer focused on building fast, accessible, and beautiful web experiences using modern tools like Next.js, TypeScript, and Tailwind CSS.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/projects">
            <Button>View My Work</Button>
          </Link>

          <Link href="/contact">
            <Button variant="outline">Contact Me</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
