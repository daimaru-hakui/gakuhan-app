"use client";
import React, { useEffect, useState } from "react";
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
import { Checkbox } from "../ui/checkbox";

interface Props {
  id: string;
  students: Student[];
  count: number;
  school: School;
}

export default function StudentsList({ id, students, count, school }: Props) {
  const [flag, setFlag] = useState(false);
  const studentsCheckList = useStore((state) => state.studentsCheckList);
  const allStudentsCheckList = useStore(
    (state) => state.allCheckStudentsCheckList
  );
  const resetStudentsCheckList = useStore(
    (state) => state.resetStudentsCheckList
  );

  function handleAllCheckList() {
    if (studentsCheckList.length > 0) {
      resetStudentsCheckList();
      setFlag(!flag);
    } else {
      allStudentsCheckList(students);
      setFlag(!flag);
    }
  }

  useEffect(() => {
    resetStudentsCheckList();
  }, []);

  if (students.length === 0) return <EmptyList />;

  return (
    <Table className="text-xs">
      <TableHeader>
        <TableRow>
          <TableHead className="min-w-[100px]">
            <Checkbox
              id="terms"
              checked={studentsCheckList.length > 0}
              onClick={handleAllCheckList}
            />
          </TableHead>
          <TableHead className="min-w-[100px] max-w-[200px]">
            学籍番号
          </TableHead>
          <TableHead className="min-w-[100px] max-w-[200px]">名前</TableHead>
          <TableHead className="min-w-[80px]">性別</TableHead>
          <TableHead className="min-w-[80px]">金額</TableHead>
          {Array.from(new Array(count), (_, index) => (
            <React.Fragment key={index}>
              <TableHead className="min-w-[100px] max-w-[500px]">
                商品名{index + 1}
              </TableHead>
              <TableHead className="min-w-[100px] max-w-[500px]">
                カラー{index + 1}
              </TableHead>
              <TableHead className="min-w-[80px]">サイズ{index + 1}</TableHead>
              <TableHead className="min-w-[80px]">数量{index + 1}</TableHead>
              <TableHead className="min-w-[80px]">
                股下修理{index + 1}
              </TableHead>
            </React.Fragment>
          ))}
          <TableHead className="min-w-[200px]">登録時間</TableHead>
          <TableHead className="min-w-[200px]">採寸完了時間</TableHead>
          <TableHead className="min-w-[120px]">経過時間</TableHead>
          {school.isAddress && (
            <>
              <TableHead className="w-full min-w-[300px] max-w-[500px]">
                住所
              </TableHead>
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
            className={cn(
              student.finishedAt ? "" : "bg-red-400 hover:bg-red-500 w-full"
            )}
          >
            <TableCell className="flex">
              <StudentEditWithDeleteButton
                id={id}
                studentId={student.id}
                flag={flag}
              />
            </TableCell>
            <TableCell>{student.studentNumber}</TableCell>
            <TableCell>{`${student.lastName} ${student.firstName}`}</TableCell>
            <TableCell>{getGenderDisplay(student.gender)}</TableCell>
            <TableCell>合計</TableCell>
            {student?.products &&
              Object.values(student?.products).map((product, index) => (
                <React.Fragment key={index}>
                  {product.name ? (
                    <>
                      <TableCell>{product.name}</TableCell>
                      <TableCell>{product.color}</TableCell>
                      <TableCell>{product.size}</TableCell>
                      <TableCell>{product.quantity}</TableCell>
                      <TableCell>
                        {product.cutLength === 0
                          ? ""
                          : `${product.cutLength}cm`}
                      </TableCell>
                    </>
                  ) : (
                    <>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                    </>
                  )}
                </React.Fragment>
              ))}
            {!student.products &&
              Array.from(new Array(count), (_, index) => (
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
            {school.isAddress && (
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
            )}
            <TableCell> {student.email}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
