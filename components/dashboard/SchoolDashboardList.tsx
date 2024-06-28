"use client";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Student } from "@/utils/student.interface";
import { cn } from "@/lib/utils";

interface Props {
  students: Student[];
  count: number;
}

export default function SchoolDashboardList({ students, count }: Props) {
  if (!students) return;
  console.log(students);
  return (
    <Table className={cn(``)}>
      <TableHeader>
        <TableRow>
          <TableHead className="min-w-[100px]">学籍番号</TableHead>
          <TableHead className="min-w-[100px]">名前</TableHead>
          <TableHead className="min-w-[100px]">性別</TableHead>
          <TableHead className="min-w-[100px]">金額</TableHead>
          {Array.from(new Array(count), (_, index) => (
            <React.Fragment key={index}>
              <TableHead className="min-w-[120px]">商品名</TableHead>
              <TableHead className="min-w-[120px]">カラー</TableHead>
              <TableHead className="min-w-[120px]">サイズ</TableHead>
              <TableHead className="min-w-[80px]">数量</TableHead>
            </React.Fragment>
          ))}
          <TableHead className="min-w-[100px]">登録日</TableHead>
          <TableHead className="min-w-[100px]">採寸完了日</TableHead>
          <TableHead className="min-w-[100px]">経過時間</TableHead>
          <TableHead className="min-w-[100px]">Email</TableHead>
          <TableHead className="min-w-[100px]">住所</TableHead>
          <TableHead className="min-w-[100px]">TEL</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {students.map((student) => (
          <TableRow key={student.id}>
            <TableCell className="font-medium">
              {student.studentNumber}
            </TableCell>
            <TableCell>{`${student.lastName} ${student.firstName}`}</TableCell>
            <TableCell>{student.gender}</TableCell>
            <TableCell className="text-right">{student.id}</TableCell>
            {student.products.map((product) => (
              <React.Fragment key={product.id}>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.color}</TableCell>
                <TableCell>{product.size}</TableCell>
                <TableCell>{product.inseam.cutLength}</TableCell>
              </React.Fragment>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
