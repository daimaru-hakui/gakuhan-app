"use client";
import { SubmitRhkButton } from "@/components/form/Buttons";
import { FormInput } from "@/components/form/FormInput";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { auth } from "@/lib/firebase/client";
import { useStore } from "@/store";
import { LoginInputs, LoginSchema } from "@/utils/schemas";
import { School } from "@/utils/school.interface";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInAnonymously, signInWithEmailAndPassword } from "firebase/auth";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { FaSchool } from "react-icons/fa";

interface Props {
  id: string;
  school: School;
}

export default function PaymentLoginForm({ id, school }: Props) {
  const [pending, setPending] = useState(false);
  const setUser = useStore((state) => state.setUser);
  const form = useForm<LoginInputs>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginInputs) => {
    handleLogin(data);
  };

  function handleLogin({ email, password }: LoginInputs) {
    setPending(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
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
        console.log(error.message);
      })
      .finally(() => {
        setPending(false);
      });
  }

  return (
    <Card className="w-[350px]">
      <CardHeader className="pb-3">
        <CardTitle className="flex flex-col gap-2 justify-center items-center">
          <FaSchool className="text-3xl" />
          <div className="text-3xl">login</div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-3">
              <h3 className="text-center">{school.title}</h3>
              <FormInput form={form} type="text" name="email" label="Email" />
              <FormInput
                form={form}
                type="password"
                name="password"
                label="Password"
              />
              <p>
                <Link
                  href={`/auth/${id}/register`}
                  className="text-xs text-primary font-semibold"
                >
                  パスワードをお忘れですか?
                </Link>
              </p>
            </div>
            <SubmitRhkButton
              isValid={!form.formState.isValid}
              isPending={pending}
              text="ログイン"
              className="w-full mt-5"
            />
            <p className="text-xs mt-3">
              IDをお持ちでない場合は
              <Link
                href={`/auth/${id}/register`}
                className=" text-primary font-semibold"
              >
                新規登録ページへ移動
              </Link>
            </p>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
