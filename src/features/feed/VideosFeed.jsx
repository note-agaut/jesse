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

  useEffect(() => {
    setReloading(true);
    if (feedContainerRef.current) {
      feedContainerRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
    const timeout = setTimeout(() => setReloading(false), 1000);
    return () => clearTimeout(timeout);
  }, [refreshFeed]);

  // Decide how many reels you want to show, e.g., 3
  const reelsCount = 3;

  return (
    <div className="bg-white overflow-hidden">
      <MainNav
        transparent
        textWhite
        borderWhite
        inactiveTabColor="text-white/70"
      />
      <div
        className="feed-container h-screen w-full overflow-y-scroll snap-y snap-mandatory pt-16 font-sans"
        ref={feedContainerRef}
      >
        {[...Array(reelsCount)].map((_, idx) => (
          <Reels key={idx} index={idx} />
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
