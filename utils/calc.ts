import {
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds,
} from "date-fns";
import { CreateMeasureStudent } from "./schemas";
import { School } from "./school.interface";

export function getfileCapacity(size: number) {
  return `${Math.floor(size / 1000)} KB`;
}

export function calcDifferenceTime(base: Date, target: Date) {
  let sec = differenceInSeconds(new Date(base), new Date(target));
  let min = differenceInMinutes(new Date(base), new Date(target));
  let hour = differenceInHours(new Date(base), new Date(target));

  sec = sec > 60 ? sec % 60 : sec;
  min = min > 60 ? min % 60 : min;
  hour = hour > 24 ? hour % 60 : hour;

  return `${hour}時間 ${min}分 ${sec}秒`;
}

export function calcTotalPrice(data: CreateMeasureStudent, school: School): number {
  const result = data.products.reduce((total, product) => {
    total +=
      product.quantity * product.price +
      product.quantity * (product.cutLength > 0 ? product.inseam.price : 0);
    const shippingFee = school.isShipping ? school.shippingFee : 0;
    return total + shippingFee;
  }, 0);
  return result;
}

export function calcSubTotalPrice({
  quantity,
  price,
  cutPrice,
}: {
  quantity: number;
  price: number;
  cutPrice: number;
}) {
  const product = quantity * price;
  const cut = quantity * cutPrice;
  const sum = product + cut;
  return (
    `${sum.toLocaleString()}円`
  );
}