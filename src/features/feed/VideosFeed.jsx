import React, { useEffect, useState } from "react";
import "./VideosFeed.css";
import useFeedSnapScroll from "./VideosFeedScrollLogic";
import BottomNav from "../../components/BottomNav";
import Reels from "./Reels";
import MainNav from "../../components/MainNav";
import { useNavigationStore } from "../../store/useNavigationStore";

export default function VideosFeed() {
  const feedContainerRef = useFeedSnapScroll();
  const refreshFeed = useNavigationStore((state) => state.refreshFeed);
  const [reloading, setReloading] = useState(false);
  const [viewportHeight, setViewportHeight] = useState(window.innerHeight);

  // Add viewport height handler
  useEffect(() => {
    const handleResize = () => {
      // Get actual viewport height
      const vh = window.innerHeight;
      setViewportHeight(vh);
      // Set CSS variable for viewport height
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };

    // Initial call
    handleResize();

    // Handle orientation changes and resize
    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", () => {
      setTimeout(handleResize, 100);
    });

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
    };
  }, []);

  // Decide how many reels you want to show, e.g., 3
  const reelsCount = 3;

  return (
    <div className="bg-white overflow-hidden" style={{ height: "100dvh" }}>
      <MainNav
        transparent
        textWhite
        borderWhite
        inactiveTabColor="text-white/70"
      />
      <div
        className="feed-container w-full overflow-y-scroll snap-y snap-mandatory pt-16 font-sans"
        ref={feedContainerRef}
        style={{
          height: `${viewportHeight}px`,
          maxHeight: "100dvh",
        }}
      >
        {[...Array(reelsCount)].map((_, idx) => (
          <Reels key={idx} index={idx} viewportHeight={viewportHeight} />
        ))}
      </div>
      <BottomNav
        transparent
        className="border-t border-white/30 videos-feed-bottom-nav"
        getIconColor={(_, isActive) => (isActive ? "text-white" : "text-white")}
        reloading={reloading}
      />
    </div>
  );
}
