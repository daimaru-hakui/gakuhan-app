"use server";

import { redirect } from "next/navigation";

export async function createPayment({
  schoolId,
  studentId,
}: {
  schoolId: string;
  studentId: string;
}) {
  redirect(`/checkout?schoolId=${schoolId}&studentId=${studentId}`);
}
