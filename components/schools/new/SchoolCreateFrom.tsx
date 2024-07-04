"use client";
import { SubmitRhkButton } from "@/components/form/Buttons";
import FormCalendarInput from "@/components/form/FormCalendarInput";
import { FormInput } from "@/components/form/FormInput";
import TextAreaInput from "@/components/form/TextAreaInput";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { db } from "@/lib/firebase/client";
import { CreateSchool, CreateSchoolSchema } from "@/utils/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { addDoc, collection } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";

export default function SchoolCreateForm() {
  const router = useRouter();
  const [pending, startTransaction] = useTransition();
  const form = useForm<CreateSchool>({
    resolver: zodResolver(CreateSchoolSchema),
    defaultValues: {
      title: "",
      scheduledDate: new Date(),
      description: "",
    },
  });

  const onSubmit = async (data: CreateSchool) => {
    const defaultDate = data.scheduledDate || new Date();
    startTransaction(async () => {
      await createSchool({ ...data, scheduledDate: defaultDate });
    });
  };

  const createSchool = async (data: CreateSchool): Promise<void> => {
    const schoolRef = collection(db, "schools");
    const { id } = await addDoc(schoolRef, {
      ...data,
      isAddress: false,
      isGender: false,
      isShipping: false,
      shippingFee: 0,
      createdAt: new Date(),
      isPublic: true,
      isDeleted: false,
      deletedAt: null,
    });
    router.push(`/schools/${id}`);
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
              <FormInput
                form={form}
                type="text"
                name="title"
                label="学校名"
                require
              />
              <FormCalendarInput
                form={form}
                name="scheduledDate"
                label="採寸日"
                require
              />
              <TextAreaInput form={form} name="description" label="説明文" />
            </div>
            <SubmitRhkButton
              isValid={!form.formState.isValid}
              isPending={pending}
              text="登録"
              className="w-full mt-5"
            />
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
