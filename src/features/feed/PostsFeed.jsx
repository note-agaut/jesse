import React, { useRef, useLayoutEffect, useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import BottomNav from "../../components/BottomNav";
import PostCard from "./Posts";
import { useNavigationStore } from "../../store/useNavigationStore";
import TextPost from "./TextPost";
import AdCard from "./AdCard";
import MainNav from "../../components/MainNav";
import "./PostsFeed.css";

export default function PostsFeed() {
  const setSelectedPost = useNavigationStore((state) => state.setSelectedPost);
  const setPage = useNavigationStore((state) => state.setPage);
  const page = useNavigationStore((state) => state.page);
  const refreshFeed = useNavigationStore((state) => state.refreshFeed);
  const [topNavHeight, setTopNavHeight] = useState(0);
  const [reloading, setReloading] = useState(false);
  const mainNavRef = useRef(null);

  useLayoutEffect(() => {
    function updateNavHeight() {
      const nav = document.getElementById("main-nav");
      if (nav) {
        setTopNavHeight(nav.offsetHeight);
      }
    }
    updateNavHeight();
    window.addEventListener("resize", updateNavHeight);
    return () => window.removeEventListener("resize", updateNavHeight);
  }, []);

  useEffect(() => {
    setReloading(true);
    // Simulate reload delay, replace with your real reload logic
    const timeout = setTimeout(() => setReloading(false), 1000);
    return () => clearTimeout(timeout);
  }, [refreshFeed]);

  // Tab switching logic: navigate to home (VideosFeed) when Reels is clicked
  const handleReelsTabClick = () => {
    if (page !== "home") {
      setPage("home");
    }
  };

  // Call this when an image post is clicked
  const handlePostClick = (post) => {
    setSelectedPost({ type: "image", data: post });
    setPage("PostComments");
  };

  // Call this when a text post is clicked
  const handleTextPostClick = (post) => {
    setSelectedPost({ type: "text", data: post });
    setPage("PostComments");
  };

  // Example posts array (replace with your real data)
  const posts = [
    { id: 1, type: "image", data: {} },
    { id: 2, type: "text", data: {} },
    // ...more posts
  ];

  return (
    <div className="posts-feed min-h-screen feed-container flex flex-col font-sans">
      {/* Attach ref to MainNav wrapper */}
      <div ref={mainNavRef}>
        <MainNav inactiveTabColor="text-gray-400" />
      </div>
      <main
        className="feed-main flex flex-col font-sans"
        style={{ marginTop: topNavHeight }}
      >
        {posts.map((post) =>
          post.type === "text" ? (
            <TextPost
              key={post.id}
              {...post.data}
              onTextPostClick={() => handleTextPostClick(post.data)}
            />
          ) : (
            <PostCard
              key={post.id}
              {...post.data}
              onPostClick={() => handlePostClick(post.data)}
            />
          )
        )}
        <AdCard />
        {/* ...other feed items */}
      </main>
      <BottomNav reloading={reloading} />
    </div>
  );
}
