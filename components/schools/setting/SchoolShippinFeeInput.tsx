"use client";
import { db } from "@/lib/firebase/client";
import { School } from "@/utils/school.interface";
import { doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useStore } from "@/store";

interface Props {
  school: School;
}

export default function SchoolShippinFeeInput({ school }: Props) {
  const [shippingFee, setShippingFee] = useState(school.shippingFee || 0);
  const count = useStore(state => state.studentsCount);
  async function handleUpdateShipping() {
    const docRef = doc(db, "schools", school.id);
    try {
      if (count > 0) throw new Error("採寸中のため失敗しました");
      await updateDoc(docRef, {
        shippingFee,
      });
      toast.success(`送料を更新しました`);
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "エラーが発生しました";
      setShippingFee(school.shippingFee || 0);
      toast.error(message);
    }
  }
  return (
    <div className="flex items-center justify-between gap-6">
      <div>
        <h3 className="font-semibold">送料(円)</h3>
        <div className="hidden sm:block mt-1 text-muted-foreground text-xs">
          税込み送料を入力してください
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Input
          type="number"
          min={0}
          className={cn("max-w-[75px] px-2 h-8")}
          value={shippingFee}
          onChange={(e) => setShippingFee(+e.target.value)}
          onFocus={(e) => e.target.select()}
        />
        <Button
          size="sm"
          onClick={handleUpdateShipping}
        >
          更新
        </Button>
      </div>
    </div>
  );
};