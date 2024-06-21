import React from "react";
import { FormInput } from "../form/FormInput";
import { UseFormReturn } from "react-hook-form";
import { CreateProduct } from "@/utils/schemas";
import { FiTrash2 } from "react-icons/fi";
import ProductSizeInput from "./ProductSizeInput";
import ProductColorInput from "./ProductColorInput";
import ProductInseamInput from "./ProductInseamInput";

interface Props {
  form: UseFormReturn<CreateProduct, any, undefined>;
  index: number;
  removeProduct: () => void;
}

export default function ProductItemInputs({
  form,
  index,
  removeProduct,
}: Props) {
  return (
    <div className="border rounded-md p-3">
      <div className="flex justify-between items-center">
        <span className="flex items-center justify-center border w-8 h-8 rounded-full bg-primary text-muted">
          {index + 1}
        </span>
        {index !== 0 && (
          <FiTrash2 onClick={removeProduct} className="cursor-pointer" />
        )}
      </div>
      <div className="mt-3 space-y-3">
        <div className="grid md:grid-cols-[1fr_100px] gap-3">
          <FormInput
            type="text"
            form={form}
            name={`items.${index}.name`}
            label="商品名"
            require
          />
          <FormInput
            type="number"
            form={form}
            name={`items.${index}.price`}
            label="価格"
          />
        </div>
        <ProductSizeInput form={form} label="サイズ" index={index} />
        <ProductColorInput form={form} label="カラー" index={index} />
        <ProductInseamInput form={form} index={index} />
      </div>
    </div>
  );
}
