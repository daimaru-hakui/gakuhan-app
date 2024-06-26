import React from "react";
import { LuLoader2 } from "react-icons/lu";

export default function LoaderIcon() {
  return (
    <div className="flex justify-center items-center">
      <LuLoader2 className="mr-2 h-6 w-6 animate-spin text-primary" />
    </div>
  );
}