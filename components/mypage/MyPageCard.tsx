"use client";
import React, { useEffect, useState } from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { createPayment } from "@/actions";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/client";
import { Student } from "@/utils/student.interface";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";

interface Props {
  school: { id: string; schoolName: string };
  uid: string;
}

export default function MyPageCard({ school, uid }: Props) {
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
      onClick={async () => {
        if (paymentStatus) return;
        await createPayment({ schoolId: school.id, studentId: uid });
      }}
    >
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{school.schoolName}</CardTitle>
          <Badge
            className={cn(
              paymentStatus
                ? "bg-green-500 hover:bg-green-500"
                : "bg-red-400 hover:bg-red-400"
            )}
          >
            {paymentStatus ? "入金済み" : "未入金"}
          </Badge>
        </div>
        <CardDescription></CardDescription>
        <div className="flex gap-3">
          <Button variant="outline" className="w-full">
            詳細
          </Button>
          <Button className="w-full" disabled={paymentStatus}>
            {paymentStatus ? "入金済み" : "お支払い手続き"}
          </Button>
        </div>
      </CardHeader>
    </Card>
  );
}
