"use client";
import React, { useEffect } from "react";
import MenuTitle from "./MenuTitle";
import MenuList from "./MenuList";
import LogoutButton from "./LogoutButton";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase/client";
import { usePathname, useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const pattern = RegExp('(auth).*', 'g');

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user);
      } else {
        router.push("/auth/login");
      }
    });
    return () => unsub();
  }, [router]);

  return (
    <>
      {!pattern.exec(pathname) && (
        <div className="flex justify-between items-center w-full top-0 sticky h-12 border-b border-muted backdrop-blur mb-6 px-6">
          <div className="flex gap-6">
            <MenuTitle />
            <MenuList />
          </div>
          <LogoutButton />
        </div>
      )}
    </>
  );
}
