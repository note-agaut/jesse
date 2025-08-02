import React, { useRef, useEffect } from "react";
import "./CommentSlider.css";
import {
  FunnelSimple,
  X,
  DotsThreeVertical,
  Heart,
  ArrowBendUpLeft,
  PaperPlaneRight, // <-- Add this import
  Smiley,
} from "@phosphor-icons/react";

export default function CommentSlider({
  open,
  onClose,
  videoSrc,
  initialTime = 0,
}) {
  const sliderRef = useRef(null);
  const videoRef = useRef(null);
  const startY = useRef(0);
  const isDragging = useRef(false);

  // Slide up/down effect
  useEffect(() => {
    if (sliderRef.current) {
      if (open) {
        sliderRef.current.classList.remove("translate-y-full");
        videoRef.current && videoRef.current.play();
      } else {
        sliderRef.current.classList.add("translate-y-full");
        videoRef.current && videoRef.current.pause();
      }
    }
  }, [open]);

  useEffect(() => {
    if (open && videoRef.current) {
      videoRef.current.currentTime = initialTime;
      videoRef.current.play();
    }
  }, [open, initialTime]);

  // Touch events for swipe down to close
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const handleTouchStart = (e) => {
      startY.current = e.touches[0].clientY;
      isDragging.current = true;
    };
    const handleTouchMove = (e) => {
      if (!isDragging.current) return;
      const currentY = e.touches[0].clientY;
      const diff = currentY - startY.current;
      if (diff > 30) {
        onClose && onClose();
        isDragging.current = false;
      }
    };
    const handleTouchEnd = () => {
      isDragging.current = false;
    };

    slider.addEventListener("touchstart", handleTouchStart);
    slider.addEventListener("touchmove", handleTouchMove);
    slider.addEventListener("touchend", handleTouchEnd);

    return () => {
      slider.removeEventListener("touchstart", handleTouchStart);
      slider.removeEventListener("touchmove", handleTouchMove);
      slider.removeEventListener("touchend", handleTouchEnd);
    };
  }, [onClose]);

  // Tap to pause/play video
  const handleVideoClick = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  };

  return (
    <div
      ref={sliderRef}
      id="commentSlider"
      className="fixed bottom-0 left-0 right-0 h-screen z-50 translate-y-full transition-transform duration-300 ease-in-out flex flex-col overflow-hidden bg-black/80 backdrop-blur-sm font-sans"
      style={{ touchAction: "pan-y" }}
    >
      {/* Video Thumbnail */}
      <div className="w-full flex justify-center">
        <div className="w-[130px] h-[200px] overflow-hidden">
          <video
            ref={videoRef}
            id="previewVideo"
            src={videoSrc}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover cursor-pointer"
            onClick={handleVideoClick}
          >
            Your browser does not support the video tag.
          </video>
        </div>
      </div>

      {/* Comment Drawer */}
      <div className="flex flex-col flex-1 bg-white rounded-t-xl border-t border-gray-200 shadow-md relative z-10 -mt-4 font-sans">
        {/* Drawer Handle */}
        <div className="flex justify-center py-2">
          <div className="w-10 h-1.5 bg-gray-300 rounded-full"></div>
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200 dark:border-[#27272a]">
          <div className="flex items-center space-x-2 system-section-heading">
            <span>Comments</span>
            <span className="text-xs muted-text">(282)</span>
          </div>
          <div className="flex space-x-4 muted-text system-base-text">
            <button>
              <FunnelSimple />
            </button>
            <button onClick={onClose}>
              <X />
            </button>
          </div>
        </div>

        {/* Comments Section */}
        <div className="px-4 py-3 space-y-6 overflow-y-auto max-h-[60vh] flex-1">
          {/* Comment 1 */}
          <div className="flex space-x-3">
            <img
              src="https://picsum.photos/200"
              alt="avatar"
              className="w-9 h-9 rounded-full"
            />
            <div className="flex-1">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="system-username">emma_johnson</span>
                  <span className="text-xs muted-text ">2h ago</span>
                </div>
                <button className="muted-text text-[18px]">
                  <DotsThreeVertical />
                </button>
              </div>
              <p className="system-base-text  system-color mt-1">
                This was such a powerful reel 🔥 Love the energy!
              </p>
              <div className="flex items-center space-x-4   mt-2">
                <div className="flex items-center space-x-1 ">
                  <Heart className="text-[18px] muted-text" />
                  <span className="muted-text text-xs font-medium"> 128</span>
                </div>
                <div className="flex items-center space-x-1">
                  <ArrowBendUpLeft className="text-[18px] muted-text" />
                  <span className="muted-text text-xs font-medium ">3</span>
                </div>
              </div>
            </div>
          </div>
          {/* Add more comments */}
        </div>

        {/* Comment Composer fixed at bottom */}
        <form className="flex items-center gap-2 px-4 py-3 border-t border-gray-200 dark:border-[#27272a] bg-white dark:bg-[#232329] sticky bottom-0 z-20">
          <img
            src="https://i.pravatar.cc/40"
            alt="Your avatar"
            className="w-8 h-8 rounded-full object-cover"
          />
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Add a comment..."
              className="w-full bg-gray-100 dark:bg-[#18181b] rounded-full px-4 py-2 text-sm outline-none pr-9"
            />
            <span className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer">
              <Smiley size={22} />
            </span>
          </div>
          <button
            type="submit"
            className="text-indigo-600 font-semibold  rounded-full transition flex items-center justify-center" // removed hover:bg-indigo-50 and dark:hover:bg-indigo-900
            aria-label="Send"
          >
            <PaperPlaneRight size={22} weight="fill" />
          </button>
        </form>
      </div>
    </div>
  );
}
