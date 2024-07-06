"use client";
import React from "react";
import { LoadingButton } from "../form/Buttons";
import { UseFormReturn } from "react-hook-form";
import { CreateMeasureStudent } from "@/utils/schemas";
import { Button } from "../ui/button";

interface Props {
  form: UseFormReturn<CreateMeasureStudent, any, any>;
  totalCount: number;
  pending: boolean;
  open: boolean;
  setOpen: (bool: boolean) => void;
  onStudentRegister: (data: CreateMeasureStudent) => void;
  data?: CreateMeasureStudent;
}

export default function MeasureButtonArea({
  form,
  totalCount,
  pending,
  open,
  setOpen,
  onStudentRegister,
  data,
}: Props) {
  const count = form.watch(`products`).filter((product) => {
    let array = [];
    array.push(product.name ? true : product.name === null ? true : false);
    array.push(product.color ? true : product.color === null ? true : false);
    array.push(product.size ? true : product.size === null ? true : false);
    array.push(product.quantity || product.quantity === 0 ? true : false);
    array.push(product.cutLength || product.cutLength === 0 ? true : false);
    const result = array.every((value) => value);
    return result;
  }).length;
  return (
    <div
      style={{ boxShadow: "1px 1px 5px 5px rgba(0,0,0,.1)" }}
      className="w-full grid grid-cols-[120px_1fr] gap-3 justify-around items-center h-12 px-5 bg-white fixed bottom-0 left-0 z-50"
    >
      {!open ? (
        <>
          <div
            className="text-center border rounded-md p-1"
          >
            {count}/{totalCount}
          </div>
          <Button
            className="w-full text-muted"
            disabled={count !== totalCount ? true : false}
          >
            次へ
          </Button>
        </>
      ) : (
        <>
          <Button
            type="button"
            variant="secondary"
            className="text-center"
            onClick={() => setOpen(false)}
          >
            戻る
          </Button>
          <LoadingButton
            text="登録"
            className="w-full"
            isPending={pending}
            isValid={count !== totalCount ? true : false}
            props={{ onClick: () => data && onStudentRegister(data) }}
          />
        </>
      )}
    </div>
  );
}
