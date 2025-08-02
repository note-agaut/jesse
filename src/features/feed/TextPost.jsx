import React, { useState, useRef } from "react";
import {
  DotsThreeVertical,
  Heart,
  ChatCircle,
  ArrowBendUpLeft,
  SealCheck,
  ShareFat,
} from "@phosphor-icons/react";
import bellSound from "../../assets/bell.mp3";
import { useNavigationStore } from "../../store/useNavigationStore"; // Add this import

export default function TextPost(props) {
  const [liked, setLiked] = useState(false);
  const [showFloatingHeart, setShowFloatingHeart] = useState(false);
  const bellRef = useRef(null);

  const setSelectedPost = useNavigationStore((state) => state.setSelectedPost); // Add this
  const setPage = useNavigationStore((state) => state.setPage); // Add this

  const handleLike = () => {
    if (!liked) {
      setLiked(true);
      setShowFloatingHeart(true);
      if (bellRef.current) {
        bellRef.current.currentTime = 0;
        bellRef.current.play();
      }
      setTimeout(() => setShowFloatingHeart(false), 700);
    } else {
      setLiked(false);
    }
  };

  // Add this handler
  const handleOpenComments = () => {
    setSelectedPost({ type: "text", data: props });
    setPage("PostComments");
  };

  return (
    <div className="bg-white font-sans">
      {/* Audio element for bell sound */}
      <audio ref={bellRef} src={bellSound} preload="auto" />
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
              alt="Alex Williams"
              className="w-10 h-10 rounded-full object-cover"
            />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-semibold system-base-text system-color">
                alexwilliams
              </span>
              <SealCheck
                className="text-indigo-500  relative top-[2px]"
                weight="fill"
              />
              <button className="system-base-text font-medium text-indigo-500 relative top-[2px]">
                Follow
              </button>
            </div>
            <span className="text-xs muted-text">3h</span>
          </div>
        </div>
        <button className="p-1">
          <DotsThreeVertical className="text-[1.25rem] muted-text" />
        </button>
      </div>

      <div className="px-4 pb-2">
        <p className="system-base-text system-color leading-relaxed">
          "The glory of championship is takership." - Iniya Ekenebe
        </p>
      </div>

      <div className=" muted-text">
        <div className="flex items-center justify-between p-4">
          <button
            className="like-btn flex items-center gap-0.3 relative"
            onClick={handleLike}
            type="button"
          >
            <Heart
              className={`text-[1.25rem] transition-colors ${
                liked ? "fill-indigo-600 text-indigo-500" : ""
              }`}
              weight={liked ? "fill" : "regular"}
            />
            {/* Floating heart animation */}
            {showFloatingHeart && (
              <span className="floating-heart absolute left-1/2 top-1/2 pointer-events-none">
                <Heart
                  className="text-indigo-500 text-[1.25rem] animate-float-up"
                  weight="fill"
                />
              </span>
            )}
            <span className="text-sm font-medium muted-text ml-1">1.2K</span>
          </button>
          <button
            className="flex items-center gap-0.3"
            type="button"
            onClick={handleOpenComments} // <-- Add this
          >
            <ChatCircle className="text-[1.25rem]" />
            <span className="text-sm font-medium ml-1">300</span>
          </button>
          <button className="flex items-center gap-0.3" type="button">
            <ArrowBendUpLeft className="text-[1.25rem]" />
            <span className="text-sm font-medium ml-1">300</span>
          </button>
          <button className="flex items-center gap-0.3" type="button">
            <ShareFat className="text-[1.25rem]" />
            <span className="text-sm font-medium ml-1">10</span>
          </button>
        </div>
      </div>

      <div className="px-4 mb-[8px] flex flex-col">
        <span className="text-sm text-indigo-500">#inspiration</span>
        <span className="text-sm text-indigo-500">
          @jim_gyms <span className="muted-text">and 5 others</span>
        </span>
      </div>

      <div className="px-4 pb-4">
        <div className="flex items-center space-x-2 text-sm system-color">
          <div className="flex -space-x-2">
            <img
              src="https://picsum.photos/200/100"
              alt="User 1"
              className="w-6 h-6 rounded-full border-2 border-white bg-gray-200"
            />
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face"
              alt="User 2"
              className="w-6 h-6 rounded-full border-2 border-white bg-gray-200"
            />
            <img
              src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face"
              alt="User 3"
              className="w-6 h-6 rounded-full border-2 border-white bg-gray-200"
            />
          </div>
          <span className="muted-text text-xs">
            and 2 others commented on this post
          </span>
        </div>
      </div>
    </div>
  );
}
