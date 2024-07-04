import { cn } from "@/lib/utils";
import React from "react";
import { LuLoader2 } from "react-icons/lu";

interface Props {
  className?: string;
}

export default function LoaderIcon({ className }: Props) {
  return (
    <div className="flex justify-center items-center">
      <LuLoader2
        className={cn("mr-2 h-6 w-6 animate-spin text-primary", className)}
      />
    </div>
  );
}
