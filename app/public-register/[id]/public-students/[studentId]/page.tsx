import PublicMesaureContainer from "@/components/public-students/PublicMeasureContainer";
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

export default async function PublicStudentPage({ params }: Props) {
  const { id, studentId } = params;

  const schoolSnap = await db.collection("schools").doc(id).get();
  const school = schoolSnap.data() as School;

  if (!school) return;
  if (!school.isPublic) return notFound();
  if (school.isDeleted) return notFound();

  const studentSnap = await db
    .collection("schools")
    .doc(id)
    .collection("public-students")
    .doc(studentId)
    .get();

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
      <PublicMesaureContainer student={student} products={products} id={id} />
    </div>
  );
}
