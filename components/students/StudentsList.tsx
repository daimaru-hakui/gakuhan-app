"use client";
import React, { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Student } from "@/utils/student.interface";
import { format } from "date-fns";
import { calcDifferenceTime } from "@/utils/calc";
import { School } from "@/utils/school.interface";
import StudentEditWithDeleteButton from "./StudentEditWithDeleteButton";
import { useStore } from "@/store";
import EmptyList from "../EmptyList";
import { cn } from "@/lib/utils";
import { getGenderDisplay } from "@/utils/display";

interface Props {
  id: string;
  students: Student[];
  count: number;
  school: School;
}

export default function StudentsList({ id, students, count, school }: Props) {
  const resetStudentsCheckList = useStore(
    (state) => state.resetStudentsCheckList
  );


  useEffect(() => {
    resetStudentsCheckList();
  }, []);

  if (students.length === 0) return <EmptyList />;

  return (
    <Table className="text-xs">
      <TableHeader>
        <TableRow>
          <TableHead className="min-w-[100px]">action</TableHead>
          <TableHead className="min-w-[100px]">学籍番号</TableHead>
          <TableHead className="min-w-[100px]">名前</TableHead>
          <TableHead className="min-w-[80px]">性別</TableHead>
          <TableHead className="min-w-[80px]">金額</TableHead>
          {Array.from(new Array(count), (_, index) => (
            <React.Fragment key={index}>
              <TableHead className="min-w-[200px]">商品名</TableHead>
              <TableHead className="min-w-[120px]">カラー</TableHead>
              <TableHead className="min-w-[80px]">サイズ</TableHead>
              <TableHead className="min-w-[80px]">数量</TableHead>
              <TableHead className="min-w-[80px]">股下修理</TableHead>
            </React.Fragment>
          ))}
          <TableHead className="min-w-[200px]">登録時間</TableHead>
          <TableHead className="min-w-[200px]">採寸完了時間</TableHead>
          <TableHead className="min-w-[120px]">経過時間</TableHead>
          {school.isAddress && (
            <>
              <TableHead className="min-w-[350px]">住所</TableHead>
              <TableHead className="min-w-[150px]">TEL</TableHead>
            </>
          )}
          <TableHead className="min-w-[250px]">Email</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {students.map((student) => (
          <TableRow
            key={student.id}
            className={cn(student.finishedAt ? "" : "bg-red-400 hover:bg-red-500 w-full")}
          >
            <TableCell>
              <StudentEditWithDeleteButton id={id} studentId={student.id} />
            </TableCell>
            <TableCell>{student.studentNumber}</TableCell>
            <TableCell>{`${student.lastName} ${student.firstName}`}</TableCell>
            <TableCell>{getGenderDisplay(student.gender)}</TableCell>
            <TableCell>合計</TableCell>
            {student?.products && Object.values(student?.products).map((product, index) => (
              <React.Fragment key={index}>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.color}</TableCell>
                <TableCell>{product.size}</TableCell>
                <TableCell>{product.quantity}</TableCell>
                <TableCell></TableCell>
              </React.Fragment>
            ))}
            {!student.products && Array.from(new Array(count), (_, index) => (
              <React.Fragment key={index}>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </React.Fragment>
            ))}
            <TableCell>
              {format(
                new Date(student?.startedAt?.toDate()),
                "yyyy年MM月dd日 HH時mm分ss秒"
              )}
            </TableCell>
            <TableCell>
              {student?.finishedAt &&
                format(
                  new Date(student?.finishedAt?.toDate()),
                  "yyyy年MM月dd日 HH時mm分ss秒"
                )}
            </TableCell>
            <TableCell>
              {student.finishedAt &&
                calcDifferenceTime(
                  new Date(student.finishedAt.toDate()),
                  new Date(student?.startedAt?.toDate())
                )}
            </TableCell>
            {
              school.isAddress && (
                <>
                  <TableCell>
                    {student.address.zipCode +
                      " " +
                      student.address.prefecture +
                      student.address.city +
                      student.address.street +
                      student.address.building}
                  </TableCell>
                  <TableCell>{student.tel}</TableCell>
                </>
              )
            }
            < TableCell > {student.email}</TableCell>
          </TableRow>
        ))
        }
      </TableBody >
    </Table >
  );
}
