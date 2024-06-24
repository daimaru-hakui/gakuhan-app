import React from "react";
import MenuItem from "./MenuItem";
import { useStore } from "@/store";

export default function MenuList() {
  const user = useStore((state) => state.user);
  return (
    <ul className="flex items-center gap-6">
      <MenuItem href="/schools">学校一覧</MenuItem>
      <MenuItem href="/">home</MenuItem>
      <MenuItem href={`/admin/${user?.uid}`}>admin</MenuItem>
    </ul>
  );
}
