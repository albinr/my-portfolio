export default function Footer() {
  return (
    <footer className="text-center text-sm text-foreground dark:text-gray-400 mt-10 py-6 border-t border-gray-200 dark:border-gray-800 bg-glass-light dark:bg-glass-dark backdrop-blur-soft">
      <p>
        © {new Date().getFullYear()} Albin Ryberg — All rights reserved.
      </p>
    </footer>
  );
}
