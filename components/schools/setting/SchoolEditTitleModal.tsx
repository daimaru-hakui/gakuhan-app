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
import { Button } from "../../ui/button";
import { FormInput } from "../../form/FormInput";
import { School } from "@/utils/school.interface";
import { useState, useTransition } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/client";
import { toast } from "sonner";
import { SubmitRhkButton } from "../../form/Buttons";
import { RiEditLine } from "react-icons/ri";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { cn } from "@/lib/utils";

interface Props {
  school: School;
}

interface Inputs {
  title: string;
}

export default function SchoolEditTitle({ school }: Props) {
  const [open, setOpen] = useState(false);
  const [over, setOver] = useState(false);
  const [pending, startTransition] = useTransition();
  const form = useForm<Inputs>({
    defaultValues: {
      title: school.title
    }
  });

  async function updateTitle(data: Inputs)
    : Promise<{ status: string; message: string; }> {
    try {
      const schoolRef = doc(db, "schools", school.id);
      await updateDoc(schoolRef, {
        title: data.title
      });
      return {
        status: "success",
        message: "更新しました"
      };
    } catch (e: unknown) {
      return {
        status: "error",
        message: e instanceof Error ? e.message : "エラーが発生しました"
      };
    }
  }

  async function onSubmit(data: Inputs) {
    startTransition(async () => {
      const { status, message } = await updateTitle(data);
      if (status === "success") {
        toast.success(message);
      } else {
        toast.error(message);
      }
    });
  };

  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        setOpen(!open);
      }}
    >
      <DialogTrigger asChild>
        <div className={
          cn("cursor-pointer inline-block")}
          onClick={() => setOpen(true)}
          onMouseOver={() => setOver(true)}
          onMouseLeave={() => setOver(false)}
        >
          <div className="flex items-center gap-2">
            <h3 className="font-semibold">学校名</h3>
            {over && <RiEditLine size={18} />}
          </div>
          <div className={cn("mt-1 text-md", over && "underline")}>
            {school.title}
          </div>
        </div>
      </DialogTrigger>
      <DialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>編集</DialogTitle>
            </DialogHeader>
            <div className="space-y-6 mt-6">
              <FormInput form={form} name="title" type="text" label="学校名" />
              <DialogFooter className="sm:justify-between gap-2 mt-6">
                <DialogClose asChild>
                  <Button type="button" variant="secondary" className="w-full">
                    閉じる
                  </Button>
                </DialogClose>
                <SubmitRhkButton
                  isValid={pending}
                  isPending={pending}
                  text="更新"
                  className="w-full"
                  props={{
                    onClick: () => setOpen(!open),
                  }}
                />
              </DialogFooter>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog >
  );
}