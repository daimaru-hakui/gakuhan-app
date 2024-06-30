"use client";

import Link from "next/link";
import {
  FormControl,
  FormDescription,
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
import { UseFormReturn } from "react-hook-form";

interface Props {
  form: UseFormReturn<any, any>;
  name: string;
  type?: string;
  label?: string;
  defaultValue?: string;
  placeholder?: string;
  description?: string;
  require?: boolean;
  className?: string;
  props?: React.ComponentProps<"select">;
  array: string[];
}


export function FormSelect({
  form,
  name,
  label,
  placeholder,
  description,
  require,
  className,
  array,
  props
}: Props) {

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="選択してください" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {array.map((value => (
                <SelectItem key={value} value={value}>{value}</SelectItem>
              )))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
