import react from "react";
import { SealCheck } from "@phosphor-icons/react"; // <-- import DotsThree

export default function BottomSection() {
  return (
    <nav>
      <div className="absolute bottom-[9rem] left-4 right-20 z-40 flex flex-col space-y-4 font-sans">
        <div className="username-section max-w-[80%]">
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-white font-semibold text-sm align-middle">
              sarah_adventures
            </span>
            <SealCheck
              className="text-indigo-500  relative top-[2px]"
              weight="fill"
            />
            <span className="text-white/80 text-sm">2d</span>
          </div>

          <div className="caption">
            <p className="text-white text-sm leading-relaxed">
              Living my best life on this incredible mountain adventure!
            </p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-[7rem] left-0 right-0 flex  justify-between items-center px-4  w-full max-w-sm">
        <div className="flex items-center space-x-2 flex-1">
          <div className="text-white/80">
            <p className="text-sm truncate">Weekend - Fatty Wap</p>
          </div>
        </div>
      </div>
    </nav>
  );
}
