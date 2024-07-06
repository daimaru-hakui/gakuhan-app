import { Product } from "@/utils/product.interface";
import { Badge } from "../ui/badge";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import { UseFormReturn } from "react-hook-form";

interface Props {
  product: Product;
  isNoItem: boolean;
  setIsNoItem: (bool: boolean) => void;
  form: UseFormReturn<any, any>;
  index: number;
}
export default function MeasureCardHeader({ product, isNoItem, setIsNoItem, form, index }: Props) {

  function handleNoItemClick() {
    if (isNoItem) {
      setIsNoItem(false);
      form.setValue(`products.${index}.name`, "");
      form.setValue(`products.${index}.color`, "");
      form.setValue(`products.${index}.size`, "");
      form.setValue(`products.${index}.cutLength`, "");
      form.setValue(`products.${index}.quantity`, "");
    } else {
      setIsNoItem(true);
      form.setValue(`products.${index}.name`, null);
      form.setValue(`products.${index}.color`, null);
      form.setValue(`products.${index}.size`, null);
      form.setValue(`products.${index}.cutLength`, 0);
      form.setValue(`products.${index}.quantity`, 0);
    }
  }

  return (
    <header className="flex justify-between mb-3">
      {product.isRequire ? (
        <Badge variant="destructive">必須</Badge>
      ) : (
        <div className="flex items-center space-x-2">
          <Switch
            checked={isNoItem}
            id="airplane-mode"
            onClick={handleNoItemClick}
          />
          <Label htmlFor="airplane-mode">不要の場合はチェック</Label>
        </div>
      )}
    </header>
  );
}