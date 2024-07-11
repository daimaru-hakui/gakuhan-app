import React from "react";
import { Button } from "../../ui/button";
import { useStore } from "@/store";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/client";
import Link from "next/link";
import paths from "@/utils/paths";
import StudentsCsv from "../StudentsCsv";
import { Student } from "@/utils/student.interface";
import { School } from "@/utils/school.interface";

interface Props {
  students: Student[];
  school: School;
}

export default function StudentsTrashHeader({ students, school }: Props) {
  const studentsCheckList = useStore((state) => state.studentsCheckList);
  const resetStudentsCheckList = useStore(
    (state) => state.resetStudentsCheckList
  );

  // function deleteStudents() {
  //   const result = confirm("削除して宜しいでしょうか");
  //   if (!result) return;
  //   studentsCheckList.forEach(async (studentId) => {
  //     const studentRef = doc(db, "schools", school.id, "students", studentId);
  //     await deleteDoc(studentRef);
  //     resetStudentsCheckList();
  //   });
  // }

  function returnStudents() {
    const result = confirm("生徒一覧へ戻しても宜しいでしょうか");
    if (!result) return;
    studentsCheckList.forEach(async (studentId) => {
      const studentRef = doc(db, "schools", school.id, "students", studentId);
      await updateDoc(studentRef, {
        isDeleted: false,
      });
      resetStudentsCheckList();
    });
  }

  return (
    <div className="w-full flex gap-2">
      <div className="w-full flex flex-col md:flex-row md:justify-between items-center gap-2">
        <h1 className="text-2xl font-bold">ゴミ箱</h1>
        <div className="flex gap-2">
          {studentsCheckList.length > 0 && (
            <>
              <Button size="sm" variant="outline" onClick={returnStudents}>
                一覧へ戻す
              </Button>
              {/* <Button size="sm" variant="destructive" onClick={deleteStudents}>
                完全に削除
              </Button> */}
            </>
          )}
          <Button size="sm" asChild>
            <Link href={`${paths.schoolShow(school.id)}`}>各種設定</Link>
          </Button>
          <Button size="sm" asChild>
            <Link href={`/schools/${school.id}/students/board`}>
              採寸掲示板
            </Link>
          </Button>
          <Button size="sm" asChild>
            <Link href={`/schools/${school.id}/students`}>生徒一覧</Link>
          </Button>
          <StudentsCsv students={students} school={school} />
        </div>
      </div>
    </div>
  );
}
