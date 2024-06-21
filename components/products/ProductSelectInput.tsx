import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CreateProduct } from "@/utils/schemas";
import React from "react";
import { UseFormReturn } from "react-hook-form";

interface Props {
  form: UseFormReturn<CreateProduct, any, undefined>;
  label?: string;
  name: string;
}

export default function ProductSelectInput({ form, label, name }: Props) {
  function genderLabel(value: string) {
    switch (value) {
      case "other":
        return "男女兼用";
      case "man":
        return "男性用";
      case "woman":
        return "女性用";
    }
  }

  return (
    <FormField
      control={form.control}
      name="gender"
      render={({ field }) => (
        <FormItem className="w-[120px]">
          <FormLabel>{label || name}</FormLabel>
          <Select onValueChange={field.onChange}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={genderLabel(field.value)} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="other">男女兼用</SelectItem>
              <SelectItem value="man">男性用</SelectItem>
              <SelectItem value="woman">女性用</SelectItem>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
