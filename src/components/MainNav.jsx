import React from "react";
import { MagnifyingGlass, CaretDown } from "@phosphor-icons/react";
import { useNavigationStore } from "../store/useNavigationStore";

export default function MainNav({
  transparent = false,
  textWhite = false,
  borderWhite = false,
}) {
  const setPage = useNavigationStore((state) => state.setPage);
  const page = useNavigationStore((state) => state.page);

  // Dummy handlers for dropdown (replace with real logic as needed)
  function toggleDropdown() {}
  function selectOption() {}

  // Navigate to PostsFeed when Posts tab is clicked
  function handlePostsTabClick() {
    if (page !== "postsFeed") {
      setPage("postsFeed");
    }
  }

  // Navigate to VideosFeed when Videos tab is clicked
  function handleVideosTabClick() {
    if (page !== "home") {
      setPage("home");
    }
  }

  // Use this for tab text color
  const tabTextClass = textWhite ? "text-white" : "text-gray-900";
  const indicatorClass = textWhite ? "bg-white" : "bg-gray-900";
  const searchIconClass = textWhite ? "text-white" : "text-black";

  // Choose border style
  const borderClass = borderWhite
    ? "border-b border-white/30"
    : "border-b border-gray-200";

  return (
    // Navigation Wrapper
    <nav
      id="main-nav"
      className={`fixed top-0 left-0 right-0 z-40 px-4 py-2 ${borderClass} ${
        transparent ? "bg-transparent" : "bg-white"
      }`}
    >
      {/* Centered Navigation Tabs */}
      <div className="flex justify-center">
        <div className="flex items-center space-x-6">
          {/* Videos Tab */}
          <div className="relative">
            <div className="flex items-center space-x-2">
              <div className="relative">
                <span
                  className={`${tabTextClass} text-sm font-semibold cursor-pointer`}
                  onClick={handleVideosTabClick}
                >
                  Videos
                </span>
                {/* Active indicator - only under text if active */}
                {page === "home" && (
                  <div
                    className={`absolute -bottom-2 left-0 right-0 h-0.5 ${indicatorClass}`}
                  ></div>
                )}
              </div>
              {/* Styled caret button - only show if active */}
              {page === "home" && (
                <button
                  className="
      font-semibold 
      bg-white/10
      backdrop-filter backdrop-blur-md
      rounded-[4px] 
      cursor-pointer 
      group 
      w-5 h-5
      flex items-center justify-center
      border border-white/20
      shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]
      transition-all duration-200
      hover:bg-white/20 
      hover:border-white/30
      hover:shadow-lg
      active:scale-95
      relative
      before:absolute 
      before:inset-0 
      before:rounded-[4px]
      before:bg-gradient-to-br 
      before:from-white/20 
      before:to-transparent 
      before:opacity-50"
                  onClick={() => toggleDropdown()}
                >
                  <CaretDown
                    className="text-white text-xs relative z-10"
                    weight="bold"
                  />
                </button>
              )}
            </div>

            {/* Dropdown Menu */}
            <div
              id="dropdown"
              className="hidden absolute top-full left-0 mt-2 bg-black/80 backdrop-blur-sm rounded-lg py-2 min-w-[120px] shadow-lg z-10"
            >
              <div
                className="flex items-center justify-between px-4 py-2 text-white hover:bg-white/10 cursor-pointer"
                onClick={() => selectOption("For You")}
              >
                <span>For You</span>
                {/* Replace check icon with phosphor icon if needed */}
              </div>
              <div
                className="flex items-center justify-between px-4 py-2 text-white hover:bg-white/10 cursor-pointer"
                onClick={() => selectOption("Following")}
              >
                <span>Following</span>
                {/* Replace check icon with phosphor icon if needed */}
              </div>
            </div>
          </div>
          {/* Posts Tab (Active) */}
          <div className="relative">
            <div className="flex items-center space-x-2">
              <div className="relative">
                <span
                  className={`${tabTextClass} text-sm font-semibold cursor-pointer`}
                  onClick={handlePostsTabClick}
                >
                  Posts
                </span>
                {/* Active indicator - only under text if active */}
                {page === "postsFeed" && (
                  <div
                    className={`absolute -bottom-2 left-0 right-0 h-0.5 ${indicatorClass}`}
                  ></div>
                )}
              </div>
              {/* Styled caret button - only show if active */}
              {page === "postsFeed" && (
                <button
                  className="
      font-semibold 
      bg-gradient-to-br from-indigo-500 to-indigo-600
      rounded-[4px] 
      cursor-pointer 
      group 
      w-5 h-5
      flex items-center justify-center
      shadow-sm
      border border-indigo-400
      backdrop-filter backdrop-blur-[2px]
      transition-all duration-200
      hover:from-indigo-600 hover:to-indigo-700
      hover:shadow-md
      active:scale-95"
                  onClick={() => toggleDropdown()}
                >
                  <CaretDown className="text-white text-xs" weight="bold" />
                </button>
              )}
            </div>

            {/* Dropdown Menu */}
            <div
              id="dropdown"
              className="hidden absolute top-full left-0 mt-2 bg-black/80 backdrop-blur-sm rounded-lg py-2 min-w-[120px] shadow-lg z-10"
            >
              <div
                className="flex items-center justify-between px-4 py-2 text-white hover:bg-white/10 cursor-pointer"
                onClick={() => selectOption("For You")}
              >
                <span>For You</span>
                {/* Replace check icon with phosphor icon if needed */}
              </div>
              <div
                className="flex items-center justify-between px-4 py-2 text-white hover:bg-white/10 cursor-pointer"
                onClick={() => selectOption("Following")}
              >
                <span>Following</span>
                {/* Replace check icon with phosphor icon if needed */}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search Icon (Right) */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2">
        <MagnifyingGlass
          className={`${searchIconClass} text-2xl cursor-pointer hover:text-gray-600 transition-colors`}
          weight="regular"
        />
      </div>
    </nav>
  );
}
