import React from "react";
import { useNavigationStore } from "../../store/useNavigationStore";

const friends = [
  {
    avatar: "https://picsum.photos/40?random=1",
    username: "jane_doe",
    message: "Sure! I’ll send it over in a few minutes.",
    time: "2m ago",
    online: true,
  },
  {
    avatar: "https://picsum.photos/40?random=2",
    username: "alex_99",
    message: "Got it! Let me check and get back to you soon.",
    time: "10m ago",
    online: false,
  },
  {
    avatar: "https://picsum.photos/40?random=3",
    username: "samywrites",
    message: "Thanks! I’ll review it before publishing.",
    time: "1h ago",
    online: true,
  },
];

export default function Friends() {
  const setPage = useNavigationStore((state) => state.setPage);

  return (
    <div className="space-y-2 font-sans">
      <div className="mt-0">
        {friends.map((f, idx) => (
          <div
            key={idx}
            className="flex items-start gap-3 px-4 py-2 min-h-[56px] cursor-pointer"
            role="listitem"
            tabIndex={0}
            onClick={() => setPage("chat")}
          >
            <div className="relative min-w-[3rem]">
              <img
                src={f.avatar}
                alt={`${f.username} avatar`}
                className="w-12 h-12 rounded-full object-cover system-border bg-white transition-colors"
                aria-label={f.username}
              />
              {f.online && (
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-[1.5px] border-white rounded-full ring-1 ring-gray-100"></span>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center">
                <h4 className="system-username truncate">{f.username}</h4>
                <span className="text-xs muted-text">{f.time}</span>
              </div>
              <p className="text-sm muted-text mt-0.5 line-clamp-1">
                {f.message}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
