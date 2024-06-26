import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { UseFormReturn } from "react-hook-form";
import { addresses } from "@/utils/addresses";
import { CreateStudent } from "@/utils/schemas";

interface Props {
  form: UseFormReturn<CreateStudent, any, any>;
  name: string;
  type?: string;
  label?: string;
  defaultValue?: string;
  placeholder?: string;
  description?: string;
  require?: boolean;
  className?: string;
  InputProps?: React.ComponentProps<"input">;
}

export default function FormAddressSelect({
  form,
  name,
  type,
  label,
  defaultValue,
  placeholder,
  description,
  require,
  className,
  InputProps,
}: Props) {
  return (
    <FormField
      control={form.control}
      name="address.prefecture"
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <Select onValueChange={field.onChange} value={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue  >
                  {field.value}
                </SelectValue>
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {addresses.map((address, index) => (
                <SelectItem key={address} value={address}>
                  {address}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </ FormItem>
      )}
    />
  );
}
