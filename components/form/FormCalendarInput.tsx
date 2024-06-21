"use client";
import { useState } from "react";
import { CalendarIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import { UseFormReturn } from "react-hook-form";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

type Props = {
  form: UseFormReturn<any, any>;
  name: string;
  label?: string;
  defaultValue?: Date;
  require?: boolean;
};

export default function FormCalendarInput({
  form,
  name,
  label,
  defaultValue,
  require,
}: Props) {
  const [calendarOpen, setCalendarOpen] = useState(false);

  return (
    <FormField
      control={form.control}
      name={name}
      defaultValue={defaultValue}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>
            {label || name}
            {require && <span className="text-red-500 text-xs ml-1">*</span>}
          </FormLabel>
          <Popover
            open={calendarOpen}
            onOpenChange={() => {
              setCalendarOpen(!calendarOpen);
            }}
          >
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[240px] pl-3 text-left font-normal",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  {field.value ? (
                    format(field.value, "yyyy-MM-dd")
                  ) : (
                    <span>{field.value}</span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                numberOfMonths={1}
                selected={new Date(field.value)}
                onSelect={field.onChange || new Date()}
                initialFocus
              />
              <div className="w-full text-center">
                <Button
                  size="sm"
                  variant="outline"
                  className="mb-2"
                  onClick={() => setCalendarOpen(!calendarOpen)}
                >
                  閉じる
                </Button>
              </div>
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
