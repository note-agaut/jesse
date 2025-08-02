import React, { useRef, useLayoutEffect, useState } from "react";
import {
  SealCheck,
  Heart,
  ArrowBendUpLeft,
  Smiley,
  PaperPlaneRight,
} from "@phosphor-icons/react";
import TopNav from "./TopNav";
import Posts from "../features/feed/Posts";
import TextPost from "../features/feed/TextPost";
import { useNavigationStore } from "../store/useNavigationStore"; // <-- import store

export default function Comments() {
  const topNavRef = useRef(null);
  const [topNavHeight, setTopNavHeight] = useState(0);
  const setPage = useNavigationStore((state) => state.setPage); // <-- get setPage
  const selectedPost = useNavigationStore((state) => state.selectedPost);

  useLayoutEffect(() => {
    if (topNavRef.current) {
      setTopNavHeight(topNavRef.current.offsetHeight);
    }
  }, []);

  // Use setPage to go back to PostsFeed, matching app logic
  const handleBack = () => setPage("postsFeed");

  return (
    <>
      <div
        style={{ zIndex: 30, position: "fixed", left: 0, right: 0, top: 0 }}
      >
        <TopNav
          ref={topNavRef}
          title="Comments"
          borderBottom={true}
          onBack={handleBack}
        />
      </div>
      <div
        style={{
          marginTop: topNavHeight,
          position: "relative",
          minHeight: "100vh",
        }}
      >
        <div className="system-border border-b">
          {selectedPost?.type === "text" ? (
            <TextPost {...selectedPost.data} />
          ) : (
            <Posts topNavHeight={topNavHeight} hideMutualComments={true} />
          )}
        </div>
        <div
          className="p-4 bg-white font-sans"
          style={{ paddingBottom: "5rem" }}
        >
          {/* Comments Container with Flex Column */}
          <div className="flex flex-col gap-4">
            {/* Comment 1 */}
            <div className="flex space-x-3">
              <img
                src="https://picsum.photos/200/300"
                alt="Sarah"
                className="w-8 h-8 rounded-full"
              />
              <div className="flex-1">
                <div>
                  <p className="system-username flex items-center space-x-1">
                    <span>Sarah Johnson</span>
                    <SealCheck
                      className="text-indigo-500 text-sm "
                      weight="fill"
                    />
                  </p>
                  <div className="mt-1"></div>{" "}
                  {/* Add gap between username and comment */}
                  <p className="text-sm system-color ">
                    Wow! This looks incredible. Which trail did you take?
                  </p>
                </div>
                <div className="flex items-center space-x-4 mt-1">
                  <span className="text-sm muted-text">2h</span>
                  <button className="like-btn flex items-center space-x-1">
                    <Heart className="text-[1.25rem] muted-text" />
                    <span className="text-sm font-medium muted-text">12</span>
                  </button>
                  <button className="reply-btn flex items-center space-x-1">
                    <ArrowBendUpLeft className="text-[1.25rem] muted-text" />
                    <span className="text-sm font-medium muted-text">3</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <form
          className="flex items-center gap-2 px-4 py-3 border-t border-gray-200 dark:border-[#27272a] bg-white dark:bg-[#232329] fixed bottom-0 left-0 w-full z-20"
          style={{ maxWidth: "100vw" }}
        >
          <img
            src="https://i.pravatar.cc/40"
            alt="Your avatar"
            className="w-8 h-8 rounded-full object-cover"
          />
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Add a comment..."
              className="w-full system-search-bar rounded-full px-4 py-2 text-sm outline-none pr-9"
            />
            <span className="absolute right-2 top-1/2 -translate-y-1/2 muted-text cursor-pointer">
              <Smiley className="text-[1.25rem]" />
            </span>
          </div>
          <button
            type="submit"
            className="text-indigo-500 font-semibold  rounded-full transition flex items-center justify-center"
            aria-label="Send"
          >
            <PaperPlaneRight className="text-[1.25rem]" />
          </button>
        </form>
      </div>
    </>
  );
}
