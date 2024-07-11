"use client";
import React from "react";
import { LoadingButton } from "../form/Buttons";
import { UseFormReturn } from "react-hook-form";
import { CreateMeasureStudent } from "@/utils/schemas";
import { Button } from "../ui/button";
import { FaCheck } from "react-icons/fa";
import Link from "next/link";

interface Props {
  id: string;
  studentId: string;
  form: UseFormReturn<CreateMeasureStudent, any, any>;
  totalCount: number;
  pending: boolean;
  open: boolean;
  setOpen: (bool: boolean) => void;
  onStudentRegister: (data: CreateMeasureStudent) => void;
  data?: CreateMeasureStudent;
  type?: string;
}

export default function MeasureButtonArea({
  id,
  studentId,
  form,
  totalCount,
  pending,
  open,
  setOpen,
  onStudentRegister,
  data,
  type,
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
          <div className="grid grid-cols-1 items-center justify-center border rounded-md p-1 h-9">
            {count === totalCount ? (
              <FaCheck className="mx-auto" />
            ) : (
              <span className="mx-auto">{`${count} / ${totalCount}`}</span>
            )}
          </div>
          <div className="flex gap-3">
            {type === "edit" && (
              <Button variant="outline" asChild>
                <Link href={`/schools/${id}/students/${studentId}`}>
                  編集キャンセル
                </Link>
              </Button>
            )}
            <Button
              className="w-full text-muted"
              disabled={count !== totalCount ? true : false}
            >
              次へ
            </Button>
          </div>
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
            text={type === "edit" ? "更新" : "登録"}
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
