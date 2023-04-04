import React from "react";
import LoadingSpinnerIcon from "./LoadingSpinnerIcon";

type Props = {
  loading?: boolean;
};

const ConfirmButton = ({ loading = false }: Props) => {
  return (
    <button
      type="submit"
      disabled={loading}
      className="hover:bg-fuchsia-300 w-full cursor-pointer items-center gap-4 rounded-xl bg-fuchsia-600 p-4 font-semibold text-slate-800 transition-colors duration-500 hover:no-underline hover:shadow hover:shadow-[#300171] md:px-5 md:text-base"
    >
      <div className="flex items-center justify-center">
        {loading && (
          <>
            <LoadingSpinnerIcon />
            <span>loading...</span>
          </>
        )}
        {!loading && <span>Explain</span>}
      </div>
    </button>
  );
};

export default ConfirmButton;
