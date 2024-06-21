import React, { useEffect, useState } from "react";
import { FormLabel } from "../ui/form";
import { UseFormReturn } from "react-hook-form";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";

interface Props {
  form: UseFormReturn<any, any>;
  name: string;
  label?: string;
  require?: boolean;
  items: { label: string; id: string }[];
  index: number;
  defaultvalue?: string[];
}

export default function FormCheckBox({
  form,
  name,
  label,
  items,
  index,
  defaultvalue,
}: Props) {
  const [checkList, setCheckList] = useState<string[]>(defaultvalue || []);

  useEffect(() => {
    form.setValue(`items.${index}.${name}`, checkList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkList, index]);

  return (
    <div>
      <div className="mb-2">
        <Label className="text-sm">{label || name}</Label>
      </div>
      <div className="flex flex-row flex-wrap gap-3 px-3">
        {items.map((item, idx) => (
          <div key={idx} className="flex items-center gap-1">
            <Checkbox
              id={item.label}
              checked={checkList.includes(item.label)}
              onCheckedChange={(e) => {
                if (e) {
                  setCheckList([...checkList, item.label]);
                } else {
                  setCheckList(
                    checkList.filter((value: string) => value !== item.label)
                  );
                }
                console.log(e);
              }}
            />
            <label
              htmlFor={item.label}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
            >
              {item.label}
            </label>
          </div>
        ))}
      </div>
      <div className="flex gap-3 bg-muted mt-3 px-3 text-sm">
        {checkList.map((value) => (
          <div key={value}>{value}</div>
        ))}
      </div>
    </div>

    /*  <FormField
      control={form.control}
      name={`items.${index}.${name}`}
      render={() => (
        <FormItem>
          <div className="mb-4">
            <FormLabel className="text-sm">{label || name}</FormLabel>
          </div>
          <div className="flex gap-3 px-3">
            {items.map((item,idx) => (
              <FormField
                key={item.id}
                control={form.control}
                name={`items.${index}.${name}.${idx}`}
                render={({ field }) => {
                  return (
                    <FormItem
                      key={item.id}
                      className="flex flex-row items-start space-x-3 space-y-0"
                    >
                      <FormControl>
                        <Checkbox
                          checked={field.value?.includes(item.id)}
                          onCheckedChange={(checked) => {
                            console.log(field.value)
                            return checked
                              ? field.onChange([...field.value, item.id])
                              : field.onChange(
                                  field.value?.filter(
                                    (value: string) => value !== item.id
                                  )
                                );
                          }}
                        />
                      </FormControl>
                      <FormLabel className="font-normal">
                        {item.label}
                      </FormLabel>
                    </FormItem>
                  );
                }}
              />
            ))}
          </div>
          <FormMessage />
        </FormItem>
      )}
    /> */
  );
}
