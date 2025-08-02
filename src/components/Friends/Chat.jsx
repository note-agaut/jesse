import React, {
  useState,
  useRef,
  useEffect,
  useLayoutEffect,
  useState as useStateAlias,
} from "react";
import {
  Smiley,
  ImageSquare,
  PaperPlaneRight,
  DotsThree,
} from "@phosphor-icons/react";
import TopNav from "../TopNav";
import { useNavigationStore } from "../../store/useNavigationStore";
import SearchBar from "../SearchBar"; // <-- import SearchBar

const messages = [
  {
    type: "in",
    avatar: "https://picsum.photos/40?random=1",
    text: "Hey! Did you get a chance to check that file?",
    time: "10:42 AM",
  },
  {
    type: "out",
    text: "Yeah, I just reviewed it. Everything looks great!",
    time: "10:45 AM",
  },
  {
    type: "in",
    avatar: "https://picsum.photos/40?random=1",
    text: "Awesome 😄 Let me know if you need changes!",
    time: "10:47 AM",
  },
  {
    type: "out",
    text: "Will do! Thanks, Jane.",
    time: "10:48 AM",
  },
];

export default function Chat() {
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);
  const setPage = useNavigationStore((state) => state.setPage);

  // Add ref and state for TopNav height
  const topNavRef = useRef(null);
  const [topNavHeight, setTopNavHeight] = useStateAlias(44); // fallback default

  // Optional: handle back navigation
  const handleBack = () => setPage("inbox");

  // Example user info for header
  const user = {
    avatar: "https://picsum.photos/40?random=1",
    name: "Jane Doe",
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, input]);

  // Dynamically measure TopNav height
  useLayoutEffect(() => {
    if (topNavRef.current) {
      setTopNavHeight(topNavRef.current.offsetHeight);
    }
  }, []);

  return (
    <div className="fixed inset-0 bg-white flex flex-col font-sans">
      <TopNav
        ref={topNavRef}
        borderBottom
        onBack={handleBack}
        rightIcon={<DotsThree className="2xl system-color" />}
        title={
          <div className="flex flex-col items-center justify-center w-full">
            <div className="flex items-center gap-2">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-8 h-8 rounded-full object-cover"
              />
              <span className="text-base font-medium">{user.name}</span>
            </div>
          </div>
        }
      />
      <div style={{ paddingTop: topNavHeight }}>
        <SearchBar placeholder="Search for chats" />
      </div>
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 bg-white">
        {messages.map((msg, idx) =>
          msg.type === "in" ? (
            <div key={idx} className="flex items-start gap-2">
              <img
                src={msg.avatar}
                className="w-8 h-8 rounded-full object-cover" // changed from w-12 h-12 to w-8 h-8
                alt=""
              />
              <div>
                <div className="bg-gray-100 border border-gray-200 px-4 py-2 rounded-2xl system-color  system-base-text max-w-[75vw]">
                  {msg.text}
                </div>
                <div className="text-xs muted-text mt-1">{msg.time}</div>
              </div>
            </div>
          ) : (
            <div key={idx} className="flex flex-col items-end">
              <div className="bg-indigo-600 system-base-text text-white px-4 py-2 rounded-2xl text-sm max-w-[75vw]">
                {msg.text}
              </div>
              <div className="text-xs muted-text mt-1 mr-1">{msg.time}</div>
            </div>
          )
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="px-4 py-3 border-t border-gray-200 flex items-center gap-2 bg-white">
        <button className="text-xl system-color" tabIndex={-1}>
          <Smiley size={24} />
        </button>
        <input
          id="messageInput"
          type="text"
          placeholder="Message..."
          className="flex-1 border border-gray-300 rounded-full pl-3 pr-3 py-2 text-sm focus:outline-none"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="text-xl system-color" tabIndex={-1}>
          <ImageSquare size={24} />
        </button>
        <button
          id="sendBtn"
          className={`text-xl transition-colors ${
            input.trim() ? "text-indigo-600" : "text-gray-300"
          }`}
          disabled={!input.trim()}
        >
          <PaperPlaneRight size={24} />
        </button>
      </div>
    </div>
  );
}
