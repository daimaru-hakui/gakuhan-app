"use client";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { useEffect } from "react";
import { auth as firebaseAuth } from "@/lib/firebase/client";
import { signOut, useSession } from "next-auth/react";
import { useStore } from "@/store";

export default function MeasureCompleate() {
  const setUser = useStore(state => state.setUser);
  const session = useSession();

  async function logOut() {
    firebaseAuth.signOut().then(() => {
      setUser(null);
    });
  };

  useEffect(() => {
    logOut();
  }, []);

  return (
    <Card className="mx-auto text-center">
      <CardContent>
        <CardHeader>
          <CardTitle className="grid grid-cols-1">
            <div className="flex justify-center mb-3">
              <IoIosCheckmarkCircle size={36} />
            </div>
            <p className="text-lg font-bold">採寸お疲れ様でした。</p>
            <p className="text-lg font-bold">登録がすべて完了しました。</p>
          </CardTitle>
        </CardHeader>
        {session && session.data ? (
          <Button
            onClick={
              async () => await signOut()
            }
          >
            ログアウト
          </Button>
        ) : (
          <div>ログアウト済み</div>
        )}
      </CardContent>
    </Card >
  );
}