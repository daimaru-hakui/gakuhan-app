import React, { useTransition } from "react";
import { Button } from "../ui/button";
import { useStore } from "@/store";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/client";
import Link from "next/link";
import paths from "@/utils/paths";

interface Props {
  id: string;
}

export default function StudentsHeader({ id }: Props) {
  const studentsCheckList = useStore((state) => state.studentsCheckList);

  function handleClick() {
    deleteStudents();
  }

  function deleteStudents() {
    const result = confirm("削除して宜しいでしょうか");
    if (!result) return;
    studentsCheckList.forEach(async (studentId) => {
      const studentRef = doc(db, "schools", id, "students", studentId);
      // await deleteDoc(studentRef);
      await updateDoc(studentRef, {
        isDeleted: true,
      });
    });
  }
  return (
    <div className="flex gap-3">
      <div className="flex gap-3">
        <Button asChild>
          <Link href={`${paths.schoolShow(id)}`}>各種設定</Link>
        </Button>
        <Button asChild>
          <Link href={`/schools/${id}/students/board`}>採寸掲示板</Link>
        </Button>
        {studentsCheckList.length > 0 && (
          <Button variant="destructive" onClick={handleClick}>
            削除
          </Button>
        )}
      </div>
    </div>
  );
}
