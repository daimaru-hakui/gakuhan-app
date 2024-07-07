"use client";
import React from "react";
import MenuTitle from "./MenuTitle";
import { usePathname } from "next/navigation";
import MenuButton from "./MenuButton";

export default function Header() {
  const pathname = usePathname();
  const pattern = RegExp("(auth|student-register).*", "g");

  return (
    <>
      {!pattern.exec(pathname) && (
        <div className="flex justify-between items-center w-full top-0 sticky z-50 h-12 border-b border-muted backdrop-blur mb-6 px-6">
          <div className="flex gap-6">
            <MenuTitle />
            {/* <MenuList /> */}
          </div>
          <MenuButton />
        </div>
      )}
    </>
  );
}
