import React from "react";
import MenuItem from "./MenuItem";

export default function MenuList() {
  return (
    <ul className="flex items-center gap-6">
      <MenuItem href="/schools">学校一覧</MenuItem>
      <MenuItem href={`/admin`}>権限管理</MenuItem>
    </ul>
  );
}
