"use client";
import React, { useState } from "react";
import { SubmitRhkButton } from "../form/Buttons";
import { UseFormReturn } from "react-hook-form";
import { CreateMeasureStudent } from "@/utils/schemas";

interface Props {
  form: UseFormReturn<CreateMeasureStudent, any, any>;
  totalCount: number;
  pending: boolean;
}

export default function MeasureButtonArea({
  form,
  totalCount,
  pending,
}: Props) {
  

  const count = form.watch(`products`).filter((product) => {
    let array = [];
    array.push(product.name ? true : false);
    array.push(product.color ? true : product.color === null ? true : false);
    array.push(product.size ? true : false);
    array.push(product.quantity || product.quantity === 0 ? true : false);
    array.push(product.cutLength || product.cutLength === 0 ? true : false);
    const result = array.every((value) => value);
    return result;
  }).length;

  return (
    <div
      style={{ boxShadow: "1px 1px 5px 5px rgba(0,0,0,.1)" }}
      className="w-full grid grid-cols-[120px_1fr] justify-around items-center h-12 px-5 bg-white fixed bottom-0 left-0 z-50"
    >
      <div className="text-center">
        {count}/{totalCount}
      </div>
      <SubmitRhkButton
        text="登録"
        className="w-full"
        isPending={pending}
        // isValid={count !== totalCount ? true : false}
      />
    </div>
  );
}
