"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProductCreateModal } from "./ProductCreateModal";
import { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "@/firebase/client";
import { Product } from "@/utils/product.interface";
import ProductsList from "./ProductsList";
import ProductDragAndDrop from "./ProductDragAndDrop";
import LoaderIcon from "../LoaderIcon";

export default function ProductContainer({ id }: { id: string; }) {
  const [products, setProducts] = useState<Product[]>();

  useEffect(() => {
    const productsRef = collection(db, "schools", id, "products");
    const q = query(productsRef, orderBy("sortNum", "asc"));
    onSnapshot(q, {
      next: (snapshot) => {
        setProducts(
          snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id } as Product))
        );
      },
      error: (e) => {
        console.log(e);
      },
    });
  }, [id]);

  if (!products) return <LoaderIcon />;

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row justify-between items-center">
        <CardTitle className="whitespace-pre-line">商品</CardTitle>
        <div className="flex justify-end items-center gap-3 mb-3">
          {products.length > 1 && (
            <ProductDragAndDrop id={id} products={products} />
          )}
          <ProductCreateModal id={id} />
        </div>
      </CardHeader>
      <CardContent>
        <ProductsList id={id} products={products} />
      </CardContent>
    </Card>
  );
}
