"use client";
import { Button } from "../ui/button";
import { Drawer, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "../ui/drawer";
import { Item } from "./PublicMeasureCard";
import Image from "next/image";
import { UseFormReturn } from "react-hook-form";
import { useState } from "react";
import { Product } from "@/utils/product.interface";
import PublicMeasureSelect from "./PublicMeasureSelect";
import PublicMeasureQuantity from "./PublicMeasureQuantity";
import PublicMeasureInseam from "./PublicMeasureInseam";

interface Props {
  open: boolean;
  setOpen: (bool: boolean) => void;
  product: Product;
  item: Item | undefined;
  form: UseFormReturn<any, any>;
  index: number;
}

export default function PublicMeasureDrawer({ open, setOpen, product, item, form, index }: Props) {
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [cutLength, setCutLength] = useState(0);
  const [isNoInseam, setNoInseam] = useState(false);

  function handleClick() {
    if (!open) return;
    if (!item) return;

    form.setValue(`products.${index}.name`, item.name);

    if (item.color.length === 0) {
      form.setValue(`products.${index}.color`, "-");
    } else if (item.color.length === 1) {
      console.log(item.color.join());
      form.setValue(`products.${index}.color`, item.color.join());
    } else {
      console.log(color);
      form.setValue(`products.${index}.color`, color);
    }

    if (item.size.length === 0) {
      form.setValue(`products.${index}.size`, "F");
    } else if (item.size.length === 1) {
      console.log(item.size.join());
      form.setValue(`products.${index}.size`, item.size.join());
    } else {
      console.log(size);
      form.setValue(`products.${index}.size`, size);
    }

    if (product.quantity.min === product.quantity.max) {
      form.setValue(`products.${index}.quantity`, product.quantity.min);
    } else {
      form.setValue(`products.${index}.quantity`, quantity);
    }

    if (item.inseam.min === item.inseam.max) {
      form.setValue(`products.${index}.cutLength`, item.inseam.min);
    } else {
      form.setValue(`products.${index}.cutLength`, cutLength);
    }

    setOpen(false);
  }

  if (!item) return null;
  return (
    <>
      {open && (
        <>
          <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger>Open</DrawerTrigger>
            <DrawerContent>
              <div className="w-full max-w-[600px] mx-auto">
                <DrawerHeader>
                  <DrawerTitle>選択してください</DrawerTitle>
                </DrawerHeader>
                <DrawerDescription></DrawerDescription>
                <div className="space-y-4 px-4">
                  <div className="w-full mx-auto space-y-5 p-5">
                    <Image
                      src={item.images.productUrl ? item.images.productUrl : "/images/noImage.png"} width={150} height={150} alt={item.name}
                    />
                  </div>
                  <PublicMeasureSelect
                    value={color}
                    setValue={setColor}
                    array={item.color}
                    label="カラー"
                  />
                  <PublicMeasureSelect
                    value={size}
                    setValue={setSize}
                    array={item.size}
                    label="サイズ"
                  />
                  <PublicMeasureQuantity
                    value={quantity}
                    setValue={setQuantity}
                    min={product.quantity.min}
                    max={product.quantity.max}
                    label="数量"
                  />
                  <PublicMeasureInseam
                    item={item}
                    value={cutLength}
                    setValue={setCutLength}
                    min={item.inseam.min}
                    max={item.inseam.max}
                    label="股下"
                    unit="cm"
                    isSwitch={true}
                    check={isNoInseam}
                    setCheck={setNoInseam}
                  />
                </div>
                <DrawerFooter className="grid grid-cols-2 gap-3 mt-6 ">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setOpen(false)}
                  >
                    戻る
                  </Button>
                  <Button onClick={handleClick}>
                    選択する
                  </Button>
                </DrawerFooter>
              </div>
            </DrawerContent>
          </Drawer>
        </>)}
    </>
  );
}