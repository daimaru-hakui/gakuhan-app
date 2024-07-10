import React from "react";
import { Button } from "../ui/button";
import { useStore } from "@/store";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/client";
import Link from "next/link";
import paths from "@/utils/paths";
import { CSVLink, CSVDownload } from "react-csv";
import StudentsCsv from "./StudentsCsv";
import { Student } from "@/utils/student.interface";

interface Props {
  id: string;
  students: Student[];
}

export default function StudentsHeader({ id, students }: Props) {
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
    <div className="flex gap-2">
      <div className="flex gap-2">
        <Button size="sm" asChild>
          <Link href={`${paths.schoolShow(id)}`}>各種設定</Link>
        </Button>
        <Button size="sm" asChild>
          <Link href={`/schools/${id}/students/board`}>採寸掲示板</Link>
        </Button>
        <StudentsCsv students={students} />
        {studentsCheckList.length > 0 && (
          <Button size="sm" variant="destructive" onClick={handleClick}>
            削除
          </Button>
        )}
      </div>
    </div>
  );
}
