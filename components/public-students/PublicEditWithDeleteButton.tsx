import React, { useState } from "react";
import { Checkbox } from "../ui/checkbox";
import { useStore } from "@/store";

interface Props {
  id: string;
}

export default function PublicEditWithDeleteButton({ id }: Props) {
  const [checked, setChecked] = useState(false);
  const addStudentsCheckList = useStore((state) => state.addStudentsCheckList);
  const removeStudentsCheckList = useStore(
    (state) => state.removeStudentsCheckList
  );

  function handleCheck(e: boolean) {
    if (e) {
      setChecked(true);
      addStudentsCheckList(id);
    } else {
      setChecked(false);
      removeStudentsCheckList(id);
    }
  }

  return (
    <div className="flex items-center space-x-2">
      <Checkbox id="terms" checked={checked} onCheckedChange={handleCheck} />
    </div>
  );
}
