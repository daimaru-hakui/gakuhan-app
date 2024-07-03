"use client";
import {
  CreateMeasureStudent,
  CreateMeasureStudentSchema,
} from "@/utils/schemas";
import React, { useState, useTransition } from "react";
import { Form } from "../ui/form";
import MeasureConfirm from "./MeasureConfirm";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Student } from "@/utils/student.interface";
import { Product } from "@/utils/product.interface";
import MeasureCard from "./MeasureCard";

interface Props {
  student: Student;
  products: Product[];
  id: string;
}

export default function MeasureEditForm({ student, products, id }: Props) {
  const [open, setOpen] = useState(false);

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

  const [values, setValues] = useState<CreateMeasureStudent>();
  const [pending, startTransition] = useTransition();

  const form = useForm<CreateMeasureStudent>({
    resolver: zodResolver(CreateMeasureStudentSchema),
    defaultValues:{products:defaultValues}
  });

  async function onSubmit(data: CreateMeasureStudent) {
    setOpen(true);
    setValues(data);
    console.log(data);
  }

  function onError(data: any) {
    console.log(data);
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
          <MeasureConfirm values={values} />
        )}
        {/* <MeasureButtonArea
          form={form}
          totalCount={products.length}
          pending={pending}
          open={open}
          setOpen={setOpen}
        //   onStudentRegister={handleClickRegister}
          data={values}
        /> */}
      </form>
    </Form>
  );
}
