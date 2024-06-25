import React, { useEffect, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { CreateProduct } from "@/utils/schemas";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

interface Props {
  form: UseFormReturn<CreateProduct, any, undefined>;
  index: number;
  label?: string;
  defaultvalue?: string[];
}
export default function ProductColorInput({ form, index, label }: Props) {
  const [value, setValue] = useState([].join(","));

  useEffect(() => {
    const array = value
      .trim()
      .split(/[,、]/)
      .filter((v) => v);
    form.setValue(`items.${index}.color`, array);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, value]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const text = e.target.value;
    setValue(text);
  }

  return (
    <div>
      <Label>{label}</Label>
      <Input
        className="mt-2 shadow-none"
        onChange={handleChange}
        value={value}
        placeholder="ホワイト,ブラック,ブルーとカンマで区切って入力してください"
      />
    </div>
  );
}
