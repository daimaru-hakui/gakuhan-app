import React from "react";
import PublicMeasureForm from "./PublicMeasureForm";
import { Student } from "@/utils/student.interface";
import { Product } from "@/utils/product.interface";

interface Props {
  student: Student;
  products: Product[];
  id: string;
}

export default function PublicMeasureContainer({
  student,
  products,
  id,
}: Props) {
  return (
    <div className="max-w-[650px] mx-auto mb-24">
      <PublicMeasureForm student={student} products={products} id={id} />
    </div>
  );
}
