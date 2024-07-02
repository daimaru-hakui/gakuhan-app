"use client";
import { db } from "@/lib/firebase/client";
import { getGenderDisplay } from "@/utils/display";
import { Student } from "@/utils/student.interface";
import { doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";

interface Props {
  id: string;
  studentId: string;
}

export default function MeasureHeader({ id, studentId }: Props) {
  const [student, setStudent] = useState<Student>();

  useEffect(() => {
    const studentRef = doc(db, "schools", id, "students", studentId);
    onSnapshot(studentRef, {
      next: (snapshot) => {
        setStudent({ ...snapshot.data(), id: snapshot.id } as Student);
      },
      error: (e) => {
        console.log(e);
      },
    });
  }, [id, studentId]);

  if (!student) return null;

  return (
    <>
      <h1 className="text-center font-bold">{student.schoolName}</h1>
      <div className="border mt-2 mb-6 p-6 space-y-3 ">
        <div className="flex gap-6">
          <div>
            <div className="text-sm font-semibold">学籍番号</div>
            <div>{student?.studentNumber}</div>
          </div>
          <div>
            <div className="text-sm font-semibold">氏名</div>
            <div>{`${student?.lastName} ${student.firstName}`}</div>
          </div>
          {student.gender !== "other" && (
            <div>
              <div className="text-sm font-semibold">性別</div>
              <div>{getGenderDisplay(student.gender)?.replace("用", "")}</div>
            </div>
          )}
        </div>
        {student.address.zipCode && (
          <div>
            <div className="text-sm font-semibold">住所</div>
            <div>〒{student.address.zipCode}</div>
            <div>
              {student.address.prefecture +
                student.address.city +
                student.address.street}
            </div>
            <div>{student.address.building && student.address.building}</div>
          </div>
        )}
      </div>
    </>
  );
}
