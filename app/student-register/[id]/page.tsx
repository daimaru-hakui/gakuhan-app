import NotFound from "@/app/not-found";
import { auth } from "@/auth";
import StudentRagisterContainer from "@/components/student-register/StudentRagisterContainer";
import { db } from "@/lib/firebase/server";
import { School } from "@/utils/school.interface";
import { Auth } from "firebase-admin/auth";
import { notFound, redirect } from "next/navigation";
import React from "react";
import { auth as firebaseAuth } from "@/lib/firebase/server";

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

  const { email, displayName } = await firebaseAuth.getUser(session.user.uid);
  const lastName = displayName?.split(" ")[0];
  const firstName = displayName?.split(" ")[1];

  const user = {
    email,
    lastName,
    firstName,
  };

  return (
    <div>
      <StudentRagisterContainer
        school={school}
        user={user}
      />
    </div>
  );
}
