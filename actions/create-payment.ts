"use server";

import { auth } from "@/auth";
import { db } from "@/lib/firebase/server";
import { Student } from "@/utils/student.interface";
import { redirect } from "next/navigation";

export async function createPayment({
  schoolId,
  studentId,
}: {
  schoolId: string;
  studentId: string;
}) {
  const session = await auth();
  if (!session) {
    redirect("/mypage");
  }

  const studentRef = db
    .collection("schools")
    .doc(schoolId)
    .collection("students")
    .doc(studentId);
  const studentSnap = await studentRef.get();
  if (!studentSnap.exists) {
    redirect("/mypate");
  }
  const student = studentSnap.data() as Student;
  if (student.paymentStatus) {
    redirect("/mypage");
  }

  redirect(`/checkout?schoolId=${schoolId}&studentId=${studentId}`);
}
