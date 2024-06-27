"use client";
import React from "react";
import { Form } from "../ui/form";
import { useForm } from "react-hook-form";
import { FormInput } from "../form/FormInput";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Student } from "@/utils/student.interface";

interface Props {
  student: Student;
}

export default function PublicMeasureForm({ student }: Props) {
  const form = useForm();
  console.log(student)
  return (
    <Form {...form}>
      <form>
        <Card>
          <CardHeader>
            <CardTitle></CardTitle>
          </CardHeader>
          <CardContent>
            <FormInput
              form={form}
              name="studentNumber"
              label="学籍番号"
              require
            />
          </CardContent>
        </Card>
      </form>
    </Form>
  );
}
