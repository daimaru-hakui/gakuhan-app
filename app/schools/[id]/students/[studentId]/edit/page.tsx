import NotFound from "@/app/not-found";
import { auth } from "@/auth";
import { db } from "@/lib/firebase/server";
import { Product } from "@/utils/product.interface";
import { School } from "@/utils/school.interface";
import { Student } from "@/utils/student.interface";
import { notFound } from "next/navigation";
import MeasureEditContainer from "@/components/student-register/MeasureEditContainer";

interface Props {
  params: {
    id: string;
    studentId: string;
  };
}

export default async function StudentEditPage({ params }: Props) {
  const { id, studentId } = params;

  const session = await auth();
  if (!session) return <NotFound />;

  const schoolSnap = await db.collection("schools").doc(id).get();
  const schoolRaw = JSON.stringify({ ...schoolSnap.data(), id: schoolSnap.id });
  const school = JSON.parse(schoolRaw) as School;

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

  const studentRaw = JSON.stringify({
    ...studentSnap.data(),
    id: studentSnap.id,
  });
  const student = JSON.parse(studentRaw) as Student;

  const productsSnap = await db
    .collection("schools")
    .doc(id)
    .collection("products")
    .get();

  const filterProductsSnap = productsSnap.docs
    .map((doc) => ({ ...doc.data(), id: doc.id } as Product))
    .filter(
      (product) =>
        product.gender === "other" || product.gender === student.gender
    );

  const productsRaw = JSON.stringify(filterProductsSnap);
  const products = JSON.parse(productsRaw) as Product[];

  return (
    <div className="w-full">
      <MeasureEditContainer
        id={id}
        school={school}
        products={products}
        student={student}
      />
    </div>
  );
}
