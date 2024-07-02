"use client";
import { SubmitRhkButton } from "@/components/form/Buttons";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { auth } from "@/lib/firebase/client";
import { useStore } from "@/store";
import { onAuthStateChanged, signInAnonymously } from "firebase/auth";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { FaSchool } from "react-icons/fa";

interface Props {
  id: string;
}

export default function AnonymousLoginForm({ id }: Props) {
  const router = useRouter();
  const setUser = useStore((state) => state.setUser);

  function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    signInAnonymously(auth)
      .then((userCredential) => {
        const user = userCredential.user;
        user.getIdToken().then((token) => {
          signIn("credentials", { token });
        });
        setUser(user);
        console.log(user);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user);
        router.push(`/student-register/${id}`);
      } else {
        console.log(user);
      }
    });
    return () => unsub();
  }, [id, router]);

  return (
    <Card className="w-[350px]">
      <CardHeader className="pb-3">
        <CardTitle className="flex flex-col gap-2 justify-center items-center">
          <FaSchool className="text-3xl" />
          <div className="text-3xl">login</div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleLogin}>
          <div className="space-y-3">
            <SubmitRhkButton text="ログイン" className="w-full mt-5" />
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
