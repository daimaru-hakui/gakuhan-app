import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { StudentProduct } from "@/utils/student.interface";
import EmptyList from "../EmptyList";

interface Props {
  products: StudentProduct[];
}

export default function StudentProductList({ products }: Props) {
  if (!products) return <EmptyList className="mt-6" />;
  return (
    <div className="mt-6">
      <Table className="overflow-auto min-w-[500px]">
        <TableHeader>
          <TableRow>
            <TableHead>商品名</TableHead>
            <TableHead>カラー</TableHead>
            <TableHead className="text-center min-w-[80px]">サイズ</TableHead>
            <TableHead className="text-center min-w-[60px]">数量</TableHead>
            <TableHead className="text-center min-w-[70px]">裾上げ</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products
            .filter((product) => product.name)
            .map((product, index) => (
              <TableRow key={index}>
                <TableCell className="whitespace-nowrap">
                  {product.name}
                </TableCell>
                <TableCell className="whitespace-nowrap">
                  {product.color}
                </TableCell>
                <TableCell className="whitespace-nowrap text-center">
                  {product.size}
                </TableCell>
                <TableCell className="text-right">{product.quantity}</TableCell>
                <TableCell className="text-right">
                  {product.cutLength ? `${product.cutLength}cm` : ""}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}
