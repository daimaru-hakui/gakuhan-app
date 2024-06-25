"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProductCreateModal } from "./ProductCreateModal";
import { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "@/firebase/client";
import { Product } from "@/utils/product.interface";
import ProductsList from "./ProductsList";

export default function ProductContainer({ id }: { id: string }) {
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

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="whitespace-pre-line">商品</CardTitle>
      </CardHeader>
      <CardContent className="text-center">
        <ProductsList id={id} products={products} />
        <ProductCreateModal id={id} />
      </CardContent>
    </Card>
  );
}
