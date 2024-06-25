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
import GenderBadge from "../GenderBadge";
import ProductEditWithDeleteButton from "./ProductEditWithDeleteButton";

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
            <TableHead>行</TableHead>
            <TableHead>action</TableHead>
            <TableHead className="text-center min-w-[100px]">区分</TableHead>
            <TableHead className="text-center min-w-[100px]">
              選択必須
            </TableHead>
            <TableHead className="text-center min-w-[100px]">数量</TableHead>
            <TableHead className="text-center min-w-[100px]">商品名</TableHead>
            <TableHead className="text-center min-w-[100px]"> サイズ</TableHead>
            <TableHead className="text-center min-w-[100px]">カラー</TableHead>
            <TableHead className="text-center min-w-[100px]">
              商品画像
            </TableHead>
            <TableHead className="text-center min-w-[100px]">
              サイズ画像
            </TableHead>
            <TableHead className="text-center min-w-[100px]">
              裾上有無
            </TableHead>
            <TableHead className="text-center min-w-[100px]">
              裾上不要欄
            </TableHead>
            <TableHead className="text-center min-w-[100px]">
              カット範囲
            </TableHead>
            <TableHead className="text-center min-w-[100px]">
              基準股下
            </TableHead>
            <TableHead className="text-center min-w-[100px]">裾上代</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.sortNum}</TableCell>
              <TableCell className="flex gap-2">
                <ProductEditWithDeleteButton id={id} product={product} />
              </TableCell>
              <TableCell>
                <GenderBadge gender={product.gender} />
              </TableCell>
              <TableCell className="text-center">
                {product.isRequire && (
                  <div key={product.id} className="flex justify-center">
                    <HiCheck className="text-primary" />
                  </div>
                )}
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
                  <div key={item.name} className="flex justify-center">
                    {item.size.length === 0 ? (
                      <RxDotFilled className="text-muted" />
                    ) : (
                      item.size.join(",")
                    )}
                  </div>
                ))}
              </TableCell>
              <TableCell>
                {product.items?.map((item) => (
                  <div key={item.name} className="flex justify-center">
                    {item.color.length === 0 ? (
                      <RxDotFilled className="text-muted" />
                    ) : (
                      item.color.join(",")
                    )}
                  </div>
                ))}
              </TableCell>
              <TableCell className="text-center">
                {product.items?.map((item) => (
                  <div key={item.name} className="flex justify-center">
                    {item.images.productUrl ? (
                      <HiCheck className="text-primary" />
                    ) : (
                      <RxDotFilled className="text-muted" />
                    )}
                  </div>
                ))}
              </TableCell>
              <TableCell className="text-center">
                {product.items?.map((item) => (
                  <div key={item.name} className="flex justify-center">
                    {item.images.sizeUrl ? (
                      <HiCheck className="text-primary" />
                    ) : (
                      <RxDotFilled className="text-muted" />
                    )}
                  </div>
                ))}
              </TableCell>
              <TableCell className="text-center">
                {product.items?.map((item) => (
                  <div key={item.name} className="flex justify-center">
                    {item.inseam.isFlag ? (
                      <HiCheck className="text-primary" />
                    ) : (
                      <RxDotFilled className="text-muted" />
                    )}
                  </div>
                ))}
              </TableCell>
              <TableCell className="text-center">
                {product.items?.map((item) => (
                  <div key={item.name} className="flex justify-center">
                    {item.inseam.isFlag && item.inseam.isUnNeededItem ? (
                      <HiCheck className="text-primary" />
                    ) : (
                      <RxDotFilled className="text-muted" />
                    )}
                  </div>
                ))}
              </TableCell>
              <TableCell className="text-center">
                {product.items?.map((item) => (
                  <div key={item.name} className="flex justify-center">
                    {item.inseam.isFlag && item.inseam.min ? (
                      `${item.inseam.min} ~ ${item.inseam.max}cm`
                    ) : (
                      <RxDotFilled className="text-muted" />
                    )}
                  </div>
                ))}
              </TableCell>
              <TableCell className="text-center">
                {product.items?.map((item) => (
                  <div key={item.name} className="flex justify-center">
                    {item.inseam.isFlag && item.inseam.base ? (
                      item.inseam.base
                    ) : (
                      <RxDotFilled className="text-muted" />
                    )}
                  </div>
                ))}
              </TableCell>
              <TableCell className="text-center">
                {product.items?.map((item) => (
                  <div key={item.name} className="flex justify-center">
                    {item.inseam.isFlag && item.inseam.price ? (
                      `${item.inseam.price}円`
                    ) : (
                      <RxDotFilled className="text-muted" />
                    )}
                  </div>
                ))}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
