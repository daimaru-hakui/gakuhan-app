"use client";

import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { z } from "zod";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Timestamp, doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/client";
import { School } from "@/utils/school.type";
import { toast } from "sonner";

export function SchoolSettingCalendar({ school }: { school: School }) {
  const defaultDate =
    new Date(school.scheduledDate?.toDate().toString()) || new Date();
  const [value, setValue] = useState(defaultDate);

  async function handleUpdateSwitch(e: Date | undefined) {
    const date = !e ? defaultDate : e;
    setValue(date || new Date());
    const docRef = doc(db, "schools", school.id);
    await updateDoc(docRef, {
      scheduledDate: date,
    });
    toast.success(`採寸日を更新しました`);
  }

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
            {value ? format(value, "yyyy-MM-dd") : <span>Pick a date</span>}
            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={value}
            onSelect={(e) => {
              handleUpdateSwitch(e);
            }}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
