import React, { useState, useRef, useLayoutEffect, useEffect } from "react";
import {
  SealCheck,
  UserPlus,
  GridFour,
  VideoCamera,
  At,
  Gear,
} from "@phosphor-icons/react";
import TopNav from "./TopNav";
import BottomNav from "./BottomNav";
import VideoGrid from "./UserProfile/VideoGrid";
import PostGrid from "./UserProfile/PostGrid";
import { useNavigationStore } from "../store/useNavigationStore";
import "./UserProfile.css";
import EmptyState from "./EmptyState"; // Add this import

export default function UserProfile({
  avatar = "https://picsum.photos/200",
  username = "emma_johnson",
  name = "Emma Johnson",
}) {
  const [activeTab, setActiveTab] = useState(0);
  const setPage = useNavigationStore((state) => state.setPage);

  // Ref and state for TopNav height
  const topNavRef = useRef(null);
  const [topNavHeight, setTopNavHeight] = useState(0);

  // State for showing/hiding border bottom
  const [showBorder, setShowBorder] = useState(false);

  useLayoutEffect(() => {
    if (topNavRef.current) {
      setTopNavHeight(topNavRef.current.offsetHeight);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      // Show border if not at the very top
      if (window.scrollY > 4) {
        setShowBorder(true);
      } else {
        setShowBorder(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Back button navigates to VideosFeed (home)
  const handleBack = () => setPage("home");

  const handleSettings = () => {
    setPage("settings");
  };

  return (
    <div className="bg-white min-h-screen font-sans">
      <TopNav
        ref={topNavRef}
        title={"Profile"}
        rightIcon={<Gear className="system-color text-2xl" />}
        onBack={null}
        onRightClick={handleSettings}
        borderBottom={false} // Always hide border
      />
      <div
        className="max-w-md mx-auto text-center p-4 pt-0 mt-0"
        style={{ marginTop: topNavHeight }}
      >
        {/* Avatar */}
        <div className="flex justify-center mb-4">
          <img
            src={avatar}
            alt={username}
            className="w-24 h-24 rounded-full border object-cover bg-gray-100 border-gray-200"
          />
        </div>

        {/* Profile Identity Block (React) */}
        <div className="flex flex-col items-center space-y-1">
          {/* Name + Verified */}
          <div className="flex items-center space-x-1 text-xl system-color font-semibold">
            <span>{name}</span>
            <SealCheck
              className="text-indigo-500 text-lg"
              weight="fill"
              style={{ marginTop: "2px" }} // aligns icon vertically with text
            />
          </div>

          {/* Username */}
          <p className="text-sm muted-text">@{username}</p>

          {/* Role Tag */}
          <div>
            <span className="system-search-bar muted-text px-3 py-1 rounded-full text-xs font-medium">
              Fitness & Health Coach
            </span>
          </div>
        </div>
        {/* Followers | Following */}
        <div className="flex justify-center gap-8 my-4 ">
          <div>
            <div className="system-section-heading">250K</div>
            <div className="system-base-text muted-text">Followers</div>
          </div>
          <div>
            <div className="system-section-heading">180</div>
            <div className="system-base-text muted-text">Following</div>
          </div>
        </div>
        {/* 3 Buttons: Following, Message, Add Friend */}
        <div className="flex justify-center gap-3 mb-4">
          <button className="flex-1 px-4 py-2 system-bordered system-rounded  font-medium system-color system-base-text bg-transparent min-w-[88px]">
            Following
          </button>
          <button className="flex-1 px-4 py-2 system-rounded system-base-text font-medium text-white bg-indigo-500 border-none min-w-[88px]">
            Message
          </button>
          <button
            className="w-11 h-11 system-bordered system-rounded flex items-center justify-center system-color bg-transparent"
            aria-label="Add Friend"
          >
            <UserPlus size={22} />
          </button>
        </div>
        {/* Bio */}
        <p className="system-color system-base-text px-4 mb-4 break-words">
          Actress in film, TV, and theatre. Lover of comedy and storytelling.
        </p>
      </div>

      {/* Full-width Icon Tabs with Pseudo Underline */}
      <div className="grid grid-cols-3 text-center  system-border bg-white">
        <button
          className={`tab-item py-3 w-full h-11 flex items-center justify-center ${
            activeTab === 0
              ? "system-base-text system-border-b-2"
              : "system-base-text muted-text"
          }`}
          onClick={() => setActiveTab(0)}
          aria-label="Posts"
          aria-selected={activeTab === 0}
        >
          Posts
        </button>
        <button
          className={`tab-item py-3 w-full h-11 flex items-center justify-center ${
            activeTab === 1
              ? "system-base-text system-border-b-2"
              : "system-base-text muted-text"
          }`}
          onClick={() => setActiveTab(1)}
          aria-label="Videos"
          aria-selected={activeTab === 1}
        >
          Videos
        </button>
        <button
          className={`tab-item py-3 w-full h-11 flex items-center justify-center ${
            activeTab === 2
              ? "system-base-text system-border-b-2"
              : "system-base-text muted-text"
          }`}
          onClick={() => setActiveTab(2)}
          aria-label="Mentions"
          aria-selected={activeTab === 2}
        >
          Mentions
        </button>
      </div>

      {/* Tab Content */}
      <div className={activeTab === 2 ? "mb-24" : ""}>
        {activeTab === 0 && <PostGrid />}
        {activeTab === 1 && <VideoGrid />}
        {activeTab === 2 && (
          <EmptyState
            title="Nothing here yet"
            message="You don’t have any mentions at the moment."
          />
        )}
      </div>
      <BottomNav />
    </div>
  );
}
