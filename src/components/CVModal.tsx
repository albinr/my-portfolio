import { X } from "lucide-react";

export default function CVModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-4 sm:px-6">
      <div
        className="relative w-full max-w-3xl h-[90vh] sm:h-[80vh] p-4 sm:p-6 rounded-2xl shadow-lg overflow-hidden"
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

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white bg-gray-900/80 hover:bg-gray-900/90 p-2 rounded-full shadow transition"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
