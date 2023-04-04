import React from "react";
import LoadingSpinnerIcon from "./LoadingSpinnerIcon";

const LoadingButton = () => {
  return (
    <div className="w-full cursor-pointer items-center gap-4 rounded-xl bg-fuchsia-600 p-4 font-semibold text-slate-800 transition-colors duration-500 hover:bg-fuchsia-300 hover:no-underline hover:shadow hover:shadow-[#300171] md:px-5 md:text-base">
      <div className="flex items-center justify-center">
        <LoadingSpinnerIcon />
        <span>loading...</span>
      </div>
    </div>
  );
};

export default LoadingButton;
