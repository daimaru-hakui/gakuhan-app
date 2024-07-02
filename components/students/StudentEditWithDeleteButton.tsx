import React, { useState } from "react";
import { Checkbox } from "../ui/checkbox";
import { useStore } from "@/store";
import { Button } from "../ui/button";
import Link from "next/link";

interface Props {
  id: string;
  studentId: string;
}

export default function StudentEditWithDeleteButton({ id, studentId }: Props) {
  const [checked, setChecked] = useState(false);
  const addStudentsCheckList = useStore((state) => state.addStudentsCheckList);
  const removeStudentsCheckList = useStore(
    (state) => state.removeStudentsCheckList
  );

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
    <div className="flex items-center space-x-2">
      <Checkbox id="terms" checked={checked} onCheckedChange={handleCheck} />
      <Button size="sm" asChild>
        <Link href={`/schools/${id}/public-students/${studentId}`}>詳細</Link>
      </Button>
    </div>
  );
}
