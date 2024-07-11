import React, { useEffect, useState } from "react";
import { Checkbox } from "../ui/checkbox";
import { useStore } from "@/store";
import Link from "next/link";
import { Button } from "../ui/button";

interface Props {
  id: string;
  studentId: string;
  flag: boolean;
}

export default function StudentEditWithDeleteButton({
  id,
  studentId,
  flag,
}: Props) {
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
      setChecked(false);
    }
  }, [flag, studentId]);

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
    <div className="grid grid-cols-3 gap-2 items-center">
      <Checkbox id="terms" checked={checked} onCheckedChange={handleCheck} />
      <Button size="sm" className="w-12">
        <Link href={`/schools/${id}/students/${studentId}`}>詳細</Link>
      </Button>
    </div>
  );
}
