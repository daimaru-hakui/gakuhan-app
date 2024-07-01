import React from "react";
import { FormInput } from "../form/FormInput";
import { UseFormReturn } from "react-hook-form";
import { CreateProduct } from "@/utils/schemas";
import { FiTrash2 } from "react-icons/fi";
import ProductSizeInput from "./ProductSizeInput";
import ProductColorInput from "./ProductColorInput";
import ProductInseamInput from "./ProductInseamInput";
import ProductImageInput from "./ProductImageInput";

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
    <div className="w-full border rounded-md p-3 space-y-3">
      <div className="flex justify-between items-center">
        <span className="flex items-center justify-center border w-8 h-8 rounded-full bg-primary text-muted">
          {index + 1}
        </span>
        {index !== 0 && (
          <FiTrash2 onClick={removeProduct} className="cursor-pointer" />
        )}
      </div>
      <div className="w-full flex flex-col mt-3 space-y-6">
        <FormInput
          type="text"
          form={form}
          name={`items.${index}.name`}
          label="商品名"
          require
        />
        <div className="w-full md:max-w-[200px] grid grid-cols-2 gap-3">
          <FormInput
            type="number"
            form={form}
            name={`items.${index}.price`}
            label="価格"
          />
          <FormInput
            type="text"
            form={form}
            placeholder="枚,個など"
            name={`items.${index}.unit`}
            label="単位"
          />
        </div>
        <ProductImageInput form={form} index={index} />
        <ProductSizeInput form={form} label="サイズ" index={index} />
        <ProductColorInput form={form} label="カラー" index={index} />
        <ProductInseamInput form={form} index={index} />
      </div>
    </div>
  );
}
