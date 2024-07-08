"use client";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useEffect } from "react";
import { auth } from "@/lib/firebase/client";
import { useStore } from "@/store";
import { useReward } from "react-rewards";
import { onAuthStateChanged } from "firebase/auth";
import { signOut, useSession } from "next-auth/react";
import { Button } from "../ui/button";

export default function MeasureCompleate() {
  const { reward, isAnimating } = useReward("rewardId", "confetti");
  const setUser = useStore((state) => state.setUser);
  const user = useStore((state) => state.user);
  const session = useSession();

  async function logOut() {
    auth.signOut().then(() => {
      setUser(null);
    });
  }

  useEffect(() => {
    const getLogout = async () => {
      reward();
      logOut().then(() => {
        console.log("logout");
      });
    };
    getLogout();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return () => unsub();
  }, [setUser]);

  return (
    <Card className="mx-auto text-center">
      <CardContent>
        <CardHeader>
          <CardTitle className="grid grid-cols-1">
            <div className="flex justify-center mb-3">
              <span id="rewardId" className="text-xl">
                🎉
              </span>
            </div>
            <p className="text-lg font-bold">採寸お疲れ様でした。</p>
            <p className="text-lg font-bold">登録がすべて完了しました。</p>
          </CardTitle>
        </CardHeader>
        <Button
          size="sm"
          onClick={() => signOut()}
          className="mb-6"
          variant={session.data?.user ? "default" : null}
        >
          {session.data?.user ? "ログアウトする" : "ログアウト済み"}
        </Button>
        <div className="font-semibold">ガクハン アプリ</div>
        <div className="text-xs text-center font-semibold">
          Produced by
          <span className="text-sm ml-2">DAIMARU HAKUI</span>
        </div>
      </CardContent>
    </Card>
  );
}
