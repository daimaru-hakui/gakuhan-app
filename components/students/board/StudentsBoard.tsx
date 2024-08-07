"use client";
import { db } from "@/lib/firebase/client";
import { Student } from "@/utils/student.interface";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import LoaderIcon from "@/components/LoaderIcon";
import EmptyList from "@/components/EmptyList";

interface Props {
  id: string;
}

export default function PublicStudentsBoard({ id }: Props) {
  const [students, setStudents] = useState<Student[]>();

  useEffect(() => {
    const studentsRef = collection(db, "schools", id, "students");
    const q = query(studentsRef, where("isDeleted", "==", false));
    const unsub = onSnapshot(q, {
      next: (snapshot) => {
        setStudents(
          snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id } as Student))
        );
      },
      error: (e) => {
        console.log(e);
      },
    });
    return () => unsub();
  }, [id]);

  if (!students) return <LoaderIcon />;
  if (students.length === 0)
    return (
      <EmptyList text="登録されたデータはありません。" className="mt-24" />
    );

  return (
    <div className="flex flex-row flex-wrap gap-1">
      {students.map((student) => (
        <div
          key={student.id}
          className={cn(
            "border rounded-md mx-auto p-0.5 text-sm w-[100px]",
            student.finishedAt
              ? "bg-muted"
              : "bg-red-400 text-primary-foreground"
          )}
        >
          <div>{student.studentNumber}</div>
          <div>{`${student.lastName} ${student.firstName}`}</div>
        </div>
      ))}
    </div>
  );
}
