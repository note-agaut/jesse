import React, { useState, useRef } from "react";
import {
  DotsThreeVertical,
  Heart,
  ChatCircle,
  ShareFat,
  ArrowBendUpLeft,
  SealCheck,
} from "@phosphor-icons/react";
import bellSound from "../../assets/bell.mp3";

export default function AdCard({ ad }) {
  const [liked, setLiked] = useState(false);
  const [showFloatingHeart, setShowFloatingHeart] = useState(false);
  const bellRef = useRef(null);

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

  return (
    <div className="bg-white overflow-hidden font-sans">
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
            <div className="absolute -bottom-0 -right-0 bg-green-500 border-2 border-[1.5px] border-white rounded-full w-3 h-3 flex items-center justify-center"></div>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-semibold system-base-text system-color">
                Ace Inc.
              </span>
              <SealCheck
                className="text-indigo-500 relative top-[2px]"
                weight="fill"
              />
              <span className="text-xs muted-text relative top-[2px]">2d</span>
            </div>
            <span className="text-xs muted-text font-medium">Sponsored</span>
          </div>
        </div>
        <button className="p-1">
          <DotsThreeVertical className="text-[22px] muted-text" />
        </button>
      </div>

      <div className="w-full">
        <img
          src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop"
          alt="Ad Poster"
          className="w-full h-80 object-cover"
        />
      </div>

      <div className="p-4">
        <p className="system-base-text system-color leading-relaxed">
          Transform your business with our innovative solutions. Join thousands
          of satisfied customers who have revolutionized their workflow and
          achieved unprecedented success.
        </p>
      </div>

      <div className="p-4 pt-0">
        <button className="w-full bg-indigo-500 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-lg ">
          Learn More
        </button>
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
          <button className="flex items-center gap-0.3" type="button">
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
    </div>
  );
}
