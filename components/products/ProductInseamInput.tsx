import React from "react";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "../ui/form";
import { Switch } from "../ui/switch";
import { UseFormReturn } from "react-hook-form";
import { CreateProduct } from "@/utils/schemas";
import { Label } from "../ui/label";
import { FormInput } from "../form/FormInput";

interface Props {
  form: UseFormReturn<CreateProduct, any, undefined>;
  index: number;
}

export default function ProductInseamInput({ form, index }: Props) {
  return (
    <div>
      <Label>股下修理</Label>
      <div className="space-y-4 rounded-md border p-4 mt-2">
        <FormField
          control={form.control}
          name={`items.${index}.inseam.isFlag`}
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between">
              <div className="space-y-0.5">
                <FormLabel className="">股下修理の有無</FormLabel>
                <FormDescription className="text-xs">
                  修理が必要な場合は選択してください
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
        {form.watch(`items.${index}.inseam.isFlag`) && (
          <>
            <FormField
              control={form.control}
              name={`items.${index}.inseam.isUnNeededItem`}
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between">
                  <div className="space-y-0.5">
                    <FormLabel className="">不要欄項目の有無</FormLabel>
                    <FormDescription className="text-xs">
                      不要欄が必要な場合は選択してください
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
            <div className="flex flex-col lg:flex-row gap-3 lg:gap-6">
              <div>
                <Label>股下カット範囲(cm)</Label>
                <div className="flex items-start gap-3 mt-2">
                  <FormInput
                    type="number"
                    form={form}
                    name={`items.${index}.inseam.min`}
                    className="w-24"
                    InputProps={{
                      min: 1,
                      disabled: form.watch(`items.${index}.inseam.isFlag`)
                        ? false
                        : true,
                    }}
                  />
                  <span className="mt-1">~</span>
                  <FormInput
                    type="number"
                    form={form}
                    name={`items.${index}.inseam.max`}
                    className="w-24"
                    InputProps={{
                      min: form.watch(`items.${index}.inseam.min`),
                      disabled: form.watch(`items.${index}.inseam.isFlag`)
                        ? false
                        : true,
                    }}
                  />
                </div>
              </div>
              <FormInput
                type="number"
                form={form}
                label="基準股下(cm)"
                name={`items.${index}.inseam.base`}
                className="w-24"
                InputProps={{
                  min: 0,
                  disabled: form.watch(`items.${index}.inseam.isFlag`)
                    ? false
                    : true,
                }}
              />
              <FormInput
                type="number"
                form={form}
                label="股下修理代(円)"
                name={`items.${index}.inseam.price`}
                className="w-24"
                InputProps={{
                  min: 0,
                  disabled: form.watch(`items.${index}.inseam.isFlag`)
                    ? false
                    : true,
                }}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
