import React, { useEffect, useState } from "react";
import { Checkbox } from "../ui/checkbox";
import { useStore } from "@/store";
import Link from "next/link";
import { RiEditLine } from "react-icons/ri";

interface Props {
  id: string;
  studentId: string;
  flag:boolean
}

export default function StudentEditWithDeleteButton({ id, studentId ,flag}: Props) {
  const [checked, setChecked] = useState(false);
  const studentsCheckList = useStore((state) => state.studentsCheckList);
  const addStudentsCheckList = useStore((state) => state.addStudentsCheckList);
  const removeStudentsCheckList = useStore(
    (state) => state.removeStudentsCheckList
  );

  useEffect(() => {
    if (studentsCheckList.includes(studentId)) {
      setChecked(true);
    } else {
      setChecked(false)
    }
  }, [flag]);

  function handleCheck(e: boolean) {
    if (e) {
      setChecked(true);
      addStudentsCheckList(studentId);
    } else {
      setChecked(false);
      removeStudentsCheckList(studentId);
    }
  }

  return (
    <div className="flex items-center gap-5">
      <Checkbox id="terms" checked={checked} onCheckedChange={handleCheck} />
      <Link href={`/schools/${id}/students/${studentId}/edit`}>
        <RiEditLine size={18} />
      </Link>
    </div>
  );
}
