import React, { useRef, useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import BottomNav from "../../components/BottomNav";
import {
  Heart,
  Image as ImageIcon,
  FilmSlate,
} from "@phosphor-icons/react";
import { useNavigationStore } from "../../store/useNavigationStore";
import { discoverPosts } from "./PostsData"; // <-- Import seeded data

export default function DiscoverTab() {
  const searchBarRef = useRef(null);
  const [searchBarHeight, setSearchBarHeight] = useState("");

  const setPage = useNavigationStore((state) => state.setPage);
  const setSelectedPost = useNavigationStore((state) => state.setSelectedPost);

  useEffect(() => {
    if (searchBarRef.current) {
      setSearchBarHeight(`${searchBarRef.current.offsetHeight}px`);
    }
  }, [searchBarRef]);

  return (
    <div className="max-w-md mx-auto bg-white font-sans">
      {/* Search Bar */}
      <SearchBar ref={searchBarRef} />

      {/* 2-Column Grid */}
      <div
        className="grid grid-cols-2 gap-1 p-1"
        style={{ marginTop: searchBarHeight }}
      >
        {discoverPosts.map((post) =>
          post.type === "image" ? (
            <div
              key={post.id}
              className="grid-item bg-white rounded-lg overflow-hidden flex flex-col"
            >
              <div
                className="relative thumbnail rounded-t-lg h-40"
                style={{ aspectRatio: "3/4" }}
              >
                <img
                  src={post.bgImage}
                  alt="Random"
                  className="w-full h-full object-cover rounded-b-lg"
                  style={{ height: "100%", width: "100%" }}
                />
                {/* Content type icon */}
                <div className="absolute top-2 right-2">
                  <ImageIcon className="text-white text-base" weight="fill" />
                </div>
                {/* Like count on image, bottom right */}
                <div className="absolute bottom-2 right-2 flex items-center space-x-1 flex-shrink-0 bg-black/50 px-2 py-1 rounded-sm">
                  <Heart className="text-white/90 text-xs" weight="fill" />
                  <span className="text-xs text-white">{post.likes}</span>
                </div>
              </div>
              {/* Post info */}
              <div className="p-2 space-y-2">
                <p className="text-sm system-color line-clamp-2">{post.caption}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 min-w-0">
                    <img
                      src={post.avatar}
                      alt="User Avatar"
                      className="w-5 h-5 avatar rounded-full object-cover flex-shrink-0"
                    />
                    <span className="text-xs muted-text truncate">
                      {post.username}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div
              key={post.id}
              className="grid-item bg-white rounded-lg overflow-hidden flex flex-col cursor-pointer"
              onClick={() => {
                setSelectedPost({
                  src: post.video,
                  poster: post.poster,
                  username: post.username,
                  avatar: post.avatar,
                  caption: post.caption,
                  likes: post.likes,
                });
                setPage("videoDetail");
              }}
            >
              <div
                className="relative thumbnail rounded-t-lg h-40"
                style={{ aspectRatio: "3/4" }}
              >
                <video
                  src={post.video}
                  className="w-full h-full object-cover rounded-b-lg"
                  style={{ height: "100%", width: "100%" }}
                  controls={false}
                  autoPlay={false}
                  loop
                  muted
                  playsInline
                />
                {/* Content type icon */}
                <div className="absolute top-2 right-2">
                  <FilmSlate className="text-white text-base" weight="fill" />
                </div>
                {/* Like count on video, bottom right */}
                <div className="absolute bottom-2 right-2 flex items-center space-x-1 flex-shrink-0 bg-black/50 px-2 py-1 rounded-sm">
                  <Heart className="text-white/90 text-xs" weight="fill" />
                  <span className="text-xs text-white">{post.likes}</span>
                </div>
              </div>
              {/* Post info */}
              <div className="p-2 space-y-2">
                <p className="text-sm system-color line-clamp-2">{post.caption}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 min-w-0">
                    <img
                      src={post.avatar}
                      alt="User Avatar"
                      className="w-5 h-5 avatar rounded-full object-cover flex-shrink-0"
                    />
                    <span className="text-xs text-gray-400 truncate">
                      {post.username}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )
        )}
      </div>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
}
