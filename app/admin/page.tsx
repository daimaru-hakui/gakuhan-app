import { auth as firebaseAuth } from "@/lib/firebase/server";
import React from "react";
import AdminList from "./AdminList";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function AdminPage() {
  const session = await auth();

  if (!session) {
    redirect("/auth/login");
  }

  const user = await firebaseAuth.getUser(session?.user.uid);
  if (user.customClaims?.role !== "admin") {
    return <div className="flex justify-center w-full">権限がありません。</div>;
  }

  const admin = await firebaseAuth.listUsers(100);

  const users = admin.users
    .filter((user) => {
      return user.email;
    })
    .map((user) => {
      return {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || "",
        role: user.customClaims?.role as "admin" | "user" | "member",
      };
    });

  return (
    <div className="flex justify-center w-full">
      <AdminList users={users} id={session.user.uid} />
    </div>
  );
}
