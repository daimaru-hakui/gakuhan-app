import NotFound from "@/app/not-found";
import { auth } from "@/auth";
import MesaureContainer from "@/components/students/MeasureContainer";
import { db } from "@/lib/firebase/server";
import { Product } from "@/utils/product.interface";
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

export default async function StudentPage({ params }: Props) {
  const { id, studentId } = params;

  const session = await auth();
  if (!session) return <NotFound />;

  const schoolSnap = await db.collection("schools").doc(id).get();
  const school = schoolSnap.data() as School;

  if (!school) return;
  if (!school.isPublic) return notFound();
  if (school.isDeleted) return notFound();

  const studentSnap = await db
    .collection("schools")
    .doc(id)
    .collection("students")
    .doc(studentId)
    .get();

  if (!studentSnap.exists) return <NotFound />;

  const studentRaw = { ...studentSnap.data(), id: studentSnap.id } as Student;
  const studentData = JSON.stringify(studentRaw);
  const student = JSON.parse(studentData) as Student;

  const productsSnap = await db
    .collection("schools")
    .doc(id)
    .collection("products")
    .get();

  const productsRaw = productsSnap.docs.map(
    (doc) => ({ ...doc.data(), id: doc.id } as Product)
  );

  const filterProductsRow = productsRaw.filter(
    (product) => product.gender === "other" || product.gender === student.gender
  );

  const productsData = JSON.stringify(filterProductsRow);
  const products = JSON.parse(productsData) as Product[];

  return (
    <div className="w-full">
      <MesaureContainer student={student} products={products} id={id} />
    </div>
  );
}
