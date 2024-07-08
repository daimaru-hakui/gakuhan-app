"use client";
import { Product } from "@/utils/product.interface";
import Link from "next/link";
import React, { useTransition } from "react";
import { RiDeleteBin6Line, RiEditLine } from "react-icons/ri";
import { Button } from "../ui/button";
import { LuLoader2 } from "react-icons/lu";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebase/client";
import paths from "@/utils/paths";
import { useStore } from "@/store";

interface Props {
  id: string;
  product: Product;
}

export default function ProductEditWithDeleteButton({ id, product }: Props) {
  const [pending, startTransaction] = useTransition();
  const studentsCount = useStore((state) => state.studentsCount);

  async function handleClickProductDelete(productId: string) {
    const result = confirm("削除して宜しいでしょうか");
    if (!result) return;
    startTransaction(async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      await deleteProduct(productId);
    });
  }
  async function deleteProduct(productId: string) {
    const productRef = doc(db, "schools", id, "products", productId);
    const productsRef = collection(db, "schools", id, "products");
    await deleteDoc(productRef);

    const q = query(productsRef, orderBy("sortNum", "asc"));
    const snapshot = await getDocs(q);
    const products = snapshot.docs.map(
      (doc, idx) => ({ id: doc.id, sortNum: idx + 1 } as Product)
    );
    for (const product of products) {
      const productRef = doc(db, "schools", id, "products", product.id);
      await updateDoc(productRef, {
        sortNum: product.sortNum,
      });
    }
  }
  return (
    <>
      <Button variant="outline" className="w-8 h-8 p-0 hover:bg-white" asChild>
        <Link
          className="block"
          href={paths.productEdit({
            schoolId: id,
            productId: product.id,
          })}
        >
          <RiEditLine size={18} />
        </Link>
      </Button>
      <Button
        disabled={studentsCount ? true : false}
        variant="outline"
        className="w-8 h-8 p-0 hover:bg-white"
      >
        {pending ? (
          <LuLoader2 className="h-4 w-4 animate-spin" />
        ) : (
          <RiDeleteBin6Line
            color=""
            size={18}
            className="cursor-pointer"
            onClick={() => handleClickProductDelete(product.id)}
          />
        )}
      </Button>
    </>
  );
}
