import React from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css"; // Import your custom styles

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    // Enhanced Landing Hero with Indigo Brand Theme and Rhythm
    <section className="relative min-h-screen flex flex-col justify-center items-center text-center px-6 pt-20 pb-16 sm:pt-28 sm:pb-24 text-white hero-background overflow-hidden font-sans">
      {/* Optional overlay for extra depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-indigo-900 opacity-30"></div>

      {/* Content Wrapper */}
      <div className="z-10 max-w-2xl w-full flex flex-col items-center">
        {/* Logo with enhanced branding */}
        <div className="flex items-center space-x-1 mb-5 fade-in-up">
          <span className="text-4xl font-bold text-indigo-500 leading-none enhanced-text-shadow bg-white px-2 py-1 rounded-lg shadow-lg">
            N
          </span>
          <div className="w-6 h-6 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center shadow-lg pulse-indigo">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-3.5 h-3.5 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
          <span className="text-4xl font-bold text-indigo-500 leading-none enhanced-text-shadow bg-white px-2 py-1 rounded-lg shadow-lg">
            t
          </span>
          <span className="text-4xl font-bold text-indigo-500 leading-none enhanced-text-shadow bg-white px-2 py-1 rounded-lg shadow-lg">
            e
          </span>
        </div>

        {/* Headline with staggered animation */}
        <h1 className="text-3xl sm:text-4xl font-semibold max-w-xl leading-tight mb-2 enhanced-text-shadow fade-in-up-delay-1">
          A Simpler Platform for Creators to Share Their Moments
        </h1>

        {/* Tagline */}
        <p className="text-sm text-indigo-200 italic mb-6 enhanced-text-shadow fade-in-up-delay-2">
          Built for creators who value simplicity, connection, and expression.
        </p>

        {/* Description */}
        <p className="max-w-xl text-lg text-indigo-100 mb-8 enhanced-text-shadow fade-in-up-delay-2">
          This MVP demo showcases the UI for{" "}
          <strong className="text-white">Note</strong> — a modern, creator-first
          social app built with React. The goal is to bring this vision to life
          on mobile with real backend functionality.
        </p>

        {/* Features with rhythmic spacing */}
        <div className="mb-10 space-y-4 text-left max-w-md w-full text-indigo-100 text-sm sm:text-base fade-in-up-delay-3">
          <p className="flex items-start gap-3 p-3 rounded-lg indigo-border-glow backdrop-blur-sm">
            <svg
              className="w-5 h-5 text-orange-400 mt-0.5 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M9 19V6h13v13H9zm11-2V8H11v9h9zM6 4v15h2V4H6z" />
            </svg>
            <span>Clean & responsive interface for web and mobile</span>
          </p>
          <p className="flex items-start gap-3 p-3 rounded-lg indigo-border-glow backdrop-blur-sm">
            <svg
              className="w-5 h-5 text-orange-400 mt-0.5 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M3 6l3 6 4-4 4 5 4-6 4 8H3z" />
            </svg>
            <span>
              Pages included: Feed, Explore, Suggestions, Profiles, Settings
            </span>
          </p>
          <p className="flex items-start gap-3 p-3 rounded-lg indigo-border-glow backdrop-blur-sm">
            <svg
              className="w-5 h-5 text-orange-400 mt-0.5 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zm0 9.3L4 7.3v7.4l8 4 8-4V7.3l-8 4z" />
            </svg>
            <span>
              Next: Flutter mobile app & backend functionality — funding needed
            </span>
          </p>
        </div>

        <div className=" p-8 flex justify-center items-center min-h-screen">
          {/* Screenshot Framed */}
          <div className="relative w-72">
            {/* Phone Frame */}
            <div className="relative bg-gray-900 rounded-[3rem] p-2 shadow-2xl h-[550px]">
              {/* Screen Container */}
              <div className="relative rounded-[2.5rem] border border-gray-200 overflow-hidden bg-black h-full">
                {/* Enhanced Status Bar */}
                <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-black/80 via-black/40 to-transparent z-20 flex justify-between items-center px-6">
                  {/* Time */}
                  <div className="text-white text-sm font-semibold tracking-wide">
                    9:41
                  </div>
                  {/* Status Icons */}
                  <div className="flex items-center space-x-1">
                    {/* Signal Bars */}
                    <div className="flex space-x-0.5 items-end">
                      <div className="w-0.5 h-1 bg-white rounded-full"></div>
                      <div className="w-0.5 h-1.5 bg-white rounded-full"></div>
                      <div className="w-0.5 h-2 bg-white rounded-full"></div>
                      <div className="w-0.5 h-2.5 bg-white rounded-full"></div>
                    </div>
                    {/* WiFi Icon */}
                    <div className="w-4 h-3 relative">
                      <svg
                        className="w-4 h-3 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M2.166 4.999A11.99 11.99 0 0110 1.944 11.99 11.99 0 0117.834 5c.11.65-.166 1.312-.75 1.595L10 14.75 2.916 6.594c-.584-.283-.86-.944-.75-1.595zM8.023 7.022a3.972 3.972 0 0 1 3.954 0l.493.493a.25.25 0 0 1 0 .354L10 10.339 7.53 7.869a.25.25 0 0 1 0-.354l.493-.493z" />
                      </svg>
                    </div>
                    {/* Battery */}
                    <div className="relative">
                      <div className="w-6 h-2.5 border border-white rounded-sm">
                        <div className="w-full h-full bg-green-500 rounded-none"></div>
                      </div>
                      <div className="absolute -right-0.5 top-0.5 w-0.5 h-1.5 bg-white rounded-r-sm"></div>
                    </div>
                  </div>
                </div>
                {/* App Content */}
                <div className="absolute inset-0">
                  <img
                    src="file:///storage/emulated/0/Android/data/com.teejay.trebedit/files/TrebEdit user files/chat/hero.png"
                    alt="Note App Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Home Indicator */}
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-white/40 rounded-full"></div>
              </div>
              {/* Screen Reflection */}
              <div className="absolute inset-2 rounded-[2rem] bg-gradient-to-br from-white/10 via-transparent to-white/5 pointer-events-none"></div>
            </div>
          </div>
        </div>

        {/* CTA with enhanced branding */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center fade-in-up-delay-4">
          <button
            type="button"
            onClick={() => navigate("/home")}
            className="px-8 py-4 bg-white text-indigo-600 font-semibold rounded-lg hover:bg-indigo-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 indigo-glow"
          >
            View Demo
          </button>

          <a
            href="/downloads/note-investor-pitch.pdf"
            download
            className="inline-flex items-center gap-2 px-6 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            View Pitch Deck
          </a>

          <a
            href="mailto:your@email.com"
            className="text-indigo-200 font-medium underline-offset-4 hover:underline hover:text-white transition-all duration-300 self-center enhanced-text-shadow flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
            </svg>
            Contact Founder
          </a>
        </div>
      </div>
    </section>
  );
}
