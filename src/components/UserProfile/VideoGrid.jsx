import React, { useRef, useEffect } from "react";
import { VideoCamera, Heart } from "@phosphor-icons/react";

// Use reliable video sources from the gist
const videos = [
  {
    src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    alt: "Big Buck Bunny",
    likes: "1.2K",
  },
  {
    src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    alt: "Elephants Dream",
    likes: "987",
  },
  {
    src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
    alt: "Sintel",
    likes: "754",
  },
  {
    src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    alt: "Tears of Steel",
    likes: "987",
  },
  {
    src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4",
    alt: "Volkswagen GTI Review",
    likes: "2.3K",
  },
  {
    src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    alt: "For Bigger Blazes",
    likes: "1.8K",
  },
  {
    src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    alt: "For Bigger Escapes",
    likes: "1.1K",
  },
  {
    src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    alt: "For Bigger Fun",
    likes: "1.5K",
  },
  {
    src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    alt: "For Bigger Joyrides",
    likes: "1.3K",
  },
  {
    src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4",
    alt: "We Are Going On Bullrun",
    likes: "1.0K",
  },
  {
    src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4",
    alt: "Subaru Outback",
    likes: "1.7K",
  },
];

export default function VideoGrid() {
  const videoRefs = useRef([]);

  // Play/pause videos only when in view
  useEffect(() => {
    const observer = new window.IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target;
          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.5 }
    );
    videoRefs.current.forEach((video) => {
      if (video) observer.observe(video);
    });
    return () => {
      videoRefs.current.forEach((video) => {
        if (video) observer.unobserve(video);
      });
      observer.disconnect();
    };
  }, []);

  return (
    <div className="grid grid-cols-3 gap-0.5 p-0 pb-16">
      {videos.map((video, idx) => (
        <div key={idx} className="relative h-40 overflow-hidden group">
          <video
            ref={(el) => (videoRefs.current[idx] = el)}
            src={video.src}
            className="w-full h-full object-cover"
            muted
            playsInline
            preload="metadata"
            poster={`https://source.unsplash.com/400x600/?nature,${idx}`}
          />
          {/* VideoCamera Icon (top right, consistent size/style with DiscoverTab) */}
          <div className="absolute top-2 right-2 z-10">
            <VideoCamera size={18} weight="regular" className="text-white/80" />
          </div>
          {/* Likes Count (bottom left, consistent icon size/style) */}
          <div className="absolute left-2 bottom-2 flex items-center gap-1 text-xs z-10 text-white bg-black/50 px-2 py-0.5 rounded-full">
            <Heart size={14} weight="regular" color="currentColor" />
            {video.likes}
          </div>
        </div>
      ))}
    </div>
  );
}
