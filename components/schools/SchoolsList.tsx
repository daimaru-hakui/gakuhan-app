"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { db } from "@/lib/firebase/client";
import { School } from "@/utils/school.type";
import { format } from "date-fns";
import { collection, onSnapshot } from "firebase/firestore";
import Link from "next/link";
import { useEffect, useState } from "react";
import { RiDeleteBin6Line, RiEditLine } from "react-icons/ri";

export default function SchoolsList() {
  const [schools, setSchools] = useState<School[]>();

  useEffect(() => {
    const schoolsRef = collection(db, "schools");
    const unsub = onSnapshot(schoolsRef, {
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

  if (!schools) return <div></div>;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">学校名</TableHead>
          <TableHead>採寸日</TableHead>
          <TableHead>gender</TableHead>
          <TableHead className="text-right">actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {schools.map((school) => (
          <TableRow key={school.id}>
            <TableCell className="font-medium">{school.title}</TableCell>
            <TableCell className="font-medium">
              {format(school?.scheduledDate.toDate(), "yyyy年MM月dd日")}
            </TableCell>
            <TableCell>{school?.isGender}</TableCell>
            <TableCell className="text-right">
              <div className="flex gap-3">
                <Link href={`/schools/${school.id}`}>
                  <RiEditLine
                    size={24}
                    color="gray"
                    className="cursor-pointer"
                  />
                </Link>
                <RiDeleteBin6Line
                  size={24}
                  color="red"
                  className="cursor-pointer"
                />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
