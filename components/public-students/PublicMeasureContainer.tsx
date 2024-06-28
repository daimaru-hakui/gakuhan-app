import React from "react";
import PublicMeasureForm from "./PublicMeasureForm";
import { Student } from "@/utils/student.interface";
import { Product } from "@/utils/product.interface";

interface Props {
  student: Student;
  products: Product[];
}

export default function PublicMeasureContainer({ student, products }: Props) {
  return (
    <div className="max-w-[650px] mx-auto mb-6">
      <PublicMeasureForm student={student} products={products} />
    </div>
  );
}
