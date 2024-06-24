"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { db } from "@/firebase/client";
import { cn } from "@/lib/utils";
import { School } from "@/utils/school.interface";
import { doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { toast } from "sonner";

type Props = {
  title: string;
  description: string;
  school: School;
  prop: string;
  value: boolean;
};

export default function SchoolSettingSwitch({
  title,
  description,
  school,
  prop,
  value,
}: Props) {
  const [show, setShow] = useState(value || false);


  async function handleUpdateSwitch() {
    const docRef = doc(db, "schools", school.id);
    await updateDoc(docRef, {
      [prop]: !show,
    });
    setShow(!show);
    toast.success(`${title}を更新しました`);
  }

  return (
    <div className="flex items-center justify-between gap-3">
      <div>
        <h3 className="font-semibold">{title}</h3>
        <div className="hidden sm:block mt-1 text-muted-foreground text-xs">
          {description}
        </div>
      </div>
      <div className="flex items-center">
        <Switch checked={show} onClick={handleUpdateSwitch} />
      </div>
    </div>
  );
}
