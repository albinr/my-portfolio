// app/projects/page.tsx
import Link from "next/link";

interface Repo {
  id: number;
  name: string;
  html_url: string;
  description: string;
}

export default async function ProjectsPage() {
  const res = await fetch("https://api.github.com/users/albinr/repos", {
    next: { revalidate: 3600 }, // cache for 1 hour
  });

  const repos: Repo[] = await res.json();

  return (
    <section className="min-h-screen px-6 py-20 sm:py-32 font-sans">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl sm:text-5xl font-bold mb-6">My Projects</h1>
        <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 mb-12">
          Here are some of my public GitHub repositories.
        </p>

        <div className="grid gap-6 text-left">
          {repos.map((repo) => (
            <div key={repo.id} className="border p-4 rounded-xl shadow-sm bg-white dark:bg-gray-800">
              <h2 className="text-xl font-semibold">
                <Link href={repo.html_url} target="_blank" className="text-blue-600 hover:underline">
                  {repo.name}
                </Link>
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                {repo.description || "No description provided."}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
