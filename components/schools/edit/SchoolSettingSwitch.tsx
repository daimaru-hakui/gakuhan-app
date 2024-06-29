"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { db } from "@/firebase/client";
import { cn } from "@/lib/utils";
import { School } from "@/utils/school.interface";
import { collection, doc, getCountFromServer, updateDoc } from "firebase/firestore";
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
    const studentsRef = collection(db, "schools", school.id, "public-students");
    const studentsSnap = await getCountFromServer(studentsRef);
    const count = studentsSnap.data().count;
    try {
      if (count > 0) throw new Error("採寸中のため失敗しました");
      await updateDoc(docRef, {
        [prop]: !show,
      });
      setShow(!show);
      toast.success(`${title}を更新しました`);
    } catch (e) {
      const message = e instanceof Error ? e.message : "エラーが発生しました";
      toast.error(message);
    }
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
