import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

interface Props {
  value: string;
  setValue: (value: string) => void;
  array: string[];
}

export default function PublicMeasureSelect({ value, setValue, array }: Props) {

  return (
    <Select value={value} onValueChange={(e) => setValue(e)}>
      <SelectTrigger>
        <SelectValue placeholder="選択してください" />
      </SelectTrigger>
      <SelectContent>
        {array.map((value => (
          <SelectItem
            key={value}
            value={value}
          >
            {value}
          </SelectItem>
        )))}
      </SelectContent>
    </Select>
  );
}