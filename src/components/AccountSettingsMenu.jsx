// AccountSettingsMenu.jsx
import React, { useState, useEffect } from "react";
import TopNav from "./TopNav";
import { useNavigationStore } from "../store/useNavigationStore";
import {
  User,
  LockKey,
  Key,
  Moon,
  Bell,
  Globe,
  Question,
  SignOut,
} from "@phosphor-icons/react";

export default function AccountSettingsMenu() {
  const setPage = useNavigationStore((state) => state.setPage);

  // Get initial dark mode from localStorage or system preference
  const getInitialDark = () => {
    if (typeof window === "undefined") return false;
    if (localStorage.theme === "dark") return true;
    if (localStorage.theme === "light") return false;
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  };
  const [darkMode, setDarkMode] = useState(getInitialDark);

  // Apply dark mode class to <html> and persist preference
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.theme = "dark";
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.theme = "light";
    }
  }, [darkMode]);

  return (
    <>
      <TopNav
        title="Settings"
        onBack={() => setPage("profile")}
        borderBottom
        rightIcon={null}
      />
      {/* Account Settings Menu */}
      <div className="max-w-md mx-auto p-4 space-y-6 system-base-text system-color font-sans mt-12">
        {/* 👤 Account Section */}
        <div className="system-bordered system-rounded system-divider px-4">
          <h2 className="system-secondary-text muted-text uppercase tracking-wider py-2">
            Account
          </h2>

          <button className="w-full flex items-center gap-3 py-3 hover:bg-gray-50">
            <User className="text-2xl muted-text" />
            <span className="flex-1 text-left">Profile</span>
          </button>

          <button className="w-full flex items-center gap-3 py-3 hover:bg-gray-50">
            <LockKey className="text-2xl muted-text" />
            <span className="flex-1 text-left">Privacy Settings</span>
          </button>

          <button className="w-full flex items-center gap-3 py-3 hover:bg-gray-50">
            <Key className="text-2xl muted-text" />
            <span className="flex-1 text-left">Change Password</span>
          </button>
        </div>

        {/* ⚙ Preferences Section */}
        <div className="system-bordered system-rounded system-divider px-4">
          <h2 className="system-secondary-text muted-text uppercase tracking-wider py-2">
            Preferences
          </h2>

          <div className="flex items-center justify-between gap-3 py-3 hover:bg-gray-50">
            <div className="flex items-center gap-3 flex-1">
              <Moon className="text-2xl muted-text" />
              <span className="text-left">Dark Mode</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={darkMode}
                onChange={() => setDarkMode((v) => !v)}
                aria-checked={darkMode}
              />
              <div
                className={`w-10 h-5 bg-gray-300 peer-focus:outline-none rounded-full peer ${
                  darkMode ? "bg-indigo-500" : ""
                } after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all ${
                  darkMode ? "after:translate-x-5" : ""
                }`}
              ></div>
            </label>
          </div>

          <div className="flex items-center justify-between gap-3 py-3 hover:bg-gray-50">
            <div className="flex items-center gap-3 flex-1">
              <Bell size={24} className="text-xl muted-text" />
              <span className="text-left">Notifications</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={true}
                onChange={() => {}}
                aria-checked={true}
              />
              <div
                className={`w-10 h-5 bg-gray-300 peer-focus:outline-none rounded-full peer ${
                  true ? "bg-indigo-500" : ""
                } after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all ${
                  true ? "after:translate-x-5" : ""
                }`}
              ></div>
            </label>
          </div>
        </div>

        {/* 🌐 General Actions Section */}
        <div className="system-bordered system-rounded system-divider px-4">
          <h2 className="system-secondary-text muted-text uppercase tracking-wider py-2">
            General
          </h2>

          <button className="w-full flex items-center gap-3 py-3 hover:bg-gray-50">
            <Globe size={24} className="text-xl muted-text" />
            <span className="flex-1 text-left">Language</span>
          </button>

          <button className="w-full flex items-center gap-3 py-3 hover:bg-gray-50">
            <Question size={24} className="text-xl muted-text" />
            <span className="flex-1 text-left">Help Center</span>
          </button>

          <button className="w-full flex items-center gap-3 py-3 text-red-600 hover:bg-red-50">
            <SignOut size={24} className="text-xl text-red-500" />
            <span className="flex-1 text-left">Log Out</span>
          </button>
        </div>
      </div>
    </>
  );
}
