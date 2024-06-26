"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { db } from "@/firebase/client";
import { School } from "@/utils/school.interface";
import { format } from "date-fns";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { HiCheck } from "react-icons/hi";
import { RxDotFilled } from "react-icons/rx";
import LoaderIcon from "../LoaderIcon";
import SchoolsEditWithDeleteButon from "./SchoolsEditWithDeleteButon";

export default function SchoolsList() {
  const [schools, setSchools] = useState<School[]>();

  useEffect(() => {
    const schoolsRef = collection(db, "schools");
    const q = query(
      schoolsRef,
      orderBy("createdAt", "desc"),
      where("isDeleted", "==", false)
    );
    const unsub = onSnapshot(q, {
      next: (snapshot) => {
        setSchools(
          snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id } as School))
        );
      },
      error: (e) => {
        console.log(e.message);
      },
    });
    return () => unsub();
  }, []);

  if (!schools) return <LoaderIcon />;

  return (
    <Table className="min-w-[500px]">
      <TableHeader>
        <TableRow>
          <TableHead className="min-w-[300px]">学校名</TableHead>
          <TableHead className="min-w-[150px]">採寸日</TableHead>
          <TableHead className="min-w-[120px] text-center">
            性別記入の表示
          </TableHead>
          <TableHead className="min-w-[120px] text-center">
            住所欄の表示
          </TableHead>
          <TableHead className="min-w-[120px] text-center">
            送料の有無
          </TableHead>
          <TableHead className="min-w-[150px]">登録日</TableHead>
          <TableHead className="min-w-[120px]">actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {schools.map((school) => (
          <TableRow key={school.id}>
            <TableCell className="font-medium">{school.title}</TableCell>
            <TableCell className="font-medium">
              {format(school?.scheduledDate.toDate(), "yyyy年MM月dd日")}
            </TableCell>

            <TableCell>
              <div className="flex justify-center">
                {school?.isGender ? (
                  <HiCheck className="text-primary" />
                ) : (
                  <RxDotFilled className="text-muted" />
                )}
              </div>
            </TableCell>
            <TableCell>
              <div className="flex justify-center">
                {school?.isAddress ? (
                  <HiCheck className="text-primary" />
                ) : (
                  <RxDotFilled className="text-muted" />
                )}
              </div>
            </TableCell>
            <TableCell>
              <div className="flex justify-center">
                {school?.isShipping ? (
                  <HiCheck className="text-primary" />
                ) : (
                  <RxDotFilled className="text-muted" />
                )}
              </div>
            </TableCell>
            <TableCell className="font-medium">
              {format(school?.createdAt.toDate(), "yyyy年MM月dd日")}
            </TableCell>
            <TableCell className="text-right">
              <SchoolsEditWithDeleteButon school={school} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
