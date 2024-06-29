"use client";
import { Button } from "../ui/button";
import { Drawer, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "../ui/drawer";
import { Item } from "./PublicMeasureCard";
import Image from "next/image";
import { FormSelect } from "../form/FormSelect";
import { UseFormReturn } from "react-hook-form";
import { useEffect, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import PublicMeasureSelect from "./PublicMeasureSelect";

interface Props {
  open: boolean;
  setOpen: (bool: boolean) => void;
  item: Item | undefined;
  form: UseFormReturn<any, any>;
  index: number;
}

export default function PublicMeasureDrawer({ open, setOpen, item, form, index }: Props) {
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");

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

    setOpen(false);
  }

  if (!item) return;
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
                <div className="space-y-2 px-4">
                  <div className="w-full mx-auto space-y-5 p-5">
                    <Image
                      src={item.images.productUrl ? item.images.productUrl : "/images/noImage.png"} width={150} height={150} alt={item.name}
                    />
                  </div>
                  {item.color.length <= 1 ? (
                    item.color.length === 0 ? <></> : <div>{item.color.join()}</div>
                  ) : (
                    <PublicMeasureSelect
                      value={color}
                      setValue={setColor}
                      array={item.color}
                    />
                  )}
                  {item.size.length <= 1 ? (
                    item.size.length === 0 ? <></> : <div>{item.size.join()}</div>
                  ) : (
                    <PublicMeasureSelect
                      value={size}
                      setValue={setSize}
                      array={item.size}
                    />
                  )}
                </div>
                <DrawerFooter className="grid grid-cols-2 gap-3">
                  <Button type="button" variant="outline" onClick={() => setOpen(false)}>
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