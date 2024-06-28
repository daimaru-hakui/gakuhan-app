import React from "react";
import { FormInput } from "../form/FormInput";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import Image from "next/image";
import { Product } from "@/utils/product.interface";

interface Props {
  product: Product;
}

export default function PublicMeasureCard({ product }: Props) {
  return (
    <Card key={product.id}>
      <CardHeader>
        <CardTitle>上着</CardTitle>
      </CardHeader>
      <CardContent className="p-3 pt-0">
        {product.items.length === 1 ? (
          <Image
            src={
              product.items.at(0)?.images.productUrl || "/images/noImage.png"
            }
            alt=""
            width={200}
            height={200}
            className="border p-1 rounded-md w-full"
          />
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {product.items.map((item) => (
              <div key={item.name}>
                <Image
                  src={item.images.productUrl || "/images/noImage.png"}
                  alt=""
                  width={200}
                  height={200}
                  className="border p-1 rounded-md w-full h-full object-contain"
                />
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
