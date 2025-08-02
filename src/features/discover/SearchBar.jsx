import React, { forwardRef, useRef, useEffect, useState } from "react";
import { MagnifyingGlass } from "@phosphor-icons/react";
import { motion, AnimatePresence } from "framer-motion"; // <-- Add this import
import "./SearchBar.css";

const SearchBar = forwardRef(function SearchBar(
  { hideSearchButton, placeholder = "Search for contents, creators..." },
  ref
) {
  const searchBarContainerRef = useRef(null);
  const [searchBarHeight, setSearchBarHeight] = useState(0);
  const [showCategoryScroll, setShowCategoryScroll] = useState(true);
  const lastScrollY = useRef(window.scrollY);

  useEffect(() => {
    if (searchBarContainerRef.current) {
      setSearchBarHeight(searchBarContainerRef.current.offsetHeight);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current) {
        // Scrolling down
        setShowCategoryScroll(false);
      } else {
        // Scrolling up
        setShowCategoryScroll(true);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div>
      <div
        ref={searchBarContainerRef}
        className="border-b border-gray-200 p-4 bg-white"
        style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 30 }}
      >
        <button
          id="searchButton"
          className="flex items-cente muted-text w-full space-x-3 system-search-bar px-4 py-2 rounded-full transition-colors"
        >
          <MagnifyingGlass className="w-5 h-5" />
          <span className="text-sm muted-text">{placeholder}</span>
        </button>
      </div>
      <AnimatePresence>
        {showCategoryScroll && (
          <motion.div
            key="category-scroll"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="border-b border-gray-200 category-scroll flex space-x-2 overflow-x-auto p-4 muted-text font-semibold bg-white"
            style={{
              position: "fixed",
              top: searchBarHeight,
              left: 0,
              right: 0,
              zIndex: 29,
            }}
          >
            <button className="pill-button active system-color px-4 py-2 rounded-full system-search-bar text-sm font-medium whitespace-nowrap">
              All
            </button>
            <button className="pill-button px-4 py-2 rounded-full system-search-bar muted-text text-sm font-medium whitespace-nowrap hover:bg-gray-200">
              Trending
            </button>
            <button className="pill-button px-4 py-2 rounded-full system-search-bar text-sm font-medium whitespace-nowrap hover:bg-gray-200">
              Music
            </button>
            <button className="pill-button px-4 py-2 rounded-full system-search-bar text-sm font-medium whitespace-nowrap hover:bg-gray-200">
              Dance
            </button>
            <button className="pill-button px-4 py-2 rounded-full system-search-bar text-sm font-medium whitespace-nowrap hover:bg-gray-200">
              Comedy
            </button>
            <button className="pill-button px-4 py-2 rounded-full system-search-bar text-sm font-medium whitespace-nowrap hover:bg-gray-200">
              Gaming
            </button>
            <button className="pill-button px-4 py-2 rounded-full system-search-bar text-sm font-medium whitespace-nowrap hover:bg-gray-200">
              Food
            </button>
            <button className="pill-button px-4 py-2 rounded-full system-search-bar text-sm font-medium whitespace-nowrap hover:bg-gray-200">
              Travel
            </button>
            <button className="pill-button px-4 py-2 rounded-full system-search-bar text-sm font-medium whitespace-nowrap hover:bg-gray-200">
              Fashion
            </button>
            <button className="pill-button px-4 py-2 rounded-full system-search-bar text-sm font-medium whitespace-nowrap hover:bg-gray-200">
              Sports
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Add a spacer div to push content below the fixed bars */}
      <div style={{ height: searchBarHeight + 69 }} />
      {/* 64px is approx. the category-scroll height */}
    </div>
  );
});

export default SearchBar;
