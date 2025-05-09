import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center text-center px-6 py-20 sm:py-32 font-sans bg-background dark:bg-background">
      <div className="max-w-3xl">
        <Image
          src="/images/albin-ryberg.png"
          alt="Albin Ryberg"
          width={120}
          height={120}
          className="rounded-full mx-auto mb-6 shadow-glow"
        />

        <h1 className="text-4xl sm:text-5xl font-bold text-foreground dark:text-white mb-4">
          Hi, I’m Albin 👋
        </h1>

        <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 mb-8">
          I’m a web developer focused on building fast, accessible, and
          beautiful web experiences using modern tools like Next.js, TypeScript,
          and Tailwind CSS.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/projects"
            className="bg-primary text-white px-6 py-3 rounded-full font-medium hover:bg-primary-dark shadow-glow transition"
          >
            View My Work
          </Link>
          <Link
            href="/contact"
            className="border border-gray-300 dark:border-gray-600 text-foreground dark:text-white px-6 py-3 rounded-full font-medium hover:bg-muted-light dark:hover:bg-muted-dark transition"
          >
            Contact Me
          </Link>
        </div>
      </div>
    </section>
  );
}
