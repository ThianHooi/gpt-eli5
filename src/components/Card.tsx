import React from "react";
import { ChildrenT } from "~/types/Children";

type Props = ChildrenT;

const Card = ({ children }: Props) => {
  return (
    <div className="rounded-xl border border-fuchsia-600 bg-[#191724] p-4 mb-4 text-white">
      {children}
    </div>
  );
};

export default Card;
