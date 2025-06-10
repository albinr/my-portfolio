// app/projects/page.tsx
import ProjectCard from "@/components/ProjectCard";

interface Repo {
  id: number;
  name: string;
  html_url: string;
  description: string;
  created_at: string;
  pushed_at: string;
  language: string;
  stargazers_count: number;
  forks_count: number;
  homepage: string;
}

export default async function ProjectsPage() {
  const res = await fetch("https://api.github.com/users/albinr/repos", {
    next: { revalidate: 3600 },
  });

  const repos: Repo[] = await res.json();

  return (
    <section className="min-h-screen px-6 py-20 sm:py-32 font-sans">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl sm:text-5xl font-bold mb-6">My Projects</h1>
        <p className="text-lg sm:text-xl mb-12">
          Here are some of my public GitHub repositories.
        </p>

        <div className="grid gap-6 text-left md:grid-cols-2">
          {repos.map((repo) => (
            <ProjectCard
              key={repo.id}
              title={repo.name}
              description={repo.description || "No description provided."}
              url={repo.html_url}
              pushed_at={repo.pushed_at}
              created_at={repo.created_at}
              language={repo.language}
              stargazers_count={repo.stargazers_count}
              forks_count={repo.forks_count}
              homepage={repo.homepage}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
