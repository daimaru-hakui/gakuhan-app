'use client';
import { SubmitRhkButton } from "@/components/form/Buttons";
import FormCalendarInput from "@/components/form/FormCalendarInput";
import { FormInput } from "@/components/form/FormInput";
import TextAreaInput from "@/components/form/TextAreaInput";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { SchoolCreate, SchoolCreateSchema } from "@/utils/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export default function SchoolCreateForm() {
  const form = useForm<SchoolCreate>({
    resolver: zodResolver(SchoolCreateSchema),
    defaultValues: {
      title: "",
      scheduledDate: new Date(),
      description: ""
    }
  });

  const onSubmit = (data: SchoolCreate) => {
    console.log({ ...data, scheduledDate: new Date() });
  };

  return (
    <Card className="w-[350px]">
      <CardHeader className="pb-3">
        <CardTitle className="flex flex-col gap-2 justify-center items-center">
          <div className="text-3xl">学校を登録</div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-3">
              <FormInput control={form.control} type="text" name="title" label="学校名" />
              <FormCalendarInput control={form.control} name='scheduledDate' label='採寸日' />
              <TextAreaInput control={form.control} name='description' label='説明文' />
            </div>
            <SubmitRhkButton isValid={!form.formState.isValid} text="登録" className="w-full mt-5" />
          </form>
        </Form>
      </CardContent>
    </Card >
  );
}