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
import { HiCheck } from "react-icons/hi";
import { RxDotFilled } from "react-icons/rx";

interface Props {
  id: string;
  products: Product[] | undefined;
}

export default function ProductsList({ id, products }: Props) {
  if (!products) return <LoaderIcon />;
  if (products.length === 0) return <EmptyList text="商品が未登録です。" />;

  return (
    <div className="overflow-auto">
      <Table className="min-w-[900px]">
        <TableHeader>
          <TableRow>
            <TableHead>区分</TableHead>
            <TableHead>選択必須</TableHead>
            <TableHead>数量</TableHead>
            <TableHead>商品名</TableHead>
            <TableHead>サイズ</TableHead>
            <TableHead>カラー</TableHead>
            <TableHead className="text-center min-w-[100px]">商品画像</TableHead>
            <TableHead className="text-center min-w-[100px]">サイズ画像</TableHead>
            <TableHead className="text-center min-w-[100px]">裾上有無</TableHead>
            <TableHead className="text-center min-w-[100px]">裾上不要欄</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.gender}</TableCell>
              <TableCell className="text-center">
                {product.isRequire &&
                  <div key={product.id} className="flex justify-center">
                    <HiCheck className="text-primary" />
                  </div>}
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
                {product.items?.map((item) => {
                  if (item.size.length === 0) {
                    return (
                      <div key={item.name} className="flex justify-center">
                        <RxDotFilled className="text-muted" />
                      </div>
                    );
                  } else {
                    return <div key={item.name}>{item.size.join(",")}</div>;
                  }
                })}
              </TableCell>
              <TableCell>
                {product.items?.map((item) => {
                  if (item.color.length === 0) {
                    return (
                      <div key={item.name} className="flex justify-center">
                        <RxDotFilled className="text-muted" />
                      </div>
                    );
                  } else {
                    return <div key={item.name}>{item.color.join(",")}</div>;
                  }
                })}
              </TableCell>
              <TableCell className="text-center">
                {product.items?.map((item) => {
                  if (item.images.productUrl) {
                    return (
                      <div key={item.name} className="flex justify-center">
                        <HiCheck className="text-primary" />
                      </div>
                    );
                  } else {
                    return (
                      <div key={item.name} className="flex justify-center">
                        <RxDotFilled className="text-muted" />
                      </div>
                    );
                  }
                })}
              </TableCell>
              <TableCell className="text-center">
                {product.items?.map((item) => {
                  if (item.images.sizeUrl) {
                    return (
                      <div key={item.name} className="flex justify-center">
                        <HiCheck className="text-primary" />
                      </div>
                    );
                  } else {
                    return (
                      <div key={item.name} className="flex justify-center">
                        <RxDotFilled className="text-muted" />
                      </div>
                    );
                  }
                })}
              </TableCell>
              <TableCell className="text-center">
                {product.items?.map((item) => {
                  if (item.inseam.isFlag) {
                    return (
                      <div key={item.name} className="flex justify-center">
                        <HiCheck className="text-primary" />
                      </div>
                    );
                  } else {
                    return (
                      <div key={item.name} className="flex justify-center">
                        <RxDotFilled className="text-muted" />
                      </div>
                    );
                  }
                })}
              </TableCell>
              <TableCell className="text-center">
                {product.items?.map((item) => {
                  if (item.inseam.isFlag && item.inseam.isUnNeededItem) {
                    return (
                      <div key={item.name} className="flex justify-center">
                        <HiCheck className="text-primary" />
                      </div>
                    );
                  } else {
                    return (
                      <div key={item.name} className="flex justify-center">
                        <RxDotFilled className="text-muted" />
                      </div>
                    );
                  }
                })}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
