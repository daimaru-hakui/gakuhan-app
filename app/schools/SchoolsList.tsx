'use client';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import { RiDeleteBin6Line, RiEditLine } from "react-icons/ri";

const schools = [
  {
    id: 1,
    title: "１２３大学",
    scheduledDate: format(new Date(), 'yyyy-MM-dd'),
    gender: "男女兼用",
  },
  {
    id: 2,
    title: "１２３大学",
    scheduledDate: format(new Date(), 'yyyy-MM-dd'),
    gender: "男女兼用",
  },
  {
    id: 3,
    title: "１２３大学",
    scheduledDate: format(new Date(), 'yyyy-MM-dd'),
    gender: "男女兼用",
  },

];

export default function SchoolsList() {
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
            <TableCell className="font-medium">{school.scheduledDate}</TableCell>
            <TableCell>{school.gender}</TableCell>
            <TableCell className="text-right">
              <div className="flex gap-3">
                <RiEditLine size={24} color='gray' className="cursor-pointer" />
                <RiDeleteBin6Line size={24} color='red' className="cursor-pointer" />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}