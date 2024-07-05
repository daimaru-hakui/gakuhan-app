import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import SchoolsQRCodeModal from "../SchoolsQRCodeModal";
import { School } from "@/utils/school.interface";
import { useStore } from "@/store";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";

interface Props {
  title?: string;
  school: School;
}

export default function SchoolHeader({ title, school }: Props) {
  const studentsCount = useStore(state => state.studentsCount);
  return (
    <div>
      <Alert
        variant="destructive"
        className={cn(studentsCount > 0 ? "block mb-4" : "hidden")}
      >
        <ExclamationTriangleIcon className="h-4 w-4" />
        <AlertTitle>変更不可</AlertTitle>
        <AlertDescription>
          採寸データ入力済みのため設定や商品の変更はできません。
        </AlertDescription>
      </Alert>
      <div className="flex flex-col md:flex-row items-center justify-between gap-3">
        <h1 className="text-3xl font-bold">{title}</h1>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href="/schools">一覧へ戻る</Link>
          </Button>
          <div className="flex items-center px-2 border rounded-md">
            <SchoolsQRCodeModal school={school} />
          </div>
          <Button asChild>
            <Link href={`/schools/${school.id}/students`}>生徒一覧</Link>
          </Button>
          <Button asChild>
            <Link href={`/schools/${school.id}/students/board`}>
              採寸掲示板
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
