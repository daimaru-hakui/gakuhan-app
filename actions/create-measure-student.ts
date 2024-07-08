"use server";
import { auth } from "@/auth";
import { db } from "@/lib/firebase/server";
import {
  CreateMeasureStudent,
  CreateMeasureStudentSchema,
  validateWithZodSchema
} from "@/utils/schemas";
import { FieldValue } from "firebase-admin/firestore";

export async function createMeasureStudent(
  data: CreateMeasureStudent,
  { schoolId, studentId }: { schoolId: string, studentId: string; }
): Promise<{ status: string; message: string; }> {
  const session = await auth();

  try {
    const result = validateWithZodSchema(CreateMeasureStudentSchema, data);

    if (!session) {
      throw new Error("認証に失敗しました");
    }

    const snapshot = db
      .collection('schools')
      .doc(schoolId)
      .collection('students')
      .doc(studentId);


    await snapshot.update({
      products: result.products,
      finishedAt: FieldValue.serverTimestamp()
    });
    return {
      status: "success",
      message: "登録に成功しました"
    };
  } catch (e: unknown) {
    return {
      status: "error",
      message: e instanceof Error ? e.message : "登録に失敗しました"
    };
  }
}