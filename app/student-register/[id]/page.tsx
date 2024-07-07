import NotFound from "@/app/not-found";
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
  if (!session) return <NotFound />;

  const schoolSnap = await db.collection("schools").doc(id).get();
  if (!schoolSnap.exists) return notFound();
  const schoolRaw = JSON.stringify({ ...schoolSnap.data(), id: schoolSnap.id });
  const school = JSON.parse(schoolRaw) as School;

  if (!school.isPublic || school.isDeleted) return notFound();

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
      <StudentRagisterContainer school={school} />
    </div>
  );
}
