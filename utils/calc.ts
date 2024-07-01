import {
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds,
} from "date-fns";

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
