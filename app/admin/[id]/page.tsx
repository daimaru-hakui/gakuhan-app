import { auth } from "@/firebase/server";
import React from "react";
import AdminList from "./AdminList";

interface Props {
  params: {
    id: string;
  };
}

export default async function AdminPage({ params }: Props) {
  const uid = params.id;

  const user = await auth.getUser(uid);
  if (user.customClaims?.role !== "admin") return;

  const admin = await auth.listUsers(100);

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
      <AdminList users={users} id={uid} />
    </div>
  );
}
