"use client";
import { School } from "@/utils/school.interface";
import React, { useRef } from "react";
import { BsQrCode } from "react-icons/bs";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import QRCode from "react-qr-code";
import ReactToPrint from "react-to-print";
import html2canvas from "html2canvas";
import { Input } from "../ui/input";
import { MdContentCopy } from "react-icons/md";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface Props {
  school: School;
  size?: number;
  className?: string;
}
export default function SchoolsQRCodeModal({
  school,
  size = 24,
  className,
}: Props) {
  const qrRef = useRef(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const printRef = useRef(null);
  const hostName = window.location.origin;

  function handleClickQRcodeDownLoad() {
    if (!qrRef.current) return;
    html2canvas(qrRef?.current).then((canvasEl) => {
      const aEl = document.createElement("a");
      aEl.href = canvasEl.toDataURL("image/png");
      aEl.download = `${school.title}.png`;
      aEl.click();
    });
  }

  // クリップボードへコピー（コピーの処理）
  function handleClickCopy() {
    if (!inputRef.current) return;
    if (navigator.clipboard) {
      return navigator.clipboard
        .writeText(inputRef.current.value)
        .then(function () {
          toast.success("コピーしました");
        });
    }
  }

  return (
    <Dialog>
      <DialogTrigger>
        <BsQrCode size={size} className={cn("cursor-pointer", className)} />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <div ref={printRef}>
          <DialogHeader>
            <DialogTitle>QRコード</DialogTitle>
          </DialogHeader>
          <DialogDescription className="mt-4 text-primary text-center">{school.title}</DialogDescription>
          <div
            ref={qrRef}
            id="target"
            style={{
              height: "auto",
              margin: "0 auto",
              maxWidth: 300,
              width: "100%",
            }}
            className="p-6"
          >
            <QRCode
              size={256}
              style={{ height: "auto", maxWidth: "100%", width: "100%" }}
              value={`auth/${school.id}/login`}
              viewBox={`0 0 256 256`}
            />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Input
            ref={inputRef}
            defaultValue={`${hostName}/auth/${school.id}/login`}
            onFocus={(e) => e.target.select()}
          />
          <MdContentCopy
            size={24}
            className="cursor-pointer"
            onClick={handleClickCopy}
          />
        </div>
        <DialogFooter className="sm:justify-between gap-3">
          <Button onClick={handleClickQRcodeDownLoad} className="w-full">
            ダウンロード
          </Button>
          <ReactToPrint
            trigger={() => <Button color="primary" className="w-full">印刷</Button>}
            content={() => printRef.current}
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
