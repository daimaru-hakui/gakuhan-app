'use client';
import { SubmitRhkButton } from "@/components/form/Buttons";
import { FormInput } from "@/components/form/FormInput";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { LoginInputs, LoginSchema } from "@/utils/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { FaSchool } from "react-icons/fa";


export default function LoginForm() {
  const form = useForm<LoginInputs>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const onSubmit = (data: LoginInputs) => {
    console.log(data);
  };

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
              <FormInput form={form} type="text" name="email" label="Email" />
              <FormInput form={form} type="password" name="password" label="Password" />
              <p>
                <Link href='/' className="text-xs text-primary font-semibold">
                  パスワードをお忘れですか?
                </Link>
              </p>
            </div>
            <SubmitRhkButton isValid={!form.formState.isValid} text="ログイン" className="w-full mt-5" />
            <p className="text-xs mt-3">アカウントが未登録ですか？
              <Link href='/auth/sign-up' className=" text-primary font-semibold">
                アカウントの作成
              </Link>
            </p>
          </form>
        </Form>
      </CardContent>
    </Card >
  );
}