import React, { useState, useEffect, useRef } from "react";

// Helper: detect touch device
const isTouchDevice = () =>
  typeof window !== "undefined" &&
  ("ontouchstart" in window || navigator.maxTouchPoints > 0);

const notificationsSeed = [
  {
    type: "follow",
    user: "jaycee",
    avatar: "https://picsum.photos/40?random=1",
    message: (
      <>
        <span className=" font-semibold text-indigo-500 system-base-text">
          jaycee
        </span>{" "}
        started following you.
      </>
    ),
    time: "Just now",
  },
  {
    type: "mention",
    user: "zee_coder",
    avatar: "https://picsum.photos/40?random=15",
    message: (
      <>
        <span className="font-semibold text-indigo-500 system-base-text">
          zee_coder
        </span>{" "}
        mentioned you in a comment.
      </>
    ),
    comment: `"Looks great! You should tag @jack_mars on this thread and check the update."`,
    time: "3m ago",
  },
  {
    type: "video",
    user: "lisa_king",
    avatar: "https://picsum.photos/40?random=10",
    message: (
      <>
        <span className="font-semibold text-indigo-500 system-base-text">
          lisa_king
        </span>{" "}
        posted a new video.
      </>
    ),
    videoThumb: "https://picsum.photos/100/60?random=20",
    time: "1h ago",
  },
  {
    type: "suggestion",
    avatar: "https://picsum.photos/40?random=11",
    message: (
      <>
        You have new friend suggestions:{" "}
        <span className="font-semibold text-indigo-500 system-base-text">
          shade_me
        </span>{" "}
        and 3 others.
      </>
    ),
    time: "2h ago",
  },
  {
    type: "friend-request",
    user: "sola_dev",
    avatar: "https://picsum.photos/40?random=12",
    message: (
      <>
        <span className="font-semibold text-indigo-500 system-base-text">
          sola_dev
        </span>{" "}
        sent you a friend request.
      </>
    ),
    time: "2h ago",
  },
];

export default function NotificationsContainer() {
  const [notifications, setNotifications] = useState(notificationsSeed);
  const [bottomNavHeight, setBottomNavHeight] = useState(44); // default height
  const bottomNavRef = useRef(null);

  useEffect(() => {
    // Try to find BottomNav and get its height
    const nav = document.querySelector("nav.fixed.bottom-0");
    if (nav) {
      setBottomNavHeight(nav.offsetHeight);
    }
  }, []);

  // Swipe-to-dismiss handlers
  const handleTouchStart = (e, idx) => {
    if (!isTouchDevice()) return;
    const touch = e.touches[0];
    e.target.closest(".notification-item").dataset.startX = touch.clientX;
    e.target.closest(".notification-item").dataset.currentX = touch.clientX;
    e.target.closest(".notification-item").style.transition = "none";
  };

  const handleTouchMove = (e, idx) => {
    if (!isTouchDevice()) return;
    const item = e.target.closest(".notification-item");
    const startX = parseFloat(item.dataset.startX || 0);
    const touch = e.touches[0];
    const deltaX = touch.clientX - startX;
    if (deltaX < 0) {
      item.style.transform = `translateX(${deltaX}px)`;
      const trashIcon = item.parentElement.querySelector(".ph-trash");
      if (trashIcon) trashIcon.style.opacity = "1";
    }
    item.dataset.currentX = touch.clientX;
  };

  const handleTouchEnd = (e, idx) => {
    if (!isTouchDevice()) return;
    const item = e.target.closest(".notification-item");
    const startX = parseFloat(item.dataset.startX || 0);
    const currentX = parseFloat(item.dataset.currentX || 0);
    const deltaX = currentX - startX;
    const threshold = -80;
    item.style.transition = "all 0.3s ease";
    const trashIcon = item.parentElement.querySelector(".ph-trash");
    if (deltaX < threshold) {
      // Dismiss
      if (navigator.vibrate) navigator.vibrate(50);
      item.style.transform = "translateX(-100%)";
      item.style.opacity = "0";
      setTimeout(() => {
        setNotifications((prev) => prev.filter((_, i) => i !== idx));
      }, 300);
    } else {
      // Reset
      item.style.transform = "translateX(0)";
      if (trashIcon) trashIcon.style.opacity = "0";
    }
  };

  return (
    <div
      id="notifications"
      className="bg-white relative px-4 font-sans"
      style={{
        marginBottom: bottomNavHeight + 8, // 8px extra spacing
      }}
    >
      {notifications.map((n, i) => (
        <div
          className="notification-wrapper relative overflow-hidden mb-2 bg-white"
          key={i}
        >
          <div className="absolute inset-0 bg-red-50 flex items-center justify-end pr-4 pointer-events-none">
            <i className="ph ph-trash text-red-500 text-xl opacity-0 transition-opacity duration-200 bg-white rounded-full p-2"></i>
          </div>
          <div
            className="notification-item flex items-start gap-3 py-3 px-0 bg-white transition-all duration-300 ease-in-out touch-pan-x relative z-10 active:bg-gray-100"
            onTouchStart={(e) => handleTouchStart(e, i)}
            onTouchMove={(e) => handleTouchMove(e, i)}
            onTouchEnd={(e) => handleTouchEnd(e, i)}
          >
            <img
              src={n.avatar}
              className="w-11 h-11 rounded-full object-cover ring-1 ring-gray-200"
              alt=""
            />
            <div className="flex-1 system-color system-base-text">
              <p>{n.message}</p>
              {n.type === "mention" && (
                <p className=" muted-text text-sm mt-1 line-clamp-1 italic">
                  {n.comment}
                </p>
              )}
              {n.type === "video" && (
                <div className="mt-2">
                  <img
                    src={n.videoThumb}
                    className="rounded-md w-28 h-16 object-cover border border-gray-200"
                    alt=""
                  />
                </div>
              )}
              {n.type === "friend-request" && (
                <div className="flex gap-2 mt-2">
                  <button className="px-3 py-1 text-sm text-white bg-indigo-500 hover:bg-indigo-600 focus:ring-2 focus:ring-indigo-300 system-rounded transition">
                    Accept
                  </button>
                  <button className="px-3 py-1 text-sm border text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-gray-200 system-rounded bg-white border-gray-200 transition">
                    Reject
                  </button>
                </div>
              )}
              <span className=" muted-text text-xs mt-1 block text-right">
                {n.time}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
