"use client";
import { Button } from "@/components/ui/button";
import { auth } from "@/firebase/client";
import React from "react";

export default function LogoutButton() {
  async function handleLogout() {
    await auth.signOut();
  }

  return (
    <Button size="sm" variant="outline" onClick={handleLogout}>
      ログアウト
    </Button>
  );
}
