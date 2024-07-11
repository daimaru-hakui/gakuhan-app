"use client";
import { SubmitRhkButton } from "@/components/form/Buttons";
import { FormInput } from "@/components/form/FormInput";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { auth } from "@/lib/firebase/client";
import { useStore } from "@/store";
import { PaymentSignUpInputs, PaymentSignUpSchema } from "@/utils/schemas";
import { School } from "@/utils/school.interface";
import { zodResolver } from "@hookform/resolvers/zod";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaSchool } from "react-icons/fa";
import { toast } from "sonner";

interface Props {
  id: string;
  school: School;
}

export default function PaymentSignUpForm({ id }: Props) {
  const [pending, setPending] = useState(false);
  const setUser = useStore((state) => state.setUser);
  const form = useForm<PaymentSignUpInputs>({
    resolver: zodResolver(PaymentSignUpSchema),
    defaultValues: {
      email: "",
      lastName: "",
      firstName: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onBlur",
  });

  const onSubmit = async (data: PaymentSignUpInputs) => {
    setPending(true);
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then(async (userCredential) => {
        await updateProfile(userCredential.user, {
          displayName: data.lastName + " " + data.firstName,
        });
        const user = userCredential.user;
        user.getIdToken().then((token) => {
          signIn("credentials", {
            token,
            callbackUrl: `/student-register/${id}`,
          });
        });
        setUser(user);
      })
      .catch((error) => {
        console.log(error.code);
        if (error.code === "auth/email-already-in-use") {
          toast.error("すでにアカウント登録済みです");
        } else {
          toast.error("エラーが発生しました");
        }
      })
      .finally(() => {
        setPending(false);
      });
  };

  return (
    <Card className="w-[350px]">
      <CardHeader className="pb-4">
        <CardTitle className="flex flex-col gap-2 justify-center items-center">
          <FaSchool className="text-3xl" />
          <div className="text-2xl">アカウント作成</div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-3">
              <FormInput form={form} type="text" name="email" label="Email" />
              <div className="flex gap-2">
                <FormInput form={form} type="text" name="lastName" label="姓" />
                <FormInput
                  form={form}
                  type="text"
                  name="firstName"
                  label="名"
                />
              </div>
              <FormInput
                form={form}
                type="password"
                name="password"
                label="Password"
              />
              <FormInput
                form={form}
                type="password"
                name="confirmPassword"
                label="Passwordの確認"
              />
            </div>
            <SubmitRhkButton
              isValid={!form.formState.isValid}
              isPending={pending}
              text="アカウント作成"
              className="w-full mt-5"
            />
            <p className="text-xs mt-3">
              アカウント登録済みの場合は
              <Link
                href={`/auth/${id}/login`}
                className=" text-primary font-semibold"
              >
                ログインページへ移動
              </Link>
            </p>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
