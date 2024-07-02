import SchoolDashboardContainer from "@/components/dashboard/SchoolDashboardContainer";
import { db } from "@/lib/firebase/server";
import { Product } from "@/utils/product.interface";
import { School } from "@/utils/school.interface";
import { Student } from "@/utils/student.interface";
import React from "react";

interface Props {
  params: {
    id: string;
  };
}

export default async function SchoolDashboardPage({ params }: Props) {
  const { id } = params;

  const snapshot = await db
    .collection("schools")
    .doc(id)
    .collection("products")
    .get();
  const products = snapshot.docs.map(
    (doc) => ({ ...doc.data(), id: doc.id } as Product)
  );
  const schoolSnap = await db.collection("schools").doc(id).get();
  const school = schoolSnap.data() as School;

  if (!products) return;
  const other = products.filter((product) => product.gender === "other");

  const man = products.filter(
    (product) => product.gender === "other" || product.gender === "man"
  );
  const woman = products.filter(
    (product) => product.gender === "other" || product.gender === "woman"
  );

  let count = 0;
  if (school.isGender) {
    count = Math.max(man.length, woman.length);
  } else {
    count = other.length;
  }

  return (
    <div className="w-full">
      <SchoolDashboardContainer id={id} count={count} />
    </div>
  );
}
