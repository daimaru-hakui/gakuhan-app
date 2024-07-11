"use client";
import React, { useState, useTransition } from "react";
import { Form } from "@/components/ui/form";
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
import * as actions from "@/actions";
import { School } from "@/utils/school.interface";
import { useRouter } from "next/navigation";
import { sendEmail } from "@/utils/send-email";

interface Props {
  student: Student;
  products: Product[];
  school: School;
  defaultValues: {
    name: string | undefined;
    price: number;
    size: string;
    color: string | null;
    quantity: number | undefined;
    cutLength: number | undefined;
    inseam: {
      price: number;
      base: number;
      isFlag: boolean;
    };
  }[];
  type?: string;
}

export default function MeasureForm({
  student,
  products,
  school,
  defaultValues,
  type,
}: Props) {
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState<CreateMeasureStudent>();
  const [pending, startTransition] = useTransition();
  const router = useRouter();

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

  async function handleStudentRegister(data: CreateMeasureStudent) {
    const result = confirm("登録して宜しいでしょうか");
    if (!result) return;
    startTransition(async () => {
      const { status, message } = await actions.createMeasureStudent(data, {
        schoolId: school.id,
        studentId: student.id,
      });
      if (status === "success") {
        await sendEmail(data, student, school);
        if (type === "edit") {
          router.push(`/schools/${school.id}/students`);
          return;
        }
        router.push(
          `/student-register/${school.id}/students/${student.id}/compleate`
        );
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
          id={school.id}
          studentId={student.id}
          form={form}
          totalCount={products.length}
          pending={pending}
          open={open}
          setOpen={setOpen}
          onStudentRegister={handleStudentRegister}
          data={values}
          type={type}
        />
      </form>
    </Form>
  );
}
