import NotFound from "@/app/not-found";
import { auth } from "@/auth";
import { db } from "@/lib/firebase/server";
import { Product } from "@/utils/product.interface";
import { School } from "@/utils/school.interface";
import { Student } from "@/utils/student.interface";
import { notFound } from "next/navigation";
import MeasureContainer from "@/components/student-register/MeasureContainer";

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

  if (session.user.uid !== studentId) notFound();

  const schoolSnap = await db.collection("schools").doc(id).get();
  if (!schoolSnap.exists) return notFound();
  const schoolRaw = JSON.stringify({ ...schoolSnap.data(), id: schoolSnap.id });
  const school = JSON.parse(schoolRaw) as School;

  if (!school.isPublic || school.isDeleted) return notFound();

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
  if (student.finishedAt) return <NotFound />;

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
    )
    .sort((a, b) => {
      if (a.sortNum < b.sortNum) {
        return -1;
      } else {
        return 1;
      }
    });

  const productsRaw = JSON.stringify(filterProductsSnap);
  const products = JSON.parse(productsRaw) as Product[];

  return (
    <div className="w-full">
      <MeasureContainer
        id={id}
        school={school}
        products={products}
        student={student}
      />
    </div>
  );
}
