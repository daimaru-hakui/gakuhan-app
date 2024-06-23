"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { db } from "@/firebase/client";
import { cn } from "@/lib/utils";
import { School } from "@/utils/school.type";
import { doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { toast } from "sonner";

type Props = {
  title: string;
  description: string;
  input?: boolean;
  school: School;
  prop: string;
  value: boolean;
};

export default function SchoolSettingSwitch({
  title,
  description,
  input,
  school,
  prop,
  value,
}: Props) {
  const [show, setShow] = useState(value || false);
  const [shippingFee, setShippingFee] = useState(school.shippingFee || 0);

  async function handleUpdateSwitch() {
    const docRef = doc(db, "schools", school.id);
    await updateDoc(docRef, {
      [prop]: !show,
    });
    setShow(!show);
    toast.success(`${title}を更新しました`);
  }

  async function handleUpdateShipping() {
    const docRef = doc(db, "schools", school.id);
    await updateDoc(docRef, {
      shippingFee,
    });
    toast.success(`送料を更新しました`);
  }

  return (
    <div className="flex items-center justify-between">
      <div>
        <h3 className="font-semibold">{title}</h3>
        <div className="hidden sm:block mt-1 text-muted-foreground text-xs">
          {description}
        </div>
      </div>
      {input ? (
        <div className="flex items-center gap-3">
          <Input
            type="number"
            className={cn(show ? "block" : "hidden", "max-w-[80px] px-2")}
            disabled={!show}
            value={shippingFee}
            onChange={(e) => setShippingFee(+e.target.value)}
            onFocus={(e) => e.target.select()}
          />
          <Button
            className={cn(show ? "block" : "hidden")}
            size="sm"
            onClick={handleUpdateShipping}
          >
            更新
          </Button>
          <Switch checked={show} onClick={handleUpdateSwitch} />
        </div>
      ) : (
        <Switch checked={show} onClick={handleUpdateSwitch} />
      )}
    </div>
  );
}
