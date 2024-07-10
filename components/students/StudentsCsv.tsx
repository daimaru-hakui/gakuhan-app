"use client";
import { Student } from "@/utils/student.interface";
import React, { useEffect } from "react";
import { Button } from "../ui/button";
import { CSVLink, CSVDownload } from "react-csv";
import { getGenderDisplay } from "@/utils/display";

interface Props {
  students: Student[];
}

export default function StudentsCsv({ students }: Props) {
  useEffect(() => {
    const data = students
      .filter((student) => student.products)
      .map((student) => {
        const { studentNumber, lastName, firstName, gender, totalAmount } =
          student;
        let products: any = [];
        student.products.forEach((product, index) => {
          const count = index + 1;
          products.push({
            [`商品名${count}`]: product.name,
            [`カラー${count}`]: product.color,
            [`サイズ${count}`]: product.size,
            [`数量${count}`]: product.quantity,
            [`股下修理${count}`]: product.cutLength,
          });
        });
        let data: any[] = [];
        student.products.forEach((product) => {
          data.push([
            product.name,
            product.color,
            product.size,
            product.quantity,
            product.cutLength,
          ]);
        });
        console.log(...data.flat().flat());

        return {
          学籍番号: studentNumber,
          名前: lastName + " " + firstName,
          性別: getGenderDisplay(gender)?.replace("用", ""),
          金額: totalAmount,
        };
      });
    console.log(data);
  }, []);

  return (
    <Button size="sm" variant="outline">
      CSV
    </Button>
  );
}
