"use client";
import { FiPlus } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ProductForm from "./ProductForm";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function ProductCreateModal({ id }: { id: string }) {
  const [isActive, setIsActive] = useState(false);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="default" className="mt-6">
          <div>商品追加</div>
        </Button>
      </DialogTrigger>
      <DialogContent
        className={cn(
          `max-w-full h-[calc(100vh-50px)] pr-0`,
          isActive ? "md:max-w-[1200px]" : "md:max-w-[600px]"
        )}
      >
        <DialogHeader>
          <DialogTitle>商品追加</DialogTitle>
        </DialogHeader>
        <ProductForm setIsActive={setIsActive} id={id} />
      </DialogContent>
    </Dialog>
  );
}
