"use client";
import { Student } from "@/utils/student.interface";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { CSVLink, CSVDownload } from "react-csv";
import { getGenderDisplay } from "@/utils/display";
import { format } from "date-fns";
import { calcDifferenceTime } from "@/utils/calc";
import { School } from "@/utils/school.interface";

interface Props {
  students: Student[];
  school: School;
}

export default function StudentsCsv({ students, school }: Props) {
  const [data, setData] = useState<(string | number | null | undefined)[][]>(
    []
  );
  function handleCsvDownload() {
    if (!students.at(0)) return;
    const header = getCsvHeader(students);
    const body = getCsvBody(students);
    body.unshift(header);
    setData(body);
    console.log(body);
  }

  function getCsvHeader(students: Student[]): (string | number | undefined)[] {
    const products = students.at(0)?.products.map((_, index) => {
      const count = index + 1;
      return [
        `商品名${count}`,
        `カラー${count}`,
        `サイズ${count}`,
        `数量${count}`,
        `股下修理${count}`,
      ];
    });
    if (!products) return [];
    const header = [
      "学籍番号",
      "名前",
      "性別",
      "金額",
      ...products.flat(),
      "登録時間",
      "採寸完了時間",
      "経過時間",
      "住所",
      "TEL",
      "Email",
    ];
    return header;
  }

  function getCsvBody(
    students: Student[]
  ): (string | number | null | undefined)[][] {
    const body = students
      .filter((student) => student.products)
      .map((student) => {
        const {
          studentNumber,
          lastName,
          firstName,
          gender,
          totalAmount,
          startedAt,
          finishedAt,
          email,
          address,
          tel,
        } = student;
        const { zipCode, prefecture, city, street, building } = address;

        const body = student.products.map((product) => {
          return [
            product.name,
            product.color,
            product.size,
            product.quantity,
            product.inseam.base === 0
              ? product.cutLength
              : product.inseam.base - product.cutLength,
          ];
        });

        return [
          studentNumber,
          lastName + " " + firstName,
          getGenderDisplay(gender)?.replace("用", ""),
          totalAmount,
          ...body.flat(),
          startedAt
            ? format(new Date(startedAt?.toDate()), "MM月dd日 HH:mm:ss")
            : null,
          finishedAt
            ? format(new Date(finishedAt?.toDate()), "MM月dd日 HH:mm:ss")
            : null,
          finishedAt &&
            calcDifferenceTime(
              new Date(finishedAt.toDate()),
              new Date(startedAt?.toDate())
            ),
          zipCode
            ? `〒${zipCode} ${prefecture + city + street + building}`
            : null,
          tel,
          email,
        ];
      });
    return body;
  }

  return (
    <Button size="sm" variant="outline">
      <CSVLink
        data={data}
        filename={`${school.title}_${format(
          new Date(),
          "yyyy_MM_dd_HH_mm_ss"
        )}`}
        onClick={handleCsvDownload}
      >
        CSV
      </CSVLink>
    </Button>
  );
}
