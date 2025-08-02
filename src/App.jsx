import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useNavigationStore } from "./store/useNavigationStore";
import Chat from "./components/Friends/Chat";
import VideosFeed from "./features/feed/VideosFeed";
import UserProfile from "./components/UserProfile";
import DiscoverTab from "./features/discover/DiscoverTab";
import PostsFeed from "./features/feed/PostsFeed";
import Inbox from "./components/Inbox";
import SuggestedAccounts from "./components/SuggestedAccounts";
import CommentSlider from "./components/CommentSlider";
import RecordingScreen from "./components/RecordingScreen";
import AccountSettingsMenu from "./components/AccountSettingsMenu";
import LandingPage from "./components/LandingPage";
import Comments from "./components/Comments"; // Add this import
import VideoDetail from "./features/feed/VideoDetail"; // <-- make sure this import exists
import "./App.css";

function App() {
  const page = useNavigationStore((state) => state.page);
  const setPage = useNavigationStore((state) => state.setPage);
  const commentSliderProps = useNavigationStore(
    (state) => state.commentSliderProps
  );
  const setCommentSliderProps = useNavigationStore(
    (state) => state.setCommentSliderProps
  );
  const feedKey = useNavigationStore((state) => state.feedKey);

  const renderPage = () => {
    switch (page) {
      case "recording":
        return <RecordingScreen onClose={() => setPage("home")} />;
      case "home":
        return <VideosFeed key={feedKey} onOpenComments={handleOpenComments} />;
      case "profile":
        return <UserProfile />;
      case "discover":
        return <DiscoverTab />;
      case "postsFeed":
        return <PostsFeed key={feedKey} />;
      case "inbox":
        return <Inbox />;
      case "suggestedAccounts":
        return <SuggestedAccounts />;
      case "PostComments":
        return <Comments />; // Render Comments.jsx as SPA
      case "comments":
        return (
          <CommentSlider
            open={true}
            onClose={handleCloseComments}
            videoSrc={commentSliderProps?.videoSrc}
            initialTime={commentSliderProps?.initialTime}
          />
        );
      case "chat":
        return <Chat />;
      case "settings":
        return <AccountSettingsMenu />;
      case "videoDetail":
        return <VideoDetail />;
      default:
        return <Inbox />;
    }
  };

  function handleOpenComments({ videoSrc, initialTime }) {
    setCommentSliderProps({ videoSrc, initialTime });
    setPage("comments");
  }

  function handleCloseComments() {
    setPage("home");
    setCommentSliderProps({ videoSrc: "", initialTime: 0 });
  }

  return (
    <Router>
      <div className="app-container">
        <main className="main-content">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/home" element={renderPage()} />
            {/* Add more routes as needed */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
