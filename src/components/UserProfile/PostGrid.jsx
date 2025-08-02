import React, { useRef, useEffect, useState } from "react";
import { Heart, Camera } from "@phosphor-icons/react";

// Generate 50 images with random picsum photos and likes
const images = Array.from({ length: 50 }, (_, i) => ({
  src: `https://picsum.photos/200?random=${i + 1}`,
  alt: `Image ${i + 1}`,
  likes: Math.floor(Math.random() * 2000 + 100).toLocaleString(),
}));

const BATCH_SIZE = 15;

export default function PostGrid() {
  const [visibleCount, setVisibleCount] = useState(BATCH_SIZE);
  const loaderRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!loaderRef.current) return;
      const rect = loaderRef.current.getBoundingClientRect();
      if (rect.top < window.innerHeight) {
        setVisibleCount((prev) => Math.min(prev + BATCH_SIZE, images.length));
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Load more if already at bottom
    if (loaderRef.current) {
      const rect = loaderRef.current.getBoundingClientRect();
      if (rect.top < window.innerHeight) {
        setVisibleCount((prev) => Math.min(prev + BATCH_SIZE, images.length));
      }
    }
  }, [visibleCount]);

  return (
    <div className="grid grid-cols-3 gap-0.5 p-0 pb-16 pt-0.5">
      {images.slice(0, visibleCount).map((img, idx) => (
        <div key={idx} className="relative h-40 overflow-hidden">
          <img
            src={img.src}
            alt={img.alt}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          {/* Camera Icon (top right, styled like VideoCamera) */}
          <div className="absolute top-2 right-2 z-10">
            <Camera size={18} weight="regular" className="text-white/80" />
          </div>
          {/* Likes Count (bottom left, styled for visibility and alignment) */}
          <div className="absolute left-2 bottom-2 flex items-center gap-1 text-xs z-10 text-white bg-black/50 px-2 py-0.5 rounded-full">
            <Heart size={14} weight="regular" color="currentColor" />
            {img.likes}
          </div>
        </div>
      ))}
      {visibleCount < images.length && (
        <div ref={loaderRef} className="col-span-3 flex justify-center py-4">
          <span className="text-gray-400">Loading more...</span>
        </div>
      )}
    </div>
  );
}
