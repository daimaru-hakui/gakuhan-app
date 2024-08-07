import React from "react";
import { db, auth as firebaseAuth } from "@/lib/firebase/server";
import { notFound } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { auth } from "@/auth";
import MyPageCard from "@/components/mypage/MyPageCard";

export default async function MyPage() {
  const session = await auth();
  if (!session) return;

  const profile = {
    displayName: "",
    email: "",
  };

  try {
    const { displayName, email } = await firebaseAuth.getUser(session.user.uid);
    profile.displayName = displayName || "";
    profile.email = email || "";
  } catch (e) {
    return notFound();
  }

  const userSnap = await db.collection("users").doc(session.user.uid).get();
  if (!userSnap.exists) return notFound();

  interface User {
    id: string;
    schools: {
      id: string;
      schoolName: string;
    }[];
  }

  const user = { ...userSnap.data() } as User;
  const schools = user.schools || [];

  return (
    <section className="w-full max-w-[600px] mx-auto p-6">
      <div className="border rounded-md p-6 space-y-6">
        <h1 className="text-xl font-semibold">マイページ</h1>
        <div className="space-y-1">
          <div className="mt-6 flex items-center gap-3">
            <div className="text-sm">名前</div>
            <div className="text-lg">{profile.displayName} 様</div>
          </div>
          <div className="mt-6 flex items-center gap-3">
            <div className="text-sm">Email</div>
            <div className="text-lg">{profile.email} </div>
          </div>
        </div>
        <Separator />
        {schools.map((school) => (
          <MyPageCard
            key={school.id}
            school={school}
            uid={session.user.uid}
          />
        ))}
      </div>
    </section>
  );
}
