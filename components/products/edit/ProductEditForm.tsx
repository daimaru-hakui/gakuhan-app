import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { db } from "@/firebase/client";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  collection,
  doc,
  getCountFromServer,
  updateDoc,
} from "firebase/firestore";
import React, { useTransition } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import ProductGenderSelectButton from "../ProductGenderSelectButton";
import ProductRequireSwitch from "../ProductRequireSwitch";
import ProductQuantityInput from "../ProductQuantityInput";
import { cn } from "@/lib/utils";
import ProductItemInputs from "../ProductItemInputs";
import { Product } from "@/utils/product.interface";
import Link from "next/link";
import paths from "@/utils/paths";
import { toast } from "sonner";
import { SubmitRhkButton } from "@/components/form/Buttons";
import TextAreaInput from "@/components/form/TextAreaInput";
import { CreateProduct, CreateProductSchema } from "@/utils/schemas";

interface Props {
  setIsActive?: (bool: boolean) => void;
  id: string;
  product: Product;
}

export default function ProductEditForm({ id, setIsActive, product }: Props) {
  const [pending, startTransaction] = useTransition();
  const form = useForm<CreateProduct>({
    resolver: zodResolver(CreateProductSchema),
    defaultValues: product,
  });
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "items",
  });

  async function onSubmit(data: CreateProduct) {
    console.log(data);
    await updateProduct(data);
  }

  async function updateProduct(data: CreateProduct) {
    try {
      const productRef = doc(db, "schools", id, "products", product.id);
      startTransaction(async () => {
        await updateDoc(productRef, data);
      });
      toast.success(`商品を更新しました`);
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
  return (
    <Form {...form}>
      <form className="w-full space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="w-full pl-1 pr-7 space-y-6">
          <ProductGenderSelectButton<CreateProduct> form={form} />
          <ProductRequireSwitch form={form} />
          <ProductQuantityInput form={form} />
          <TextAreaInput name="description" label="説明分" form={form} />
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
          <div className="text-center">
            <Button type="button" onClick={addProduct}>
              商品を追加する
            </Button>
          </div>
        </div>
        <div className="flex justify-between gap-3 pr-7">
          <Button type="button" variant="outline" className="w-full" asChild>
            <Link href={paths.schoolShow(id)}>キャンセル</Link>
          </Button>
          <SubmitRhkButton
            isValid={pending}
            isPending={pending}
            text="商品を更新する"
            className="w-full"
          />
        </div>
      </form>
    </Form>
  );
}
