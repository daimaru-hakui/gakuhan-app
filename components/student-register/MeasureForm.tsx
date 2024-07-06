"use client";
import React, { useState, useTransition } from "react";
import { Form } from "../ui/form";
import { useForm } from "react-hook-form";
import { Student } from "@/utils/student.interface";
import { Product } from "@/utils/product.interface";
import {
  CreateMeasureStudent,
  CreateMeasureStudentSchema,
} from "@/utils/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import MeasureButtonArea from "./MeasureButtonArea";
import { toast } from "sonner";
import MeasureConfirm from "./MeasureConfirm";
import MeasureCard from "./MeasureCard";
import * as actions from '@/actions';
import { School } from "@/utils/school.interface";
import { useRouter } from "next/navigation";
import { sendEmail } from "@/utils/send-email";
import { calcTotalPrice } from "@/utils/calc";

interface Props {
  student: Student;
  products: Product[];
  school: School;
}

export default function MeasureForm({ student, products, school }: Props) {
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState<CreateMeasureStudent>();
  const [pending, startTransition] = useTransition();
  const router = useRouter();
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

  const form = useForm<CreateMeasureStudent>({
    resolver: zodResolver(CreateMeasureStudentSchema),
    defaultValues: { products: defaultValues },
  });

  async function onSubmit(data: CreateMeasureStudent) {
    setOpen(true);
    setValues(data);
    console.log(data);
  }

  function onError(data: any) {
    console.log(data);
  }

  async function handleClickRegister(data: CreateMeasureStudent) {
    const result = confirm("登録して宜しいでしょうか");
    if (!result) return;
    startTransition(async () => {
      const { status, message } =
        await actions.createMeasureStudent(
          data, { schoolId: school.id, studentId: student.id });
      if (status === "success") {
        await sendEmail(data, student, school);
        router.push(`/student-register/{schoolId}/students/${student.id}/compleate`);
      } else {
        toast.error(message);
      }
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, onError)}
        className="relative"
      >
        {!open ? (
          <>
            <div className="grid grid-cols-1 gap-6">
              {products.map((product, index) => (
                <MeasureCard
                  key={product.id}
                  product={product}
                  form={form}
                  index={index}
                />
              ))}
            </div>
          </>
        ) : (
          <MeasureConfirm values={values} school={school} />
        )}
        <MeasureButtonArea
          form={form}
          totalCount={products.length}
          pending={pending}
          open={open}
          setOpen={setOpen}
          onStudentRegister={handleClickRegister}
          data={values}
        />
      </form>
    </Form>
  );
}
