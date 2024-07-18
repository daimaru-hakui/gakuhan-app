"use client";
import React, { useEffect, useState } from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { createPayment } from "@/actions";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/client";
import { Student } from "@/utils/student.interface";

interface Props {
  school: { id: string; schoolName: string };
  uid: string;
}

export default function MyPageIdContainer({ school, uid }: Props) {
  const [paymentStatus, setPaymentStatus] = useState(false);
  useEffect(() => {
    const getStudent = async () => {
      const studentRef = doc(db, "schools", school.id, "students", uid);
      const studentSnap = await getDoc(studentRef);
      const data = { ...studentSnap.data(), id: studentSnap.id } as Student;
      setPaymentStatus(data?.paymentStatus);
    };
    getStudent();
  }, [uid, school]);

  return (
    <Card
      key={school.id}
      onClick={async () =>
        await createPayment({ schoolId: school.id, studentId: uid })
      }
    >
      <CardHeader>
        <CardTitle>{school.schoolName}</CardTitle>
        <CardDescription>{paymentStatus && "入金済み"}</CardDescription>
      </CardHeader>
    </Card>
  );
}
