import React from "react";
import { LuLoader2 } from "react-icons/lu";

export default function loading() {
  return (
    <div className="w-full h-screen flex justify-center items-center fixed">
      <LuLoader2 className="mr-2 h-4 w-4 animate-spin text-muted" />
    </div>
  );
}
