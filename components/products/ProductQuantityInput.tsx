import React from "react";
import { FormInput } from "../form/FormInput";
import { UseFormReturn } from "react-hook-form";
import { CreateProduct } from "@/utils/schemas";

interface Props {
  form: UseFormReturn<CreateProduct, any, undefined>;
}

export default function ProductQuantityInput({ form }: Props) {
  return (
    <div className="flex items-end gap-3">
      <FormInput
        type="number"
        form={form}
        label="数量範囲"
        name={`quantity.min`}
        className="w-24"
        InputProps={{ min: 0 }}
      />
      <span className="h-10">~</span>
      <FormInput
        type="number"
        form={form}
        name={`quantity.max`}
        className="w-24"
        InputProps={{ min: form.watch("quantity.min") }}
      />
    </div>
  );
}
