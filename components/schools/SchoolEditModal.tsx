"use client";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { FormInput } from "../form/FormInput";
import TextAreaInput from "../form/TextAreaInput";
import { useForm } from "react-hook-form";
import { EditSchool, EditSchoolSchema } from "@/utils/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { School } from "@/utils/school.interface";
import { Form } from "../ui/form";
import { useState, useTransition } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase/client";
import { LuLoader2 } from "react-icons/lu";
import FormCalendarInput from "../form/FormCalendarInput";
import { toast } from "sonner";

interface Props {
  school: School;
}

export default function SchoolEditModal({ school }: Props) {
  const [open, setOpen] = useState(false);
  const [pending, startTransaction] = useTransition();

  const form = useForm<EditSchool>({
    resolver: zodResolver(EditSchoolSchema),
    defaultValues: {
      title: school.title,
      description: school.description,
      scheduledDate: new Date(school.scheduledDate.toDate()) || new Date(),
    },
    values: {
      title: school.title,
      description: school.description,
      scheduledDate: new Date(school.scheduledDate.toDate()) || new Date(),
    },
  });

  async function onSubmit(data: EditSchool) {
    startTransaction(async () => {
      await updateSchool(data);
      toast.success("学校情報を更新しました")
      setOpen(false);
    });
  }

  async function updateSchool(data: EditSchool) {
    try {
      const schoolRef = doc(db, "schools", school.id);
      const date = data.scheduledDate
        ? data.scheduledDate
        : new Date(school.scheduledDate.toDate());
      await updateDoc(schoolRef, {
        ...data,
        scheduledDate: date,
      });
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        setOpen(!open);
        form.reset();
      }}
    >
      <DialogTrigger>
        <Button size="sm">編集</Button>
      </DialogTrigger>
      <DialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>編集</DialogTitle>
            </DialogHeader>
            <div className="space-y-6 mt-6">
              <FormInput form={form} name="title" type="text" label="学校名" />
              <TextAreaInput form={form} name="description" label="説明" />
              <FormCalendarInput
                form={form}
                name="scheduledDate"
                label="説明"
              />
              <DialogFooter className="sm:justify-between mt-6">
                <DialogClose asChild>
                  <Button type="button" variant="secondary" className="w-full">
                    閉じる
                  </Button>
                </DialogClose>
                <Button type="submit" className="w-full" disabled={pending}>
                  {pending && (
                    <LuLoader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  登録
                </Button>
              </DialogFooter>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
