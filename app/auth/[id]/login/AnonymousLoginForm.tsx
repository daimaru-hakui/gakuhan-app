"use client";
import { SubmitRhkButton } from "@/components/form/Buttons";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { auth } from "@/lib/firebase/client";
import { useStore } from "@/store";
import { School } from "@/utils/school.interface";
import { onAuthStateChanged, signInAnonymously } from "firebase/auth";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useTransition } from "react";
import { FaSchool } from "react-icons/fa";

interface Props {
  id: string;
  school: School;
}

export default function AnonymousLoginForm({ id, school }: Props) {
  const router = useRouter();
  const session = useSession();
  const setUser = useStore((state) => state.setUser);
  const user = useStore(state => state.user);
  const [pending, startTransaction] = useTransition();

  function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    startTransaction(async () => {

      signInAnonymously(auth)
        .then(async (userCredential) => {
          const user = userCredential.user;
          user.getIdToken().then((token) => {
            signIn("credentials", { token });
          });
          await auth.signOut();
        })
        .catch((error) => {
          console.log(error.message);
        });
    });
  }

  // useEffect(() => {
  //   const unsub = onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       router.push(`/student-register/${id}`);
  //     } else {
  //       console.log(user);
  //     }
  //   });
  //   return () => unsub();
  // }, [id, router, session]);

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
            <SubmitRhkButton text="ログイン" isPending={pending} className="w-full mt-5" />
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
