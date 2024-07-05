"use client";
import { db } from "@/lib/firebase/client";
import { Student } from "@/utils/student.interface";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import PublicStudentsList from "./StudentsList";
import LoaderIcon from "../LoaderIcon";
import { School } from "@/utils/school.interface";
import PublicStudentsHeader from "./StudentsHeader";
import SchoolHeader from "../schools/setting/SchoolHeader";

interface Props {
  id: string;
  count: number;
  school: School;
}

export default function StudentsContainer({ id, count, school }: Props) {
  const [students, setStudents] = useState<Student[]>();
  useEffect(() => {
    const studentsRef = collection(db, "schools", id, "students");
    const q = query(studentsRef, where("isDeleted", "==", false));
    const unsub = onSnapshot(q, {
      next: (snapshot) => {
        const studentsData = snapshot.docs
          .map((doc) => ({ ...doc.data(), id: doc.id } as Student))
          .sort((a, b) => {
            const numberA = a.studentNumber.replace(/[^0-9０-９]/g, "");
            const numberB = b.studentNumber.replace(/[^0-9０-９]/g, "");
            if (+numberA < +numberB) {
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
        <PublicStudentsHeader id={id} />
      </div>
      <PublicStudentsList
        id={id}
        students={students}
        count={count}
        school={school}
      />
    </div>
  );
}
