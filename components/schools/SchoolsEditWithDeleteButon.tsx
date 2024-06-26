import { db } from "@/firebase/client";
import { School } from "@/utils/school.interface";
import { doc, updateDoc } from "firebase/firestore";
import Link from "next/link";
import React, { useTransition } from "react";
import { LuLoader2 } from "react-icons/lu";
import { RiDeleteBin6Line, RiEditLine } from "react-icons/ri";
import { LuSettings  } from "react-icons/lu";
import { toast } from "sonner";

interface Props {
  school: School;
}
export default function SchoolsEditWithDeleteButon({ school }: Props) {
  const [pending, startTransaction] = useTransition();

  function handleClickDeleteSchool(id: string) {
    const result = confirm("削除しても宜しいでしょうか");
    if (!result) return;
    try {
      startTransaction(async () => {
        await new Promise((resolve) => setTimeout(resolve, 500));
        await logicDeleteSchool(id);
        toast.success("削除しました");
      });
    } catch (e) {
      console.log(e);
      toast.error("失敗しました");
    }
  }

  // async function deleteSchool(id: string) {
  //   const schoolRef = doc(db, "schools", id);
  //   await deleteDoc(schoolRef);
  // }

  async function logicDeleteSchool(id: string) {
    const schoolRef = doc(db, "schools", id);
    await updateDoc(schoolRef, {
      isDeleted: true,
      detetedAt: new Date(),
    });
  }
  return (
    <div className="flex gap-3">
      <Link href={`/schools/${school.id}`} className="w-8 h-8 flex justify-center items-center">
        <LuSettings   size={24} color="gray" className="cursor-pointer" />
      </Link>
      <div className="w-8 h-8 flex justify-center items-center">
        {pending ? (
          <LuLoader2 className="h-4 w-4 animate-spin" />
        ) : (
          <RiDeleteBin6Line
            size={24}
            color="red"
            className="cursor-pointer"
            onClick={() => handleClickDeleteSchool(school.id)}
          />
        )}
      </div>
    </div>
  );
}
