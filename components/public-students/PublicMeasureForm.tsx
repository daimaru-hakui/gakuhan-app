"use client";
import React from "react";
import { Form } from "../ui/form";
import { useForm } from "react-hook-form";
import { FormInput } from "../form/FormInput";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Student } from "@/utils/student.interface";
import { Product } from "@/utils/product.interface";
import Image from "next/image";
import PublicMeasureCard from "./PublicMeasureCard";

interface Props {
  student: Student;
  products: Product[];
}

export default function PublicMeasureForm({ student, products }: Props) {
  const form = useForm();
  console.log(student);
  console.log(products);
  return (
    <Form {...form}>
      <form>
        <div className="grid grid-cols-1 gap-6">
          {products.map((product) => (
            <PublicMeasureCard key={product.id} product={product} />
          ))}
        </div>
      </form>
    </Form>
  );
}
