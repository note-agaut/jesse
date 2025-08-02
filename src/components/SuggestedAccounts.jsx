import React, { useState, useRef, useEffect } from "react";
import { suggestedAccountsData } from "../data/SuggestedAccountsData";
import { useNavigationStore } from "../store/useNavigationStore";
import BottomNav from "./BottomNav";
import SearchBar from "./SearchBar";

// Use your primary color (replace 'indigo-500' with your Tailwind primary color if different)
const PRIMARY_COLOR = "indigo-500";

function MutualsAvatars({ mutuals }) {
  if (!mutuals || mutuals.length === 0)
    return <span className="muted-text text-xs">Suggested for you</span>;

  // Only show the first mutual friend's avatar
  const firstMutual = mutuals[0];
  const mutualAccount = suggestedAccountsData.find(
    (acc) => acc.username === firstMutual
  );

  return (
    <span className="flex items-center gap-1">
      <span className="muted-text text-xs mr-1">Followed by</span>
      {mutualAccount && (
        <img
          key={mutualAccount.username}
          src={mutualAccount.avatar}
          alt={mutualAccount.username}
          className="w-5 h-5 rounded-full border border-gray-200 object-cover"
        />
      )}
    </span>
  );
}

export default function SuggestedAccounts() {
  const BATCH_SIZE = 20;
  const [visibleCount, setVisibleCount] = useState(BATCH_SIZE);
  const loaderRef = useRef(null);
  const setPage = useNavigationStore((state) => state.setPage);

  useEffect(() => {
    const handleScroll = () => {
      if (!loaderRef.current) return;
      const rect = loaderRef.current.getBoundingClientRect();
      if (rect.top < window.innerHeight) {
        setVisibleCount((prev) =>
          Math.min(prev + BATCH_SIZE, suggestedAccountsData.length)
        );
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (loaderRef.current) {
      const rect = loaderRef.current.getBoundingClientRect();
      if (rect.top < window.innerHeight) {
        setVisibleCount((prev) =>
          Math.min(prev + BATCH_SIZE, suggestedAccountsData.length)
        );
      }
    }
  }, [visibleCount]);

  // Height of the fixed SearchBar (adjust if needed)
  const SEARCH_BAR_HEIGHT = 72;

  return (
    <>
      {/* Fixed SearchBar */}
      <div
        className="fixed top-0 left-0 right-0 z-40 bg-white border-b border-gray-200"
        style={{
          height: SEARCH_BAR_HEIGHT,
          display: "flex",
          alignItems: "center",
        }}
      >
        <SearchBar placeholder="Search for users, accounts..." />
      </div>
      {/* Add top padding to content to prevent overlap */}
      <div className="mt-2" />

      <div className="overflow-y-auto px-4 space-y-6 font-sans">
        {suggestedAccountsData.slice(0, visibleCount).map((acc, idx) => (
          <div
            className="flex items-center justify-between"
            key={acc.username + idx}
          >
            <div className="flex items-center gap-4">
              <img
                src={acc.avatar}
                alt="Avatar"
                className="w-14 h-14 rounded-full object-cover border-2 border-gray-200"
              />
              <div className="min-w-0">
                <p className="system-username truncate">{acc.username}</p>
                <p className=" mt-0.5 truncate">
                  <MutualsAvatars mutuals={acc.mutuals} />
                </p>
              </div>
            </div>
            <button
              className={`px-5 py-1.5 text-sm system-rounded font-semibold bg-${PRIMARY_COLOR} text-white focus:outline-none border border-transparent min-h-[40px]`}
              aria-label={`Follow ${acc.username}`}
              tabIndex={0}
            >
              Follow
            </button>
          </div>
        ))}
        {visibleCount < suggestedAccountsData.length && (
          <div ref={loaderRef} className="flex justify-center py-4">
            <span className="muted-text system-secondary-text">
              Loading more...
            </span>
          </div>
        )}
      </div>
      <BottomNav />
    </>
  );
}
