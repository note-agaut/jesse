import React, { useState, useRef } from "react";
import "./RightBar.css";
import {
  Plus,
  Heart,
  ChatCircle,
  PaperPlaneTilt,
  Check,
  DotsThreeVertical,
} from "@phosphor-icons/react";
import bellSound from "../../assets/bell.mp3";
import { useNavigationStore } from "../../store/useNavigationStore"; // import zustand store

export default function RightBar() {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(1200);
  const [isFollowing, setIsFollowing] = useState(false);
  const [shareCount, setShareCount] = useState(24);
  const [showFloatingHeart, setShowFloatingHeart] = useState(false);
  const bellRef = useRef(null);

  // Get navigation store actions
  const setPage = useNavigationStore((state) => state.setPage);
  const setCommentSliderProps = useNavigationStore(
    (state) => state.setCommentSliderProps
  );

  function formatCount(count) {
    if (count >= 1000000) {
      return (count / 1000000).toFixed(1) + "M";
    } else if (count >= 1000) {
      return (count / 1000).toFixed(1) + "K";
    }
    return count.toString();
  }

  // Handler for opening comments as SPA page
  function handleOpenComments() {
    setCommentSliderProps({ videoSrc: "", initialTime: 0 }); // set videoSrc/initialTime as needed
    setPage("comments");
  }

  return (
    <div className="absolute right-4 bottom-[6.5rem] z-50 flex flex-col items-center space-y-6 font-sans">
      {/* Audio element for bell sound */}
      <audio ref={bellRef} src={bellSound} preload="auto" />
      {/* More button */}
      <div className="reaction-container flex flex-col items-center">
        <button className="reaction-btn ">
          <DotsThreeVertical className="text-white/75 text-3xl" />
        </button>
      </div>
      {/* User Avatar with Follow Button */}
      <div className="relative flex flex-col items-center">
        <div className="relative">
          <img
            src="https://picsum.photos/200/300"
            alt="User avatar"
            className="w-[50px] h-[50px] rounded-full border-2 border-white"
          />
          <button
            className="follow-btn absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300"
            style={{
              background: isFollowing
                ? "linear-gradient(135deg, #10b981 0%, #059669 100%)"
                : "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
              boxShadow: isFollowing
                ? "0 4px 15px rgba(16, 185, 129, 0.4)"
                : "0 4px 15px rgba(79, 70, 229, 0.4)",
            }}
            onClick={() => setIsFollowing((f) => !f)}
          >
            {isFollowing ? (
              <Check className="text-white text-sm" weight="regular" />
            ) : (
              <Plus className="text-white text-sm" weight="regular" />
            )}
          </button>
        </div>
      </div>

      {/* Like Button */}
      <div className="reaction-container relative flex flex-col items-center">
        <button
          className="reaction-btn like-btn mb-1 relative"
          data-liked={isLiked}
          onClick={() => {
            if (!isLiked) {
              setIsLiked(true);
              setLikeCount((count) => count + 1);
              setShowFloatingHeart(true);
              if (bellRef.current) {
                bellRef.current.currentTime = 0;
                bellRef.current.play();
              }
              setTimeout(() => setShowFloatingHeart(false), 700);
            } else {
              setIsLiked(false);
              setLikeCount((count) => count - 1);
            }
          }}
        >
          <Heart
            className={
              isLiked
                ? "text-indigo-600/75 text-3xl like-animation"
                : " text-white/65 text-3xl"
            }
            weight="fill" // Always use fill
          />
          {showFloatingHeart && (
            <span className="floating-heart absolute left-1/2 top-1/2 pointer-events-none">
              <Heart
                className="text-indigo-600/65 text-3xl animate-float-up"
                weight="fill"
              />
            </span>
          )}
        </button>
        <span className="count-text text-white text-xs font-semibold like-count">
          {formatCount(likeCount)}
        </span>
      </div>

      {/* Comment Button */}
      <div className="reaction-container flex flex-col items-center">
        <button
          className="reaction-btn comment-btn mb-1"
          onClick={handleOpenComments}
        >
          <ChatCircle className="text-white/65 text-3xl" weight="fill" />
        </button>
        <span className="count-text text-white text-xs font-semibold comment-count">
          89
        </span>
      </div>

      {/* Share Button */}
      <div className="reaction-container flex flex-col items-center">
        <button
          className="reaction-btn share-btn mb-1"
          onClick={() => setShareCount((c) => c + 1)}
        >
          <PaperPlaneTilt className="text-white/65 text-3xl" weight="fill" />
        </button>
        <span className="count-text text-white text-xs font-semibold share-count">
          {formatCount(shareCount)}
        </span>
      </div>
      {/* Spinning Album Icon */}
      <div className="reaction-container flex flex-col items-center">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center animate-spin-slow">
          <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center">
            <svg
              className="w-5 h-5 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
