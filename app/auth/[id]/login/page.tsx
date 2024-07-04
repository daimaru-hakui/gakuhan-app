import React from "react";
import AnonymousLoginForm from "./AnonymousLoginForm";
import { auth } from "@/auth";
import { notFound, redirect } from "next/navigation";
import { db } from "@/lib/firebase/server";
import { School } from "@/utils/school.interface";

interface Props {
  params: {
    id: string;
  };
}

export default async function AnoonymousLoginPage({ params }: Props) {
  const { id } = params;

  const schoolSnap = await db.collection("schools").doc(id).get();
  const schoolRaw = JSON.stringify(schoolSnap.data());
  const school = JSON.parse(schoolRaw) as School;

  if (!school) return;
  if (!school.isPublic) return notFound();
  if (school.isDeleted) return notFound();

  const session = await auth();
  if (session) {
    redirect(`/student-register/${id}`);
  }

  return (
    <div className="w-full flex justify-center items-center min-h-[100vh]">
      <AnonymousLoginForm id={id} school={school} />
    </div>
  );
}
