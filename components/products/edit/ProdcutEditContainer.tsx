"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { db } from "@/firebase/client";
import { doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import ProductEditForm from "./ProductEditForm";
import { Product } from "@/utils/product.interface";
import LoaderIcon from "@/components/LoaderIcon";

interface Props {
  id: string;
  productId: string;
}

export default function ProdcutEditContainer({ id, productId }: Props) {
  const [product, setProduct] = useState<Product>();
  useEffect(() => {
    const productRef = doc(db, "schools", id, "products", productId);
    onSnapshot(productRef, {
      next: (snapshot) => {
        setProduct({ ...snapshot.data(), id: snapshot.id } as Product);
      },
      error: (e) => {
        console.log(e);
      },
    });
  }, [id, productId]);

  if(!product) return <LoaderIcon/>

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="whitespace-pre-line">編集</CardTitle>
      </CardHeader>
      <CardContent className="w-full md:min-w-[600px] pr-0">
        <ProductEditForm id={id} product={product} />
      </CardContent>
    </Card>
  );
}
