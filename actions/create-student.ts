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
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createStudent(
  data: CreateStudent,
  school: School
): Promise<{ status: string; message: string; id?: string }> {
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
    console.log(result);
    await snapshot.set({
      ...result,
      schoolId: session.user.uid,
      startedAt: FieldValue.serverTimestamp(),
      finishedAt: null,
      isDeleted: false,
      schoolName: school.title,
      studentId: session.user.uid,
    });
  } catch (e: unknown) {
    console.log(e);
    return {
      status: "error",
      message: e instanceof Error ? e.message : "登録が失敗しました",
    };
  }
  // revalidatePath("/student-register");
  return {
    status: "success",
    message: "",
    id: session.user.uid,
  };
  // redirect(`/student-register/${school.id}/students/${session.user.uid}`);
}
