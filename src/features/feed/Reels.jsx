import React, { useRef, useState, useEffect, useCallback } from "react";
import RightBar from "../reelsControl/RightBar";
import BottomSection from "../reelsControl/BottomSection";
import { Play } from "@phosphor-icons/react";
import { AnimatePresence, motion } from "framer-motion";

const dummyMedia = [
  {
    mediaType: "video",
    mediaSrc: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    mediaType: "image",
    mediaSrc:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
  },
  {
    mediaType: "video",
    mediaSrc: "https://www.w3schools.com/html/movie.mp4",
  },
];

export default function Reels({
  mediaType,
  mediaSrc,
  index = 0,
  viewportHeight,
}) {
  const media =
    mediaType && mediaSrc
      ? { mediaType, mediaSrc }
      : dummyMedia[index % dummyMedia.length];

  const videoRef = useRef(null);
  const hideTimeout = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [showPlayButton, setShowPlayButton] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragTime, setDragTime] = useState(null);
  const [showProgressBar, setShowProgressBar] = useState(false);
  const progressBarTimeout = useRef(null);

  // Helper to show button and auto-hide after delay
  const showButtonTemporarily = () => {
    setShowPlayButton(true);
    if (hideTimeout.current) clearTimeout(hideTimeout.current);
    hideTimeout.current = setTimeout(() => setShowPlayButton(false), 3000);
  };

  // Helper to show progress bar and auto-hide after delay
  const showProgressBarTemporarily = () => {
    setShowProgressBar(true);
    if (progressBarTimeout.current) clearTimeout(progressBarTimeout.current);
    // Only set timeout if not dragging
    progressBarTimeout.current = setTimeout(() => {
      if (!isDragging) setShowProgressBar(false);
    }, 3000);
  };

  // Handle play/pause toggle
  const handlePlayPause = (e) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
      setShowPlayButton(true); // Show button when paused
      if (hideTimeout.current) clearTimeout(hideTimeout.current);
      hideTimeout.current = setTimeout(() => setShowPlayButton(false), 2000);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
      setShowPlayButton(false); // Hide button when playing
    }
  };

  // Show/hide play button and progress bar on video area click/touch
  const handleVideoAreaClick = (e) => {
    // Prevent default touch behavior
    e.preventDefault();

    // Toggle both play button and progress bar immediately
    if (showPlayButton || showProgressBar) {
      setShowPlayButton(false);
      setShowProgressBar(false);
      if (hideTimeout.current) clearTimeout(hideTimeout.current);
      if (progressBarTimeout.current) clearTimeout(progressBarTimeout.current);
    } else {
      setShowPlayButton(true);
      setShowProgressBar(true);
      // Set timeouts to auto-hide
      if (hideTimeout.current) clearTimeout(hideTimeout.current);
      if (progressBarTimeout.current) clearTimeout(progressBarTimeout.current);

      hideTimeout.current = setTimeout(() => setShowPlayButton(false), 3000);
      progressBarTimeout.current = setTimeout(() => {
        if (!isDragging) setShowProgressBar(false);
      }, 3000);
    }
  };

  // Hide progress bar when video starts playing, but not if dragging
  useEffect(() => {
    if (isPlaying && !isDragging) setShowProgressBar(false);
  }, [isPlaying, isDragging]);

  // While dragging, always show progress bar
  useEffect(() => {
    if (isDragging) setShowProgressBar(true);
  }, [isDragging]);

  // Hide button when video starts playing
  useEffect(() => {
    if (isPlaying) setShowPlayButton(false);
  }, [isPlaying]);

  // Helper to get progress from mouse/touch event
  const getProgressFromEvent = (e) => {
    const bar = document.getElementById("progress-bar");
    if (!bar) return 0;
    const rect = bar.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    let x = clientX - rect.left;
    x = Math.max(0, Math.min(x, rect.width));
    return x / rect.width;
  };

  // Seek video and update progress
  const seekTo = (newProgress) => {
    setProgress(newProgress);
    if (videoRef.current && videoRef.current.duration) {
      videoRef.current.currentTime = newProgress * videoRef.current.duration;
    }
  };

  // Mouse/touch handlers
  const handleDragStart = (e) => {
    e.preventDefault(); // Prevent default touch behavior
    e.stopPropagation();
    setIsDragging(true);
    if (progressBarTimeout.current) clearTimeout(progressBarTimeout.current);
    const newProgress = getProgressFromEvent(e);
    seekTo(newProgress);
    // Disable scroll while dragging
    document.body.style.overflow = "hidden";
  };

  const handleDragMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const newProgress = getProgressFromEvent(e);
    seekTo(newProgress);
    if (videoRef.current && videoRef.current.duration) {
      setDragTime(newProgress * videoRef.current.duration);
    }
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    setDragTime(null);
    // Re-enable scroll
    document.body.style.overflow = "";
    if (progressBarTimeout.current) clearTimeout(progressBarTimeout.current);
    progressBarTimeout.current = setTimeout(() => {
      setShowProgressBar(false);
    }, 3000);
  };

  // Attach/remove global listeners for drag
  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleDragMove);
      window.addEventListener("touchmove", handleDragMove);
      window.addEventListener("mouseup", handleDragEnd);
      window.addEventListener("touchend", handleDragEnd);
    } else {
      window.removeEventListener("mousemove", handleDragMove);
      window.removeEventListener("touchmove", handleDragMove);
      window.removeEventListener("mouseup", handleDragEnd);
      window.removeEventListener("touchend", handleDragEnd);
    }
    return () => {
      window.removeEventListener("mousemove", handleDragMove);
      window.removeEventListener("touchmove", handleDragMove);
      window.removeEventListener("mouseup", handleDragEnd);
      window.removeEventListener("touchend", handleDragEnd);
    };
  }, [isDragging]);

  // Prevent progress update while dragging
  const handleTimeUpdate = useCallback(() => {
    if (videoRef.current && !isDragging) {
      const { currentTime, duration } = videoRef.current;
      setProgress(duration ? currentTime / duration : 0);
    }
  }, [isDragging]);

  // Reset progress when video changes
  useEffect(() => {
    setProgress(0);
  }, [media.mediaSrc]);

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (hideTimeout.current) clearTimeout(hideTimeout.current);
      if (progressBarTimeout.current) clearTimeout(progressBarTimeout.current);
    };
  }, []);

  return (
    <div
      className="feed-item relative w-full bg-gray-900 flex items-center justify-center"
      onClick={handleVideoAreaClick}
      onTouchEnd={handleVideoAreaClick} // Change from onTouchStart to onTouchEnd
      style={{
        cursor: "pointer",
        height: `${viewportHeight}px`,
        maxHeight: "100dvh",
      }}
    >
      {media.mediaType === "video" ? (
        <>
          <video
            ref={videoRef}
            src={media.mediaSrc}
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
            autoPlay
            loop
            muted
            onTimeUpdate={handleTimeUpdate}
          />
          {/* Play button centered, only visible when showPlayButton is true */}
          {showPlayButton && (
            <button
              type="button"
              className="absolute top-[50%] left-[50%] transform -translate-x-[50%] -translate-y-[50%] pointer-events-auto z-10 flex items-center justify-center opacity-0 scale-95 transition-all duration-300 ease-in-out play-button"
              style={{
                background: "none",
                border: "none",
                opacity: showPlayButton ? 1 : 0,
                transform: `translate(-50%, -50%) scale(${
                  showPlayButton ? 1 : 0.8
                })`,
              }}
              onClick={handlePlayPause}
              tabIndex={0}
              aria-label={isPlaying ? "Pause video" : "Play video"}
            >
              <Play className="text-white/70 text-6xl" weight="fill" />
            </button>
          )}
        </>
      ) : (
        <img
          src={media.mediaSrc}
          alt="Media"
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}
      <RightBar />
      <BottomSection />
      {/* Progress Bar */}
      {media.mediaType === "video" && showProgressBar && (
        <div className="absolute left-0 right-0 bottom-[4rem] w-full px-0 pb-2 z-20">
          <div
            id="progress-bar"
            className="w-[100%] h-[4px] overflow-visible cursor-pointer"
            style={{
              background: "rgba(255,255,255,0.6)",
              borderRadius: "9999px",
              position: "relative",
            }}
            onMouseDown={handleDragStart}
            onTouchStart={handleDragStart}
          >
            <div
              className="h-full bg-indigo-500 transition-all duration-200"
              style={{
                width: `${progress * 100}%`,
                position: "absolute",
                left: 0,
                top: 0,
                pointerEvents: "none",
              }}
            >
              {/* Handle Circle */}
              <div
                className="absolute -right-2 top-1/2 w-4 h-4 bg-indigo-500 rounded-full transform -translate-y-1/2 shadow-lg border-2 border-indigo-500 cursor-pointer"
                style={{
                  touchAction: "none",
                  zIndex: 2,
                  border: "2px solid rgb(99 102 241)",
                }}
                onMouseDown={handleDragStart}
                onTouchStart={handleDragStart}
              >
                {isDragging && dragTime !== null && (
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-black text-white text-xs rounded shadow">
                    {new Date(dragTime * 1000).toISOString().substr(14, 5)}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Example usage for demo/testing
// <Reels /> // Shows first dummy video
// <Reels mediaType="image" mediaSrc="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80" /> // Shows specific image
