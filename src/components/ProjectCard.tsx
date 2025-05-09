import Link from "next/link";
import { ExternalLink } from "lucide-react";

interface ProjectCardProps {
  title: string;
  description: string;
  url: string;
  tags?: string[];
}

export default function ProjectCard({
  title,
  description,
  url,
  tags = [],
}: ProjectCardProps) {
  return (
    <div className="bg-glass-light dark:bg-glass-dark backdrop-blur-soft border border-gray-200 dark:border-gray-800 rounded-xl shadow-md hover:shadow-glow transition p-6">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xl font-semibold text-foreground dark:text-gray-100">
          {title}
        </h2>
        <Link
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline"
        >
          <ExternalLink className="w-5 h-5" />
        </Link>
      </div>
      <p className="text-gray-700 dark:text-gray-300 mb-4">
        {description || "No description provided."}
      </p>
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-1 bg-muted-light dark:bg-muted-dark text-gray-700 dark:text-gray-300 rounded"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
