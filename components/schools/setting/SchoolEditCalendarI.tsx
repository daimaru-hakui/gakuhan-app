"use client";
import { useState, useTransition } from "react";
import { CalendarIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { School } from "@/utils/school.interface";
import { LoadingButton, SubmitRhkButton } from "@/components/form/Buttons";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/client";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";

type Props = {
  school: School;
  require?: boolean;
};

interface Inputs {
  scheduledDate: Date;
}

export default function SchoolEditCalendar({
  school,
  require,
}: Props) {
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [scheduledDate, setScheduledDate]
    = useState<Date>(school.scheduledDate.toDate() || new Date());
  const [pending, startTransition] = useTransition();


  async function updateCalendar() {
    startTransition(async () => {
      try {
        const schoolRef = doc(db, "schools", school.id);
        await updateDoc(schoolRef, {
          scheduledDate: scheduledDate
        });
        toast.success("採寸日を更新しました");
      } catch (e: unknown) {
        if (e instanceof Error) {
          toast.error(e.message);
        } else {
          toast.error("エラーが発生しました");
        }
      }
    });
  }

  return (
    <div className="flex flex-col">
      <Label
        className="font-semibold text-[0.95rem] mb-2 cursor-pointer"
        onClick={() => setCalendarOpen(!calendarOpen)}
      >
        採寸日
      </Label>
      <Popover
        open={calendarOpen}
        onOpenChange={() => {
          setCalendarOpen(!calendarOpen);
        }}
      >
        <PopoverTrigger asChild>
          <Button
            type="button"
            variant={"outline"}
            className={cn("w-[240px] pl-3 text-left font-normal")}
          >
            {school.scheduledDate ? (
              format(school.scheduledDate.toDate(), "yyyy-MM-dd")
            ) : (
              <span>選択してください</span>
            )}
            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            numberOfMonths={1}
            selected={scheduledDate || new Date()}
            onSelect={(e) => setScheduledDate(e || new Date())}
            initialFocus
          />
          <div className="w-full flex items-center justify-center gap-2 text-center mb-2">
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={() => setCalendarOpen(!calendarOpen)}
            >
              閉じる
            </Button>
            <LoadingButton
              size="sm"
              isValid={pending}
              isPending={pending}
              props={{ onClick: updateCalendar }}
              text="更新"
            />
          </div>
        </PopoverContent>
      </Popover>
    </div >
  );
}
