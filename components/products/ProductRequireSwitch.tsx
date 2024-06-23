import { UseFormReturn } from "react-hook-form";
import { FormControl, FormDescription, FormField, FormItem, FormLabel } from "../ui/form";
import { Label } from "../ui/label";
import { CreateProduct } from "@/utils/schemas";
import { Switch } from "../ui/switch";

interface Props {
  form: UseFormReturn<CreateProduct, any, undefined>;
}

export default function ProductRequireSwitch({ form }: Props) {
  return (
    <FormField
      control={form.control}
      name="isRequire"
      render={({ field }) => (
        <FormItem className="flex flex-row items-center justify-between">
          <div className="space-y-0.5">
            <FormLabel className="">必須アイテム</FormLabel>
            <FormDescription className="text-xs">
              商品選択が必須の場合は選択してください
            </FormDescription>
          </div>
          <FormControl>
            <Switch
              checked={field.value}
              onCheckedChange={field.onChange}
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
}