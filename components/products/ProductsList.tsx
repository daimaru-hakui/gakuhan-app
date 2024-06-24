import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Product } from "@/utils/product.interface";
import EmptyList from "../EmptyList";
import LoaderIcon from "../LoaderIcon";

interface Props {
  id: string;
  products: Product[] | undefined;
}

export default function ProductsList({ id, products }: Props) {
  if (!products) return <LoaderIcon />;
  if (products.length === 0) return <EmptyList text="商品が未登録です。" />;

  return (
    <div className="overflow-auto md:w-[500px] 2xl:w-[1000px]">
      <Table className="min-w-[900px]">
        <TableHeader>
          <TableRow>
            <TableHead>区分</TableHead>
            <TableHead>選択必須</TableHead>
            <TableHead>数量</TableHead>
            <TableHead>商品名</TableHead>
            <TableHead>サイズ</TableHead>
            <TableHead>カラー</TableHead>
            <TableHead className="min-w-[100px]">商品画像</TableHead>
            <TableHead className="min-w-[100px]">サイズ画像</TableHead>
            <TableHead className="min-w-[100px]">裾上有無</TableHead>
            <TableHead className="min-w-[100px]">裾上不要欄</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.gender}</TableCell>
              <TableCell className="text-center">
                {product.isRequire && "〇"}
              </TableCell>
              <TableCell>
                {product.quantity.min === product.quantity.max
                  ? product.quantity.min
                  : `${product.quantity.min} ~ ${product.quantity.max}`}
              </TableCell>
              <TableCell>
                {product.items?.map((item) => (
                  <div key={item.name}>{item.name}</div>
                ))}
              </TableCell>
              <TableCell>
                {product.items?.map((item) => (
                  <div key={item.name}>{item.size.join(",")}</div>
                ))}
              </TableCell>
              <TableCell>
                {product.items?.map((item) => {
                  if (item.color.length === 0) {
                    return <div key={item.name}>-</div>;
                  } else {
                    return <div key={item.name}>{item.color.join(",")}</div>;
                  }
                })}
              </TableCell>
              <TableCell className="text-center">
                {product.items?.map((item) =>
                  item.images.productUrl ? "〇" : "-"
                )}
              </TableCell>
              <TableCell className="text-center">
                {product.items?.map((item) =>
                  item.images.sizeUrl ? "〇" : "-"
                )}
              </TableCell>
              <TableCell className="text-center">
                {product.items?.map((item) =>
                  item.inseam.isFlag ? "〇" : "-"
                )}
              </TableCell>
              <TableCell className="text-center">
                {product.items?.map((item) =>
                  item.inseam.isFlag && item.inseam.isUnNeededItem ? "〇" : "-"
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
