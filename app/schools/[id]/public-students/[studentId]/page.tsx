import PublicMesaureContainer from "@/components/public-students/PublicMeasureContainer";
import { db } from "@/firebase/server";
import { School } from "@/utils/school.interface";
import { Student } from "@/utils/student.interface";
import { notFound } from "next/navigation";
import React from "react";

interface Props {
  params: {
    id: string;
    studentId: string;
  };
}

export default async function PublicStudentPage({ params }: Props) {
  const { id, studentId } = params;

  const schoolSnap = await db.collection("schools").doc(id).get();
  const school = schoolSnap.data() as School;

  const snapshot = await db
    .collection("schools")
    .doc(id)
    .collection("public-students")
    .doc(studentId)
    .get();

  const rawData = { ...snapshot.data(), id: snapshot.id } as Student;
  const JsonData = JSON.stringify(rawData);
  const student = JSON.parse(JsonData) as Student;

  if (!school) return;
  if (!school.isPublic) return notFound();
  if (school.isDeleted) return notFound();

  return (
    <div className="w-full">
      <PublicMesaureContainer student={student} />
    </div>
  );
}
