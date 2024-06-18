"use client";

import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { z } from "zod";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { Label } from "@/components/ui/label";
// import { toast } from "@/components/ui/use-toast";

const FormSchema = z.object({
  dob: z.date({
    required_error: "A date of birth is required.",
  }),
});

export function SchoolSettingCalendar() {
  const [value, setValue] = useState(new Date());
  console.log(value);

  return (
    <div className="flex flex-col">
      <Label className=" font-semibold">採寸日</Label>
      <Popover>
        <PopoverTrigger className="mt-3" asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-[240px] pl-3 text-left font-normal",
              !value && "text-muted-foreground"
            )}
          >
            {value ? (
              format(value, "yyyy-MM-dd")
            ) : (
              <span>Pick a date</span>
            )}
            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={value}
            onSelect={(e) => setValue(e || new Date())}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
