import React, { useState, useRef } from "react";
import {
  DotsThreeVertical,
  CaretLeft,
  CaretRight,
  Heart,
  ChatCircle,
  ShareFat,
  SealCheck,
  ArrowBendUpLeft,
} from "@phosphor-icons/react";
import "./Posts.css";
import bellSound from "../../assets/bell.mp3"; // import bellSound
import { useNavigationStore } from "../../store/useNavigationStore"; // Add this import
import ImagePreview from "../../components/ImagePreview"; // Add this import

export default function PostCard({
  topNavHeight = 0,
  bottomNavHeight = 0,
  onPostClick,
  hideMutualComments = false, // <-- add this prop
}) {
  const carouselId = "carousel1";
  const [currentSlide, setCurrentSlide] = useState(0);
  const [liked, setLiked] = useState(false);
  const [showFloatingHeart, setShowFloatingHeart] = useState(false); // floating heart state
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewIndex, setPreviewIndex] = useState(0);
  const bellRef = useRef(null); // bell audio ref
  const setPage = useNavigationStore((state) => state.setPage); // Add this line

  const slides = [
    {
      src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop",
      alt: "Beach sunset",
    },
    {
      src: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=400&h=400&fit=crop",
      alt: "Mountain landscape",
    },
    {
      src: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400&h=400&fit=crop",
      alt: "Ocean waves",
    },
  ];
  const totalSlides = slides.length;

  // Carousel navigation handlers
  const handlePrev = () => {
    if (currentSlide > 0) setCurrentSlide(currentSlide - 1);
  };

  const handleNext = () => {
    if (currentSlide < totalSlides - 1) setCurrentSlide(currentSlide + 1);
  };

  const handleDot = (idx) => {
    setCurrentSlide(idx);
  };

  // Like button handler with floating heart and bell sound
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

  // Handler to open Comments SPA
  const handleOpenComments = () => {
    setPage("PostComments");
  };

  return (
    <div
      className="bg-white font-sans"
      style={{
        marginTop: topNavHeight,
        marginBottom: bottomNavHeight,
      }}
    >
      {/* Audio element for bell sound */}
      <audio ref={bellRef} src={bellSound} preload="auto" />
      <div className="flex space-x-3 p-4">
        {/* Avatar container */}
        <div className="relative">
          <img
            src="https://picsum.photos/200/300"
            alt="Emma Johnson"
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="absolute -bottom-0 -right-0 bg-green-500 border-2 border-white rounded-full w-3 h-3"></div>
        </div>

        {/* Username, badge and dots container */}
        <div className="flex items-center justify-between flex-1">
          <div className="flex items-center space-x-2">
            <span className="font-semibold system-color system-base-text">
              emmajohnson
            </span>
            <SealCheck
              className="font-semibold text-[16px] text-indigo-500"
              weight="fill"
            />
             <button className="system-base-text font-medium text-indigo-500 relative">
                Follow
              </button>
          </div>
          <button className="p-0">
            <DotsThreeVertical className="text-2xl muted-text" />
          </button>
        </div>
      </div>

      <div className="carousel-container aspect-square overflow-hidden">
        <div
          className="carousel-track flex transition-transform duration-300"
          id={carouselId}
          style={{
            width: `${100 * totalSlides}%`,
            transform: `translateX(-${currentSlide * (100 / totalSlides)}%)`,
          }}
        >
          {slides.map((slide, idx) => (
            <div
              className="carousel-slide w-full flex-shrink-0"
              key={idx}
              style={{ width: `${100 / totalSlides}%` }}
            >
              <img
                src={slide.src}
                alt={slide.alt}
                className="w-full h-full object-cover cursor-pointer"
                onClick={() => {
                  setPreviewIndex(idx);
                  setPreviewOpen(true);
                }}
              />
            </div>
          ))}
        </div>

        <button
          className={`carousel-nav prev absolute left-2 top-1/2 -translate-y-1/2 ${
            currentSlide === 0 ? "hidden" : ""
          }`}
          onClick={handlePrev}
          type="button"
        >
          <CaretLeft className="text-[1.25rem] text-white" />
        </button>
        <button
          className={`carousel-nav next absolute right-2 top-1/2 -translate-y-1/2 ${
            currentSlide === totalSlides - 1 ? "hidden" : ""
          }`}
          onClick={handleNext}
          type="button"
        >
          <CaretRight className="text-2xl text-white" />
        </button>

        <div className="carousel-dots absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-2">
          {slides.map((_, idx) => (
            <span
              key={idx}
              className={`dot w-2 h-2 rounded-full border border-gray-400 cursor-pointer ${
                currentSlide === idx ? "bg-indigo-500" : "bg-white"
              } ${currentSlide === idx ? "active" : ""}`}
              onClick={() => handleDot(idx)}
            ></span>
          ))}
        </div>
      </div>

      <div className=" muted-text">
        <div className="flex items-center justify-between p-4">
          <button
            className="like-btn flex items-center gap-0.3 relative"
            onClick={handleLike}
            type="button"
          >
            <Heart
              className={`text-2xl transition-colors ${
                liked ? "fill-indigo-600 text-indigo-500" : ""
              }`}
              weight={liked ? "fill" : "regular"}
            />
            {/* Floating heart animation */}
            {showFloatingHeart && (
              <span className="floating-heart absolute left-1/2 top-1/2 pointer-events-none">
                <Heart
                  className="text-indigo-500 text-2xl animate-float-up"
                  weight="fill"
                />
              </span>
            )}
            <span className="text-sm font-medium muted-text ml-1">1.2K</span>
          </button>
          <button
            className="flex items-center gap-0.3"
            type="button"
            onClick={onPostClick} // Add this prop
          >
            <ChatCircle className="text-2xl" />
            <span className="text-sm font-medium ml-1">300</span>
          </button>
          <button className="flex items-center gap-0.3" type="button">
            <ArrowBendUpLeft className="text-2xl" />
            <span className="text-sm font-medium ml-1">300</span>
          </button>
          <button className="flex items-center gap-0.3" type="button">
            <ShareFat className="text-2xl" />
            <span className="text-sm font-medium ml-1">10</span>
          </button>
        </div>
      </div>

      <div className="px-4 pb-4">
        <div className="flex flex-col space-y-1">
          <span className="text-xs muted-text">2w ago</span>
          <span className="text-sm system-color leading-relaxed">
            Had a great moment with
            <span className="text-indigo-500"> @davis_lomba</span>
          </span>
          
        </div>
      </div>

      {/* Always show hashtag and mention */}
      <div className="px-4 space-y-1 mb-4 flex flex-col">
        <span className="text-sm text-indigo-500">#inspiration</span>
        <span className="text-sm text-indigo-500">
          @jim_gyms <span className="muted-text">and 5 others</span>
        </span>
        {/* Only show avatars and "and 2 others commented" if NOT hidden */}
        {!hideMutualComments && (
          <div className="text-sm system-color" style={{ whiteSpace: "nowrap" }}>
            <span style={{ display: "inline-block" }}>
              <img
                src="https://picsum.photos/200/100"
                alt="User 1"
                className="w-6 h-6 rounded-full border-2 border-white bg-gray-200"
                style={{
                  display: "inline-block",
                  verticalAlign: "middle",
                  marginRight: "-8px",
                }}
              />
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face"
                alt="User 2"
                className="w-6 h-6 rounded-full border-2 border-white bg-gray-200"
                style={{
                  display: "inline-block",
                  verticalAlign: "middle",
                  marginRight: "-8px",
                }}
              />
              <img
                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face"
                alt="User 3"
                className="w-6 h-6 rounded-full border-2 border-white bg-gray-200"
                style={{
                  display: "inline-block",
                  verticalAlign: "middle",
                  marginRight: "4px",
                }}
              />
            </span>
            <span
              className="muted-text text-sm"
              style={{
                display: "inline-block",
                verticalAlign: "middle",
              }}
            >
              and 2 others commented
            </span>
          </div>
        )}
      </div>

      {previewOpen && (
        <ImagePreview
          images={slides}
          initialIndex={previewIndex}
          onClose={() => setPreviewOpen(false)}
        />
      )}
    </div>
  );
}
