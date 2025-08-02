import React from "react";
import { CaretLeft, MagnifyingGlass } from "@phosphor-icons/react";

const TopNav = React.forwardRef(function TopNav(
  { title = "", onBack, onSearch, borderBottom, rightIcon, onRightClick },
  ref
) {
  return (
    <div
      ref={ref}
      className={`navbar flex items-center justify-between bg-white px-4 fixed top-0 left-0 right-0 z-30 h-11 font-sans
    ${borderBottom !== false ? "border-b border-gray-200" : ""}`}
    >
      {typeof onBack === "function" ? (
        <button
          className="flex items-center justify-center system-color"
          aria-label="Back"
          onClick={onBack}
        >
          <CaretLeft className="system-color text-2xl" />
        </button>
      ) : (
        <span className="w-11 h-11" /> // empty space for alignment
      )}
      <h2 className="nav-title flex-1 text-center system-section-heading m-0 leading-none">
        {title}
      </h2>
      {rightIcon === null ? (
        <span className="w-11 h-11" /> // empty space for alignment
      ) : (
        <button
          className="flex items-center justify-center"
          aria-label={rightIcon ? "Settings" : "Search"}
          onClick={rightIcon ? onRightClick : onSearch}
        >
          {rightIcon ? (
            rightIcon
          ) : (
            <MagnifyingGlass className="text-2xl system-color" />
          )}
        </button>
      )}
    </div>
  );
});
export default TopNav;
