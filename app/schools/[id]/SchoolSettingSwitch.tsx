'use client';
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { useState } from "react";

type Props = {
  title: string;
  description: string;
  input?: boolean;
};

export default function SchoolSettingSwitch({ title, description, input }: Props) {
  const [show, setShow] = useState(false);
  return (
    <div className="flex items-center justify-between">
      <div>
        <h3 className="font-semibold">{title}</h3>
        <div className="mt-1 text-muted-foreground text-sm">
          {description}
        </div>
      </div>
      {input ? (
        <div className="flex items-center gap-3">
          <Input
            type='number'
            className={cn(show ? "block" : "hidden", "w-[100px]")}
            disabled={!show}
          />
          <Switch checked={show} onClick={(e) => setShow(!show)} />
        </div>
      ) : (
        <Switch />
      )}
    </div>
  );
}