import React from "react";
import { Badge } from "@/components/ui/badge";

export default function GenderBadge({
  gender,
}: {
  gender: "other" | "man" | "woman";
}) {
  switch (gender) {
    case "other":
      return <Badge variant="outline">男女兼用</Badge>;
    case "man":
      return <Badge variant="outline"className="text-blue-400 border-blue-400">男性用</Badge>;
    case "woman":
      return <Badge variant="outline" className="text-red-400 border-red-400">女性用</Badge>;
    default:
      return;
  }
}
