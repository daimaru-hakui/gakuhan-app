import React from "react";
import { Student } from "@/utils/student.interface";
import { Product } from "@/utils/product.interface";
import MeasureHeader from "../MeasureHeader";
import { School } from "@/utils/school.interface";
import MeasureForm from "../MeasureForm";

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
  const defaultValues = student.products.map((product) => {
    return {
      name: product?.name,
      price: product?.price,
      size: product?.size,
      color: product?.color,
      quantity: product.quantity,
      cutLength: product.cutLength,
      inseam: {
        price: product.inseam.price,
        base: product.inseam.base,
        isFlag: false,
      },
    };
  });

  return (
    <div className="max-w-[650px] mx-auto mb-14">
      <MeasureHeader id={id} studentId={student.id} />
      <MeasureForm
        student={student}
        products={products}
        school={school}
        defaultValues={defaultValues}
        type="edit"
      />
    </div>
  );
}
