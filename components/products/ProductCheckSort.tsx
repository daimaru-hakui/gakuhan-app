import React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Product } from "@/utils/product.interface";
import { cn } from "@/lib/utils";

interface Props {
  products: Product[];
}

export default function ProductCheckSort({ products }: Props) {
  const SortComponent = ({
    product,
    className = "",
  }: {
    product: Product;
    className?: string;
  }) => {
    return (
      <div
        key={product.id}
        className={cn(
          "flex items-center w-full bg-white border rounded-md p-1 overflow-hidden",
          className
        )}
      >
        <div>
          {product.items.map((item, index) => (
            <div key={index}>{item.name}</div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="h-8">
          順番確認
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full max-w-[900px] max-h-[calc(100vh-40px)] overflow-auto">
        <DialogHeader>
          <DialogTitle>順番確認</DialogTitle>
        </DialogHeader>
        <DialogDescription>採寸時の商品掲載順序の確認</DialogDescription>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-2 text-xs whitespace-nowrap text-ellipsis">
          <div className="space-y-1">
            <h3>性別記入無し</h3>
            {products
              .filter((product) => product.gender === "other")
              .map((product) => (
                <SortComponent key={product.id} product={product} />
              ))}
          </div>
          <div className="space-y-1">
            <h3>男性用</h3>
            {products
              .filter((product) => product.gender !== "woman")
              .map((product) => (
                <SortComponent
                  key={product.id}
                  product={product}
                  className={
                    product.gender === "man"
                      ? "border-blue-400 text-blue-400"
                      : ""
                  }
                />
              ))}
          </div>
          <div className="space-y-1">
            <h3>女性用</h3>
            {products
              .filter((product) => product.gender !== "man")
              .map((product) => (
                <SortComponent
                  key={product.id}
                  product={product}
                  className={
                    product.gender === "woman"
                      ? "border-red-400 text-red-400"
                      : ""
                  }
                />
              ))}
          </div>
        </div>

        <DialogFooter className="w-full">
          <DialogClose>
            <Button type="button" variant="secondary" className="w-full">
              閉じる
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
