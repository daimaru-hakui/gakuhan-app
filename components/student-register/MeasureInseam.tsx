"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "../ui/select";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { Item } from "./MeasureCard";
import { cn } from "@/lib/utils";

interface Props {
  item: Item;
  value: number;
  setValue: (value: number) => void;
  min: number;
  max: number;
  label?: string;
  unit?: string;
  check?: boolean;
  setCheck?: (bool: boolean) => void;
}

export default function MeasureInseam({
  item,
  value,
  setValue,
  min,
  max,
  label,
  unit = "",
  check,
  setCheck
}: Props) {
  const array = Array.from(Array(max - min), (_, i) => i + min);


  function handleSwitch(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    if (!setCheck) return;
    if (check) {
      setCheck(false);
    } else {
      setCheck(true);
    }
    setValue(0);
  }
  return (
    <>
      {(!item.inseam.isFlag ? (
        null
      ) : (
        <div className="flex gap-3">
          {!check && (
            <div className="flex-grow">
              <Label >{label}</Label>
              <Select disabled={check} value={String(value)} onValueChange={(e) => setValue(+e)}>
                <SelectTrigger>
                  <SelectValue >{value !== 0 ? value + unit : "選択してください"}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {array.map((value => (
                    <SelectItem
                      key={value}
                      value={String(value)}
                    >
                      {value}{unit}
                    </SelectItem>
                  )))}
                </SelectContent>
              </Select>
            </div>
          )}
          {item.inseam.isUnNeededItem && (
            <div className={cn("flex items-center space-x-2", check ? "" : "mt-6")}>
              <Switch
                checked={check}
                id="airplane-mode"
                onClick={(e) => handleSwitch(e)}
              />
              <Label htmlFor="airplane-mode">股下不要</Label>
            </div>
          )}
        </div>
      ))}
    </>
  );
}