import React from "react";

export default function ImagePreview({ images, initialIndex = 0, onClose }) {
  const containerRef = React.useRef(null);

  React.useEffect(() => {
    // Scroll to the selected image on open
    if (containerRef.current) {
      const img = containerRef.current.children[initialIndex];
      if (img) img.scrollIntoView({ behavior: "auto", block: "center" });
    }
  }, [initialIndex]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex flex-col items-center justify-center">
      <button
        className="absolute top-4 right-4 text-white text-2xl"
        onClick={onClose}
        aria-label="Close"
      >
        &times;
      </button>
      <div
        ref={containerRef}
        className="overflow-y-auto h-full w-full flex flex-col items-center py-8"
        style={{ maxHeight: "100vh" }}
      >
        {images.map((img, idx) => (
          <img
            key={idx}
            src={img.src}
            alt={img.alt}
            className="mb-8 max-h-[80vh] object-contain rounded-lg shadow-lg"
            style={{ maxWidth: "90vw" }}
          />
        ))}
      </div>
    </div>
  );
}
