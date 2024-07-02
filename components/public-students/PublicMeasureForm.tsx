"use client";
import React, { useTransition } from "react";
import { Form } from "../ui/form";
import { useForm } from "react-hook-form";
import { Student } from "@/utils/student.interface";
import { Product } from "@/utils/product.interface";
import PublicMeasureCard from "./PublicMeasureCard";
import {
  CreateMeasureStudent,
  CreateMeasureStudentSchema,
} from "@/utils/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import PublicMeasureButtonArea from "./PublicMeasureButtonArea";
import { doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/client";
import { toast } from "sonner";

interface Props {
  student: Student;
  products: Product[];
  id: string;
}

export default function PublicMeasureForm({ student, products, id }: Props) {
  const [pending, startTransition] = useTransition();
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
      cutLength = item?.inseam.isFlag ? "" : 0;
    } else {
      cutLength = "";
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
      inseam: {
        price: inseam.price,
        base: inseam.base,
        isFlag: inseam.isFlag,
      },
    };
  });
  const form = useForm<CreateMeasureStudent>({
    resolver: zodResolver(CreateMeasureStudentSchema),
    defaultValues: { products: defaultValues },
  });

  async function onSubmit(data: CreateMeasureStudent) {
    startTransition(async () => {
      const { status, message } = await updateStudent(data);
      if (status === "success") {
        toast.success(message);
      } else {
        toast.error(message);
      }
    });
  }

  function onError(data: any) {
    console.log(data);
  }

  async function updateStudent(data: CreateMeasureStudent) {
    const studentRef = doc(db, "schools", id, "public-students", student.id);
    try {
      await updateDoc(studentRef, {
        products: { ...data.products },
        finishedAt: serverTimestamp(),
      });
      return {
        status: "success",
        message: "登録しました。",
      };
    } catch (e) {
      return {
        status: "error",
        message: "登録に失敗しました。",
      };
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, onError)}
        className="relative"
      >
        <div className="grid grid-cols-1 gap-6 px-3">
          {products.map((product, index) => (
            <PublicMeasureCard
              key={product.id}
              product={product}
              form={form}
              index={index}
            />
          ))}
        </div>
        <PublicMeasureButtonArea
          form={form}
          totalCount={products.length}
          pending={pending}
        />
      </form>
    </Form>
  );
}
