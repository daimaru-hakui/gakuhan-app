"use client";
import React, { useEffect, useState } from "react";
import SchoolDashboardList from "./SchoolDashboardList";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/firebase/client";
import { Student } from "@/utils/student.interface";
import LoaderIcon from "../LoaderIcon";

interface Props {
  id: string;
  count: number;
}

export default function SchoolDashboardContainer({ id, count }: Props) {
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
        console.log(e);
      },
    });
    return () => unsub();
  }, []);

  if (!students) return <LoaderIcon />;

  return (
    <div className="w-full overflow-auto px-6">
      <SchoolDashboardList students={students} count={count} />
    </div>
  );
}
