"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Product } from "@/utils/product.interface";
import PublicMeasureDrawer from "./PublicMeasureDrawer";
import { UseFormReturn } from "react-hook-form";
import { cn } from "@/lib/utils";

interface Props {
  product: Product;
  form: UseFormReturn<any, any>;
  index: number;
}

export interface Item {
  name: string;
  size: string[];
  color: string[];
  price: number;
  images: {
    productUrl: string;
    sizeUrl: string;
  };
  inseam: {
    isFlag: boolean;
    min: number;
    max: number;
    base: number;
    price: number;
    isUnNeededItem: boolean;
  };
}

export default function PublicMeasureCard({ product, form, index }: Props) {
  const [open, setOpen] = useState(false);
  const [item, setItem] = useState<Item>();
  const color = form.getValues(`products.${index}.color`);
  const size = form.getValues(`products.${index}.size`);
  const quantity = form.getValues(`products.${index}.quantity`);

  function handleClick(value: Item | undefined) {
    if (!value) return;
    setOpen(true);
    setItem(value);
  }

  console.log(color);

  return (
    <div key={product.id} className="p-3 border">
      <div>{product.isRequire ? "必須" : "選択"}</div>
      {product.items.length === 1 ? (
        <div className="space-y-1 cursor-pointer"
          onClick={() => handleClick(product.items.at(0))}
        >
          <Image
            src={
              product.items.at(0)?.images.productUrl || "/images/noImage.png"
            }
            alt=""
            width={200}
            height={200}
            className="w-full"
          />
          <h3 className="font-semibold">{product.items.at(0)?.name}</h3>
          <div>￥{product.items.at(0)?.price}</div>
        </div>
      ) : (
        <div className={cn("grid grid-cols-2 gap-3")}>
          {product.items.map((item) => (
            <div key={item.name}
              className={cn("flex flex-col space-y-1 w-full h-full cursor-pointer")}
              onClick={() => handleClick(item)}
            >
              <Image
                src={item.images.productUrl || "/images/noImage.png"}
                alt=""
                width={200}
                height={200}
                className={cn("border p-1 rounded-md w-full h-full object-contain",
                  form.getValues(`products.${index}.name`) === item.name ? 'border-black' : "")}
              />
              <h3 className="font-semibold">{item.name}</h3>
              <div>￥{item.price}</div>
            </div>
          ))}
        </div>
      )}
      <PublicMeasureDrawer open={open} setOpen={setOpen} item={item} form={form} index={index} />
      <div className="mt-3 flex gap-3">
        {(color !== '') ?
          (
            <div className="border bg-primary text-muted  font-semibold p-2">
              {color}
            </div>
          ) : (
            <div className="border p-2">
              カラー未選択
            </div>
          )}

        {size !== '' ? (
          <div className="border bg-primary text-muted font-semibold p-2">
            {size}
          </div>
        ) : (
          <div className="border p-2">
            サイズ未選択
          </div>
        )}
      </div>
    </div>
  );
};
