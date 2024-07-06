"use client";
import { UseFormReturn } from "react-hook-form";
import MeasureLabel from "./MeasureLabel";
import { CreateMeasureStudent } from "@/utils/schemas";
import { useEffect } from "react";
import { Separator } from "../ui/separator";

interface Props {
  isNoItem: boolean;
  index: number;
  form: UseFormReturn<CreateMeasureStudent, any, any>;
  setCompleate: (bool: boolean) => void;
  unit: string | undefined;
}
export default function MeasureCardFooter({ isNoItem, index, form, setCompleate, unit = "" }: Props) {

  const name = form.getValues(`products.${index}.name`) as string;
  const color = form.getValues(`products.${index}.color`) as string;
  const size = form.getValues(`products.${index}.size`) as string;
  const cutLength = form.getValues(`products.${index}.cutLength`) as number;
  const quantity = form.getValues(`products.${index}.quantity`) as number;

  useEffect(() => {
    const n = name ? true : name === null ? true : false;
    const c = color ? true : color === null ? true : false;
    const s = size ? true : size === null ? true : false;
    const l = cutLength || cutLength === 0 ? true : false;
    const q = quantity || quantity === 0 ? true : false;
    setCompleate([n, c, s, l, q].every((v) => v));
  }, [name, color, size, cutLength, quantity, setCompleate]);

  return (
    <>
      {!isNoItem && (
        <>
          <Separator />
          <footer className="mt-3 flex gap-1">
            {form.getValues(`products.${index}.color`) !== null && (
              <MeasureLabel property={color} text="カラー" />
            )}

            {form.getValues(`products.${index}.size`) !== null && (
              <MeasureLabel property={size} text="サイズ" />
            )}
            {form.getValues(`products.${index}.inseam.isFlag`) !== false && (
              <MeasureLabel property={cutLength} text="股下" unit="cm" />
            )}
            <MeasureLabel property={quantity} text="数量" unit={unit} />
          </footer>
        </>
      )}
    </>
  );
}