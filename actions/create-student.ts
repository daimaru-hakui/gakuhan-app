"use server";
import { auth } from "@/auth";
import { db } from "@/lib/firebase/server";
import {
  CreateStudent,
  CreateStudentSchema,
  validateWithZodSchema,
} from "@/utils/schemas";
import { School } from "@/utils/school.interface";
import { FieldValue } from "firebase-admin/firestore";
import { redirect } from "next/navigation";

export async function createStudent(
  data: CreateStudent,
  school: School
): Promise<{ status: string; message: string }> {
  const id = school.id;
  const session = await auth();
  try {
    const result = validateWithZodSchema(CreateStudentSchema, data);

    if (!session) {
      throw new Error("認証に失敗しました");
    }

    const snapshot = db
      .collection("schools")
      .doc(id)
      .collection("students")
      .doc(session.user.uid);

    await snapshot.set({
      ...result,
      schoolId: session.user.uid,
      startedAt: FieldValue.serverTimestamp(),
      finishedAt: null,
      isDeleted: false,
      schoolName: school.title,
      studentId: session.user.uid,
    });

    const userRef = db.collection("users").doc(session.user.uid);
    userRef.update({
      schools: FieldValue.arrayUnion({
        id: school.id,
        schoolName: school.title,
      }),
      name: result.lastName + " " + result.firstName,
      email: result.email || null,
    });
  } catch (e: unknown) {
    console.log(e);
    return {
      status: "error",
      message: e instanceof Error ? e.message : "登録が失敗しました",
    };
  }
  redirect(`/student-register/${id}/students/${session.user.uid}`);
}
