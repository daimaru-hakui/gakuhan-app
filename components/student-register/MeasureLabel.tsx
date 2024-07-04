import { cn } from "@/lib/utils";
import React from "react";

interface Props {
  property: string | number;
  text: string;
  unit?: string;
}

export default function MeasureLabel({ property, text, unit = "" }: Props) {
  const type = typeof property === "string" ? "string" : "number";
  return (
    <>
      <div
        className={cn(
          "border font-semibold text-xs p-1",
          property || property === 0 ? "bg-primary text-muted" : ""
        )}
      >
        {type === "string"
          ? property
            ? `${property} ${unit}`
            : text + "未選択"
            
          : property
          ? `${property} ${unit}`
          : property === 0
          ? text + "不要"
          : text + "未選択"}
      </div>
    </>
  );
}
