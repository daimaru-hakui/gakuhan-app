"use client";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { useEffect } from "react";
import { auth as firebaseAuth } from "@/lib/firebase/client";
import { signOut, useSession } from "next-auth/react";
import { useStore } from "@/store";
import { useReward } from "react-rewards";

export default function MeasureCompleate() {
  const { reward, isAnimating } = useReward("rewardId", "confetti");
  const setUser = useStore(state => state.setUser);
  const session = useSession();
  const user = useStore(state => state.user);

  async function logOut() {
    firebaseAuth.signOut().then(() => {
      setUser(null);
    });
  };

  useEffect(() => {
    if (!user) return;
    const getLogout = async () => {
      reward();
      await new Promise(resolve => setTimeout(resolve, 2000));
      logOut().then(() => {
        if (session) {
          signOut();
        }
      });
    };
    getLogout();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Card className="mx-auto text-center">
      <CardContent>
        <CardHeader>
          <CardTitle className="grid grid-cols-1">
            <div className="flex justify-center mb-3">
              <span id="rewardId" className="text-xl">🎉</span>
            </div>
            <p className="text-lg font-bold">採寸お疲れ様でした。</p>
            <p className="text-lg font-bold">登録がすべて完了しました。</p>
          </CardTitle>
        </CardHeader>
        <div className="font-semibold">ガクハン アプリ</div>
        <div className="text-xs text-center font-semibold">
          Produced by
          <span className="text-sm ml-2">DAIMARU HAKUI</span>
        </div>
      </CardContent>
    </Card >
  );
}