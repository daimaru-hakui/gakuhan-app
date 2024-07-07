"use client";
import React, { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase/client";
import { usePathname, useRouter } from "next/navigation";
import { useStore } from "@/store";

export default function SchoolsLauout({ children }: { children: React.ReactNode; }) {
  const router = useRouter();
  const pathname = usePathname();
  const pattern = RegExp("(auth|student-register).*", "g");
  const setUser = useStore((state) => state.setUser);

  useEffect(() => {
    if (pattern.exec(pathname)) return;
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        router.push("/auth/login");
        setUser(null);
      }
    });
    return () => unsub();
  }, [router, setUser, pathname, pattern]);
  return (
    <div className="w-full min-h-[100vh-3rem] flex justify-center items-center">{children}</div>
  );
}