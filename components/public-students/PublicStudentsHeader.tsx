import React from "react";
import { Button } from "../ui/button";
import { useStore } from "@/store";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "@/firebase/client";

interface Props {
  id: string;
}

export default function PublicStudentsHeader({ id }: Props) {
  const studentsCheckList = useStore((state) => state.studentsCheckList);

  function handleClick() {
    deleteStudents();
  }

  function deleteStudents() {
    studentsCheckList.forEach(async (studentId) => {
      const studentRef = doc(db, "schools", id, "public-students", studentId);
      await deleteDoc(studentRef);
    });
  }
  return (
    <div>
      {studentsCheckList.length > 0 && (
        <Button onClick={handleClick}>削除</Button>
      )}
    </div>
  );
}
