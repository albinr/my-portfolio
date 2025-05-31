// app/resume/page.tsx

export default function ResumePage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-12 bg-[var(--background)] text-[var(--foreground)]">
      <div
        className="w-full max-w-5xl h-[90vh] rounded-2xl shadow-lg overflow-hidden"
        style={{
          backgroundColor: "var(--glass-light)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          boxShadow: "var(--shadow-glow)",
        }}
      >
        <iframe
          src="/cv.pdf"
          className="w-full h-full rounded-md border border-gray-200"
          title="CV"
        ></iframe>
      </div>
    </main>
  );
}
