"use client";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import { School } from "@/utils/school.interface";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/client";
import { toast } from "sonner";

interface Props {
  school: School;
}

export default function SchoolsPublicChangeButton({ school }: Props) {
  function handlePublicChange() {
    try {
      const schoolRef = doc(db, "schools", school.id);
      const result = school.isPublic ? false : true;
      updateDoc(schoolRef, {
        isPublic: result,
      });
    } catch (e: unknown) {
      console.error(e);
      const message = e instanceof Error ? e.message : "更新に失敗しました。";
      toast.error(message);
    }
  }

  return (
    <div className="flex items-center space-x-2">
      <Switch
        id="airplane-mode"
        checked={school.isPublic ? true : false}
        onClick={handlePublicChange}
      />
      <Label htmlFor="airplane-mode">
        {school.isPublic ? "公開" : "非公開"}
      </Label>
    </div>
  );
}
