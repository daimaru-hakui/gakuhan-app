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
  const defaultValues = products.map((product) => {
    const oneItem = product.items.length === 1;
    const item = product.items.at(0);

    // サイズ
    let size;
    if (oneItem) {
      switch (item?.size.length) {
        case 0:
          size = "F";
          break;
        case 1:
          size = item.size.join();
          break;
        default:
          size = "";
      }
    } else {
      size = "";
    }

    // カラー
    let color;
    if (oneItem) {
      switch (item?.color.length) {
        case 0:
          color = null;
          break;
        case 1:
          color = item.color.join();
          break;
        default:
          color = "";
      }
    } else {
      color = "";
    }

    // スソ上げ
    let cutLength;
    if (oneItem) {
      cutLength = item?.inseam.isFlag ? undefined : 0;
    } else {
      cutLength = undefined;
    }

    const inseam = {
      price: 0,
      base: 0,
      isFlag: false,
    };

    if (oneItem) {
      inseam.price = item?.inseam.isFlag ? item.inseam.price : 0;
      inseam.base = item?.inseam.isFlag ? item.inseam.base : 0;
      inseam.isFlag = item?.inseam.isFlag ? true : false;
    } else {
      inseam.price = 0;
      inseam.base = 0;
      inseam.isFlag = product.items.some((item) => item.inseam.isFlag);
    }

    let quantity;
    if (product.quantity.min === product.quantity.max) {
      quantity = product.quantity.min;
    }

    return {
      name: oneItem ? item?.name : "",
      price: oneItem ? item?.price || 0 : 0,
      size,
      color,
      quantity,
      cutLength,
      inseam: {
        price: inseam.price,
        base: inseam.base,
        isFlag: inseam.isFlag,
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
      />
    </div>
  );
}
