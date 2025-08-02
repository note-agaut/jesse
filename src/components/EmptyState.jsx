import React from "react";
import { FolderOpen } from "@phosphor-icons/react";

export default function EmptyState({
  title = "Nothing here yet",
  message = "You don’t have any notifications at the moment.",
}) {
  return (
    <div className="flex flex-col items-center justify-center text-center px-6 py-10 font-sans">
      <FolderOpen size={48} className="mb-4 text-gray-400" />
      <h2 className="text-lg font-semibold text-gray-700">{title}</h2>
      <p className="text-sm text-gray-500 mt-1">{message}</p>
    </div>
  );
}
