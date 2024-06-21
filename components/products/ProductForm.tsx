"use client";
import React from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { Form } from "../ui/form";
import ProductSelectInput from "./ProductSelectInput";
import ProductItemInputs from "./ProductItemInputs";
import { CreateProduct, CreateProductSchema } from "@/utils/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { DialogClose, DialogFooter } from "../ui/dialog";
import ProductQuantityInput from "./ProductQuantityInput";
import { cn } from "@/lib/utils";

interface Props {
  setIsActive: (bool: boolean) => void;
}

export default function ProductForm({ setIsActive }: Props) {
  const form = useForm<CreateProduct>({
    resolver: zodResolver(CreateProductSchema),
    defaultValues: {
      gender: "other",
      quantity: {
        min: 1,
        max: 10,
      },
      items: [
        {
          name: "",
          price: 0,
          size: [],
          color: [],
          inseam: {
            flag: false,
            min: 1,
            max: 30,
            base: 0,
          },
        },
      ],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "items",
  });

  function onSubmit(data: CreateProduct) {
    console.log(data);
  }

  function addProduct() {
    append({
      name: "",
      price: 0,
      size: [],
      color: [],
      inseam: {
        flag: false,
        min: 1,
        max: 30,
        base: 0,
      },
    });
  }

  function removeProduct(index: number) {
    remove(index);
  }

  setIsActive(form.watch("items").length > 1 ? true : false);

  return (
    <Form {...form}>
      <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="overflow-auto h-[calc(100vh-200px)] pl-1 pr-7 space-y-6">
          <div className="flex flex-col md:flex-row gap-3 md:gap-12">
            <ProductSelectInput form={form} label="区分" name="gender" />
            <ProductQuantityInput form={form} />
          </div>
          <div
            className={cn(
              "grid grid-cols-1 gap-3",
              form.watch("items").length > 1
                ? "md:grid-cols-2"
                : "md:grid-cols-1"
            )}
          >
            {fields.map((field, index) => (
              <ProductItemInputs
                key={field.id}
                form={form}
                index={index}
                removeProduct={removeProduct.bind(null, index)}
              />
            ))}
          </div>
          <Button type="button" onClick={addProduct}>
            商品を追加する
          </Button>
        </div>
        <DialogFooter className="flex flex-row justify-end gap-3 w-full pr-6">
          <DialogClose asChild>
            <Button type="button" variant="secondary" className="w-full">
              閉じる
            </Button>
          </DialogClose>
          <Button type="submit" className="w-full">
            登録
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
