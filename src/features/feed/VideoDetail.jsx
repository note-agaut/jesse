import React, { useRef, useState } from "react";
import {
  ArrowLeft,
  MagnifyingGlass,
  PaperPlaneRight,
  Smiley,
  At,
} from "@phosphor-icons/react";
import "./VideosFeed.css";
import useFeedSnapScroll from "./VideosFeedScrollLogic";
import { useNavigationStore } from "../../store/useNavigationStore";
import Reels from "./Reels";
import "./VideoDetail.css";

export default function VideoDetail() {
  const feedContainerRef = useFeedSnapScroll();
  const setPage = useNavigationStore((state) => state.setPage);

  // Add state for input focus
  const [inputFocused, setInputFocused] = useState(false);

  const handleBackClick = () => {
    setPage("discover");
  };

  // Prevent form submission
  const handleCommentSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="font-sans">
      <div className=" fixed top-0 left-0 right-0 z-50 button-container p-4">
        <button className="back-button" onClick={handleBackClick}>
          <ArrowLeft className="back-icon text-2xl" />
        </button>
        <button className="search-button">
          <MagnifyingGlass className="search-icon" />
          <span className="search-text text-sm">
            search for related contents...
          </span>
        </button>
      </div>

      <div
        className="feed-container h-screen w-full overflow-y-scroll snap-y snap-mandatory pt-16 font-sans"
        ref={feedContainerRef}
      >
        <Reels />
      </div>

      {/* Transparent Comment Composer */}
      <div className="fixed bottom-0 left-0 right-0 z-50 p-4 pb-[env(safe-area-inset-bottom,0)] pointer-events-none">
        <form
          className="flex items-center bg-transparent rounded-full px-4 py-2 pointer-events-auto"
          onSubmit={handleCommentSubmit}
        >
          {/* Smiley Icon */}
          <button type="button" className="mr-2 text-white" tabIndex={-1}>
            <Smiley size={22} />
          </button>
          {/* Mention Icon */}
          <button type="button" className="mr-2 text-white" tabIndex={-1}>
            <At size={22} />
          </button>
          <input
            type="text"
            placeholder="Add a comment..."
            className="flex-1 bg-transparent outline-none text-sm text-white placeholder-white/70"
            onFocus={() => setInputFocused(true)}
            onBlur={() => setInputFocused(false)}
          />
          {inputFocused && (
            <button
              type="submit"
              className="ml-2 text-white bg-transparent p-0 rounded-full shadow-none flex items-center justify-center"
              aria-label="Send"
              style={{ minWidth: 0, minHeight: 0, lineHeight: 0 }}
            >
              <PaperPlaneRight size={22} />
            </button>
          )}
        </form>
      </div>
    </div>
  );
}
