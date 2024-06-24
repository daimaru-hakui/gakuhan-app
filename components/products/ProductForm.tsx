"use client";
import React from "react";
import { FieldValue, useFieldArray, useForm } from "react-hook-form";
import { Form } from "../ui/form";
import ProductItemInputs from "./ProductItemInputs";
import { CreateProduct, CreateProductSchema } from "@/utils/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { DialogClose, DialogFooter } from "../ui/dialog";
import ProductQuantityInput from "./ProductQuantityInput";
import { cn } from "@/lib/utils";
import ProductGenderSelectButton from "./ProductGenderSelectButton";
import ProductRequireSwitch from "./ProductRequireSwitch";
import {
  addDoc,
  collection,
  doc,
  getCountFromServer,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/firebase/client";

interface Props {
  setIsActive: (bool: boolean) => void;
  id: string;
}

export default function ProductForm({ setIsActive, id }: Props) {
  const form = useForm<CreateProduct>({
    resolver: zodResolver(CreateProductSchema),
    defaultValues: {
      gender: "other",
      isRequire: true,
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
          images: {
            productUrl: "",
            sizeUrl: "",
          },
          inseam: {
            isFlag: false,
            min: 1,
            max: 30,
            base: 0,
            price: 0,
            isUnNeededItem: false,
          },
        },
      ],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "items",
  });

  async function onSubmit(data: CreateProduct) {
    console.log(data);
    await createProduct(data);
  }

  async function createProduct(data: CreateProduct) {
    try {
      const schoolsRef = collection(db, "schools", id, "products");
      const snapshot = await getCountFromServer(schoolsRef);
      const count = snapshot.data().count;
      await addDoc(schoolsRef, {
        ...data,
        sortNum: count + 1,
      });
    } catch (e) {
      console.log(e);
    }
  }

  function addProduct() {
    append({
      name: "",
      price: 0,
      size: [],
      color: [],
      images: {
        productUrl: "",
        sizeUrl: "",
      },
      inseam: {
        isFlag: false,
        min: 1,
        max: 30,
        base: 0,
        price: 0,
        isUnNeededItem: false,
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
          <ProductGenderSelectButton form={form} />
          <ProductRequireSwitch form={form} />
          <ProductQuantityInput form={form} />
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
