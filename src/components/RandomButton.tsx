import React from "react";
import LoadingSpinnerIcon from "./LoadingSpinnerIcon";

type Props = {
  loading?: boolean;
  onClick?: () => void;
};

const RandomButton = ({ loading = false, onClick }: Props) => {
  return (
    <button
      disabled={loading}
      type="button"
      className={`w-full gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-25`}
      onClick={onClick}
    >
      <div className="flex items-center justify-center">
        {loading && (
          <>
            <LoadingSpinnerIcon />
            <span>loading...</span>
          </>
        )}
        {!loading && <span>Get random topic</span>}
      </div>
    </button>
  );
};

export default RandomButton;
