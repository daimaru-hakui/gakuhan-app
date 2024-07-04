import Link from "next/link";
import React from "react";

export default function MenuTitle() {
  return (
    <Link href={`/schools`}>
      <div>Gakuhan App</div>
    </Link>
  );
}
