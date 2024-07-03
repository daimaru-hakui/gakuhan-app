"use client";
import { SubmitRhkButton } from "@/components/form/Buttons";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { auth } from "@/lib/firebase/client";
import { useStore } from "@/store";
import { School } from "@/utils/school.interface";
import { onAuthStateChanged, signInAnonymously } from "firebase/auth";
import { signIn } from "next-auth/react";
import { useTransition } from "react";
import { FaSchool } from "react-icons/fa";

interface Props {
  id: string;
  school: School;
}

export default function AnonymousLoginForm({ id, school }: Props) {
  const [pending, startTransaction] = useTransition();
  const setUser = useStore((state) => state.setUser);

  function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      startTransaction(async () => {
        const userCredential = await signInAnonymously(auth);
        const user = userCredential.user;
        const token = await user.getIdToken();
        setUser(user);
        await signIn("credentials", { token });
      });
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <Card className="w-[350px]">
      <CardHeader className="pb-3">
        <CardTitle className="flex flex-col gap-2 justify-center items-center">
          <FaSchool className="text-3xl" />
          <div className="text-xl">{school.title}</div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleLogin}>
          <div className="space-y-3">
            <SubmitRhkButton
              text="採寸を始める"
              isPending={pending}
              className="w-full mt-5"
            />
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
