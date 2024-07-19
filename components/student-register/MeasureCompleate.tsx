"use client";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useEffect } from "react";
import { useReward } from "react-rewards";
import { signOut, useSession } from "next-auth/react";
import { Button } from "../ui/button";
import { School } from "@/utils/school.interface";
import Link from "next/link";

interface Props {
  school: School;
}

export default function MeasureCompleate({ school }: Props) {
  const { reward, isAnimating } = useReward("rewardId", "confetti");
  const session = useSession();

  useEffect(() => {
    reward();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        {school.isPayment ? (
          <Button  size="sm" className="mb-6" asChild>
            <Link href="/mypage">マイページに移動</Link>
          </Button>
        ) : (
          <Button
            size="sm"
            onClick={() => signOut()}
            className="mb-6"
            variant={session.data?.user ? "default" : null}
          >
            {session.data?.user ? "ログアウトする" : "ログアウト済み"}
          </Button>
        )}
        <div className="font-semibold">ガクハン アプリ</div>
        <div className="text-xs text-center font-semibold">
          Produced by
          <span className="text-sm ml-2">DAIMARU HAKUI</span>
        </div>
      </CardContent>
    </Card>
  );
}
