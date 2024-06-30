"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Product } from "@/utils/product.interface";
import PublicMeasureDrawer from "./PublicMeasureDrawer";
import { UseFormReturn } from "react-hook-form";
import { cn } from "@/lib/utils";
import { Badge } from "../ui/badge";

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
  const [isNoInseam, setIsNoInseam] = useState(false);
  const name = form.getValues(`products.${index}.name`) as string;
  const color = form.getValues(`products.${index}.color`) as string;
  const size = form.getValues(`products.${index}.size`) as string;
  const cutLength = form.getValues(`products.${index}.cutLength`) as number;
  const quantity = form.getValues(`products.${index}.quantity`) as number;

  function handleClick(value: Item | undefined) {
    if (!value) return;
    setOpen(true);
    setItem(value);
  }
  return (
    <div key={product.id} className="p-3 border">
      <header className="flex justify-between mb-3">
        {product.isRequire
          ? <Badge variant="destructive">必須</Badge>
          : <Badge variant="outline">選択</Badge>}
        <span></span>
      </header>
      {product.items.length === 1 ? (
        <div className="space-y-1 cursor-pointer"
          onClick={() => handleClick(product.items.at(0))}
        >
          <Image
            src={product.items.at(0)?.images.productUrl || "/images/noImage.png"} alt="" width={200}
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
                  name === item.name ? 'border-black' : "")}
              />
              <h3 className="font-semibold">{item.name}</h3>
              <div>￥{item.price}</div>
            </div>
          ))}
        </div>
      )}
      <PublicMeasureDrawer
        open={open}
        setOpen={setOpen}
        product={product}
        item={item}
        form={form}
        index={index}
        isNoInseam={isNoInseam}
        setIsNoInseam={setIsNoInseam}
      />
      <div className="mt-3 flex gap-1">
        <PropertyStringLabel property={color} text="カラー" />
        <PropertyStringLabel property={size} text="サイズ" />
        {form.getValues(`products.${index}.inseam.isFlag`) && (
          <PropertyNumberLabel property={cutLength} text="股下" unit="cm" />
        )}
        <PropertyNumberLabel property={quantity} text="数量" />
      </div>
    </div>
  );
};

function PropertyStringLabel({ property, text, unit = "" }
  : { property: string | number; text: string; unit?: string; }) {
  return (
    <div
      className={cn("border font-semibold text-xs p-1",
        property ? "bg-primary text-muted" : ""
      )}>
      {(property ? `${property} ${unit}` : text + "未選択")}
    </div>
  );
};

function PropertyNumberLabel({ property, text, unit = "" }
  : { property: number; text: string; unit?: string; }) {
  return (
    <div
      className={cn("border font-semibold text-xs p-1",
        property || property === 0 ? "bg-primary text-muted" : ""
      )}>
      {(property
        ? `${property} ${unit}`
        : property === 0 ? text + "不要" : text + "未選択")}
    </div>
  );
};;
