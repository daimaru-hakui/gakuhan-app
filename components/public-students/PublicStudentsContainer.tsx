"use client";
import { db } from "@/firebase/client";
import { Student } from "@/utils/student.interface";
import { collection, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import PublicStudentsList from "./PublicStudentsList";
import LoaderIcon from "../LoaderIcon";
import { School } from "@/utils/school.interface";
import PublicStudentsHeader from "./PublicStudentsHeader";

interface Props {
  id: string;
  count: number;
  school: School;
}

export default function PublicStudentsContainer({ id, count, school }: Props) {
  const [students, setStudents] = useState<Student[]>();
  useEffect(() => {
    const studentsRef = collection(db, "schools", id, "public-students");
    const unsub = onSnapshot(studentsRef, {
      next: (snapshot) => {
        setStudents(
          snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id } as Student))
        );
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
      <PublicStudentsHeader id={id} />
      <PublicStudentsList students={students} count={count} school={school} />
    </div>
  );
}
