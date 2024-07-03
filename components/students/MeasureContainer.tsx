import React from "react";
import MeasureForm from "./MeasureForm";
import { Student } from "@/utils/student.interface";
import { Product } from "@/utils/product.interface";
import MeasureHeader from "./MeasureHeader";
import { School } from "@/utils/school.interface";

interface Props {
  school: School;
  student: Student;
  products: Product[];
  id: string;
}

export default function MeasureContainer({
  school,
  student,
  products,
  id,
}: Props) {
  return (
    <div className="max-w-[650px] mx-auto mb-12">
      <MeasureHeader id={id} studentId={student.id} />
      <MeasureForm student={student} products={products} school={school} />
    </div>
  );
}
