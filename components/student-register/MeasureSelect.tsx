import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface Props {
  value: string;
  setValue: (value: string) => void;
  array: string[];
  label?: string;
}

export default function MeasureSelect({
  value,
  setValue,
  array,
  label,
}: Props) {
  
  return (
    <>
      {array.length <= 1 ? (
        array.length === 0 ? null : (
          <div className="text-sm">
            {label}
            <span className="ml-3">{array.join()}</span>
          </div>
        )
      ) : (
        <div>
          <Label>{label}</Label>
          <Select value={value} onValueChange={(e) => setValue(e)}>
            <SelectTrigger>
              <SelectValue placeholder={value ? value : "選択してください"}>
                {value && value}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {array.map((value) => (
                <SelectItem key={value} value={value}>
                  {value}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
    </>
  );
}
