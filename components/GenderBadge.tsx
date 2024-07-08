import React from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export default function GenderBadge({
  gender,
  className,
}: {
  gender: "other" | "man" | "woman";
  className?: string;
}) {
  switch (gender) {
    case "other":
      return (
        <Badge variant="outline" className={className}>
          男女兼用
        </Badge>
      );
    case "man":
      return (
        <Badge
          variant="outline"
          className={cn("text-blue-400 border-blue-400", className)}
        >
          男性用
        </Badge>
      );
    case "woman":
      return (
        <Badge
          variant="outline"
          className={cn("text-red-400 border-red-400", className)}
        >
          女性用
        </Badge>
      );
    default:
      return;
  }
}
