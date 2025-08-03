import React, { useRef, useEffect } from "react";
import {
  House,
  MagnifyingGlass,
  Plus,
  ChatCentered,
  User,
  ArrowClockwise,
} from "@phosphor-icons/react";
import { useNavigationStore } from "../store/useNavigationStore";

export default function BottomNav({
  transparent = false,
  iconColor = "",
  getIconColor,
  className,
}) {
  const navRef = useRef(null);
  const setPage = useNavigationStore((state) => state.setPage);
  const page = useNavigationStore((state) => state.page);
  const bumpFeedKey = useNavigationStore((state) => state.bumpFeedKey);
  const reloading = useNavigationStore((state) => state.reloading);
  const setReloading = useNavigationStore((state) => state.setReloading);

  const tabList = [
    ...(reloading
      ? [
          {
            icon: <ArrowClockwise className="text-2xl animate-spin" />,
            label: "Reloading",
            page: "home",
            isReload: true,
          },
        ]
      : [
          {
            icon: <House className="text-2xl" />,
            label: "Home",
            page: "home",
          },
        ]),
    {
      icon: <MagnifyingGlass className="text-2xl" />,
      label: "Search",
      page: "discover",
    },
    {
      icon: <ChatCentered className="text-2xl" />,
      label: "Inbox",
      badge: 3,
      page: "inbox",
    },
    { icon: <User className="text-2xl" />, label: "Profile", page: "profile" },
  ];

  // Only the first tab (Home or Reload) on the left, rest on the right
  const leftTabs = tabList.slice(0, 1);
  const rightTabs = tabList.slice(1);
  const tabPages = tabList.map((tab) => tab.page);

  useEffect(() => {
    function handleSafeArea() {
      const nav = navRef.current;
      if (!nav) return;
      const safeAreaBottom =
        getComputedStyle(document.documentElement).getPropertyValue(
          "--safe-area-inset-bottom"
        ) || "0px";
      if (safeAreaBottom !== "0px") {
        nav.style.paddingBottom = safeAreaBottom;
      }
    }
    handleSafeArea();
    window.addEventListener("orientationchange", () => {
      setTimeout(handleSafeArea, 100);
    });

    return () => {
      window.removeEventListener("orientationchange", () => {
        setTimeout(handleSafeArea, 100);
      });
    };
  }, []);

  // Add dynamic classes
  const navBgClass = transparent ? "bg-transparent" : "bg-white";
  const iconClass = iconColor ? iconColor : "";

  // Helper to get icon color class
  function resolveIconColor(tab, isActive) {
    if (getIconColor) return getIconColor(tab, isActive);
    if (iconColor) return iconColor;
    if (isActive) return "active system-color";
    return "system-color";
  }

  return (
    <nav>
      <div
        className={`glass-bottom-nav ${navBgClass} ${
          className || "system-border-top"
        } fixed bottom-0 left-0 right-0 z-50 h-[54px] flex items-center justify-between px-4 safe-area-inset-bottom`}
        ref={navRef}
      >
        {/* Left tabs */}
        {leftTabs.map((tab) => {
          const isActive =
            tab.page === "home"
              ? page === "home" || page === "postsFeed"
              : page === tab.page && tabPages.includes(page);
          const iconWithWeight = tab.isReload
            ? tab.icon
            : React.cloneElement(tab.icon, {
                weight: isActive ? "fill" : "regular",
              });
          return (
            <button
              key={tab.label}
              className={`tab-btn flex flex-col items-center justify-center rounded-lg ${resolveIconColor(
                tab,
                isActive
              )}${tab.badge ? " relative" : ""}`}
              onClick={async () => {
                if (tab.isReload) {
                  // Do nothing while reloading
                } else if (
                  tab.page === "home" &&
                  (page === "home" || page === "postsFeed")
                ) {
                  setReloading(true);
                  bumpFeedKey();
                  // Simulate reload delay, or replace with actual reload logic
                  setTimeout(() => setReloading(false), 1000);
                } else {
                  setPage(tab.page);
                }
              }}
              aria-label={tab.label}
              disabled={tab.isReload}
            >
              {iconWithWeight}
              <span className="text-xs mt-0.5">{tab.label}</span>
              {tab.badge && (
                <span className="absolute top-0 -right-0 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold">
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}

        {/* Discover tab */}
        {rightTabs.length > 0 &&
          (() => {
            const tab = rightTabs[0];
            const isActive = page === tab.page && tabPages.includes(page);
            const iconWithWeight = React.cloneElement(tab.icon, {
              weight: isActive ? "fill" : "regular",
            });
            return (
              <button
                key={tab.label}
                className={`tab-btn flex flex-col items-center justify-center rounded-lg ${resolveIconColor(
                  tab,
                  isActive
                )}${tab.badge ? " relative" : ""}`}
                onClick={() => setPage(tab.page)}
                aria-label={tab.label}
              >
                {iconWithWeight}
                <span className="text-xs mt-0.5">{tab.label}</span>
                {tab.badge && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold">
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })()}

        {/* Create Button section - updated */}
        <button
          key="create"
          className={`tab-btn flex flex-col items-center justify-center rounded-lg ${resolveIconColor(
            { page: "recording" },
            page === "recording"
          )}`}
          onClick={() => setPage("recording")}
          aria-label="Create"
        >
          <Plus
            className="text-2xl"
            weight={page === "recording" ? "fill" : "regular"}
          />
          <span className="text-xs mt-0.5">Create</span>
        </button>

        {/* Rest of right tabs */}
        {rightTabs.slice(1).map((tab) => {
          const isActive = page === tab.page && tabPages.includes(page);
          const iconWithWeight = React.cloneElement(tab.icon, {
            weight: isActive ? "fill" : "regular",
          });
          return (
            <button
              key={tab.label}
              className={`tab-btn flex flex-col items-center justify-center rounded-lg ${resolveIconColor(
                tab,
                isActive
              )}${tab.badge ? " relative" : ""}`}
              onClick={() => setPage(tab.page)}
              aria-label={tab.label}
            >
              {iconWithWeight}
              <span className="text-xs mt-0.5">{tab.label}</span>
              {tab.badge && (
                <span className="absolute -top-1 right-0 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold">
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
