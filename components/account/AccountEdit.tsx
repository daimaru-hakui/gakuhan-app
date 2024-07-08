"use client";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import React, { useTransition } from "react";
import TextAreaInput from "../form/TextAreaInput";
import { Form } from "../ui/form";
import { useForm } from "react-hook-form";
import { EditAccount, EditAccountSchema } from "@/utils/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitRhkButton } from "../form/Buttons";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/client";
import { Button } from "../ui/button";
import { User } from "@/utils/user.interface";

interface Props {
  user: User;
}

export default function AccountEdit({ user }: Props) {
  const [pending, startTransition] = useTransition();
  const form = useForm<EditAccount>({
    resolver: zodResolver(EditAccountSchema),
  });

  async function onSubmit(data: EditAccount) {
    startTransition(async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      await updateAccount(data);
    });
  }

  async function updateAccount(data: EditAccount) {
    const userRef = doc(db, "users", user.id);
    updateDoc(userRef, {
      signature: data.signature || "",
    });
  }

  return (
    <Dialog>
      <DialogTrigger>編集</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>編集</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <TextAreaInput
              form={form}
              label="署名"
              name="signature"
              defaultValue={user.signature}
            />
            <div className="flex justify-center gap-2 mt-3">
              <DialogClose className="w-full">
                <Button type="button" variant="secondary" className="w-full">
                  閉じる
                </Button>
              </DialogClose>
              <SubmitRhkButton
                text="更新"
                isPending={pending}
                isValid={pending}
                className="w-full"
              />
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
