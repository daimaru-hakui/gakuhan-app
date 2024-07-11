"use client";
import { db } from "@/lib/firebase/client";
import { Student } from "@/utils/student.interface";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import StudentsList from "./StudentsList";
import LoaderIcon from "../LoaderIcon";
import { School } from "@/utils/school.interface";
import StudentsHeader from "./StudentsHeader";

interface Props {
  id: string;
  count: number;
  school: School;
}

export default function StudentsContainer({ id, count, school }: Props) {
  const [students, setStudents] = useState<Student[]>();

  function toHalfSizeWithNumber(str: string) {
    return str
      .replace(/[^0-9０-９]/g, "")
      .replace(/[０-９]/g, (s) =>
        String.fromCharCode(s.charCodeAt(0) - 0xfee0)
      );
  }

  useEffect(() => {
    const studentsRef = collection(db, "schools", id, "students");
    const q = query(studentsRef, where("isDeleted", "==", false));
    const unsub = onSnapshot(q, {
      next: (snapshot) => {
        const studentsData = snapshot.docs
          .map((doc) => ({ ...doc.data(), id: doc.id } as Student))
          .sort((a, b) => {
            const numberA = toHalfSizeWithNumber(a.studentNumber);
            const numberB = toHalfSizeWithNumber(b.studentNumber);
            if (numberA < numberB) {
              return -1;
            } else {
              return 1;
            }
          });
        setStudents(studentsData);
      },
      error: (e) => {
        console.log(e.message);
      },
    });
    return () => unsub();
  }, [id]);

  if (!students) return <LoaderIcon />;

  return (
    <div className="px-6">
      <div className="flex justify-between mb-4">
        <StudentsHeader students={students} school={school} />
      </div>
      <StudentsList id={id} students={students} count={count} school={school} />
    </div>
  );
}
