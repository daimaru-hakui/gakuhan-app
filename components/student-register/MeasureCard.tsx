"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Product } from "@/utils/product.interface";
import { UseFormReturn } from "react-hook-form";
import { cn } from "@/lib/utils";
import { Separator } from "../ui/separator";
import MeasureDrawer from "./MeasureDrawer";
import MeasureCardHeader from "./MeasureCardHeader";
import { CreateMeasureStudent } from "@/utils/schemas";
import MeasureCardFooter from "./MeasureCardFooter";

interface Props {
  product: Product;
  form: UseFormReturn<CreateMeasureStudent, any, any>;
  index: number;
}

export interface Item {
  name: string;
  size: string[];
  color: string[];
  price: number;
  unit: string;
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

export default function MeasureCard({ product, form, index }: Props) {
  const [open, setOpen] = useState(false);
  const [isNoItem, setIsNoItem] = useState(
    form.getValues(`products.${index}.name`) === null ? true : false
  );
  const [item, setItem] = useState<Item>();
  const [isNoInseam, setIsNoInseam] = useState(false);
  const [compleate, setCompleate] = useState(false);
  const name = form.getValues(`products.${index}.name`) as string;

  function handleOpenClick(value: Item | undefined) {
    if (!value) return;
    setOpen(true);
    setItem(value);
  }

  return (
    <section
      key={product.id}
      className={cn("p-3 border", compleate ? "border-primary" : "")}
    >
      <MeasureCardHeader
        product={product}
        isNoItem={isNoItem}
        setIsNoItem={setIsNoItem}
        form={form}
        index={index}
      />
      <Separator />
      {product.items.length === 1 ? (
        <div
          className={cn(
            "p-3 space-y-1 cursor-pointer",
            isNoItem && "opacity-10"
          )}
          onClick={() => handleOpenClick(product.items.at(0))}
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
          <p>{product.description}</p>
        </div>
      ) : (
        <div className={cn("p-3 grid grid-cols-2 gap-3", isNoItem && "opacity-10")}>
          {product.items.map((item) => (
            <div
              key={item.name}
              className={cn(
                "flex flex-col space-y-1 w-full h-full cursor-pointer"
              )}
              onClick={() => handleOpenClick(item)}
            >
              <Image
                src={item.images.productUrl || "/images/noImage.png"}
                alt=""
                width={200}
                height={200}
                className={cn(
                  "border p-1 rounded-md w-full h-full object-contain",
                  name === item.name ? "border-black" : ""
                )}
              />
              <h3 className="font-semibold">{item.name}</h3>
              <div>￥{item.price}</div>
              <p>{product.description}</p>
            </div>
          ))}
        </div>
      )}
      <MeasureCardFooter
        isNoItem={isNoItem}
        form={form}
        index={index}
        setCompleate={setCompleate}
        unit={item?.unit}
      />
      <MeasureDrawer
        open={open}
        setOpen={setOpen}
        product={product}
        item={item}
        form={form}
        index={index}
        isNoInseam={isNoInseam}
        setIsNoInseam={setIsNoInseam}
      />
    </section>
  );
}
