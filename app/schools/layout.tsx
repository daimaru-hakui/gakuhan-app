// "use client";
import React from "react";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/auth";

export default async function SchoolsLauout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session) {
    redirect(`/auth/login`);
  }
  if (session.user.role === "user" || !session.user.role ) {
    return notFound()
  }

  return (
    <div className="w-full min-h-[100vh-3rem] flex justify-center items-center">
      {children}
    </div>
  );
}
