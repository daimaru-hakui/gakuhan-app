import { auth as firebaseAuth } from "@/lib/firebase/server";
import React from "react";
import AdminList from "./AdminList";
import { auth } from "@/auth";


export default async function AdminPage() {

  const session = await auth();
  console.log(session);

  if (!session) return null;

  const user = await firebaseAuth.getUser(session?.user.uid);
  if (user.customClaims?.role !== "admin") return;

  const admin = await firebaseAuth.listUsers(100);

  const users = admin.users.map((user) => {
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
