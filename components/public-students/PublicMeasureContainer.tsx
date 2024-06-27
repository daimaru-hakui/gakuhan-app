import React from "react";
import PublicMeasureForm from "./PublicMeasureForm";
import { Student } from "@/utils/student.interface";

interface Props {
  student: Student;
}

export default function PublicMeasureContainer({ student }: Props) {
  return (
    <div className="max-w-[600px] mx-auto">
      <PublicMeasureForm student={student} />
    </div>
  );
}
