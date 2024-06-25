"use client";
import { Product } from "@/utils/product.interface";
import { Reorder } from "framer-motion";
import { useEffect, useState, useTransition } from "react";
import LoaderIcon from "../LoaderIcon";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase/client";
import LoadingButton from "../form/LoadingButton";
import { cn } from "@/lib/utils";
import GenderBadge from "../GenderBadge";

interface Props {
  id: string;
  products: Product[];
}
export default function ProductDragAndDrop({ id, products }: Props) {
  const [items, setItems] = useState<Product[]>([]);
  const [pending, startTransaction] = useTransition();
  useEffect(() => {
    setItems(products);
  }, [products]);


  async function handleClickSort() {
    startTransaction(async () => {
      await updateProductsSort();
    });
  };

  async function updateProductsSort() {
    const newProducts = items.map(
      (product, index) => ({ id: product.id, sortNum: index + 1 }));
    for (const product of newProducts) {
      const productRef = doc(db, "schools", id, "products", product.id);
      await updateDoc(productRef, {
        sortNum: product.sortNum
      });
    }
  }

  if (!items) return <LoaderIcon />;

  return (
    <Dialog>
      <DialogTrigger>
        <Button
          variant="outline"
          size="sm"
          className="h-8"
        >
          並び替え
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>並び替え</DialogTitle>
        </DialogHeader>
        <Reorder.Group axis='y' values={items} onReorder={setItems}
          className="flex flex-col space-y-3">
          {items.map(item => (
            <Reorder.Item
              key={item.id}
              value={item}
              className={cn("flex items-center gap-3 w-full bg-white border rounded-md p-3 cursor-pointer")}
            >
              <GenderBadge gender={item.gender} />
              <p>
                {item.items.map(item =>
                  <span key={item.name} className="">
                    {item.name}
                  </span>
                )}
              </p>
            </Reorder.Item>
          ))}
        </Reorder.Group>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              閉じる
            </Button>
          </DialogClose>
          <LoadingButton
            pending={pending}
            props={{ onClick: handleClickSort }}
          >
            更新する
          </LoadingButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}