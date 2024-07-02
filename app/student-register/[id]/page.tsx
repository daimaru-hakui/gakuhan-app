import { auth } from "@/auth";
import StudentRagisterContainer from "@/components/student-register/StudentRagisterContainer";
import { db } from "@/lib/firebase/server";
import { School } from "@/utils/school.interface";
import { notFound, redirect } from "next/navigation";
import React from "react";

interface Props {
  params: {
    id: string;
  };
}

export default async function StudentRegisterPage({ params }: Props) {
  const { id } = params;
  const session = await auth();
  const snapshot = await db.collection("schools").doc(id).get();
  const rawData = { ...snapshot.data(), id: snapshot.id } as School;
  const JsonData = JSON.stringify(rawData);
  const school = JSON.parse(JsonData) as School;

  if (!school) return;
  if (!school.isPublic) return notFound();
  if (school.isDeleted) return notFound();
  if (!session) return;

  const studentSnap = await db
    .collection("schools")
    .doc(id)
    .collection("students")
    .doc(session.user.uid)
    .get();

  if (studentSnap.exists) {
    redirect(`/student-register/${id}/students/${session.user.uid}`);
  }

  return (
    <div>
      <StudentRagisterContainer id={school.id} />
    </div>
  );
}
