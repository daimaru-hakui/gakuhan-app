import React from "react";
import MeasureForm from "./MeasureForm";
import { Student } from "@/utils/student.interface";
import { Product } from "@/utils/product.interface";
import MeasureHeader from "./MeasureHeader";
import { School } from "@/utils/school.interface";
import MeasureEditForm from "./MeasureEditForm";

interface Props {
  school: School;
  student: Student;
  products: Product[];
  id: string;
}

export default function MeasureEditContainer({
  school,
  student,
  products,
  id,
}: Props) {
  return (
    <div className="max-w-[650px] mx-auto mb-12">
      <MeasureHeader id={id} studentId={student.id} />
      <MeasureEditForm student={student} products={products} id={school.id} />
    </div>
  );
}