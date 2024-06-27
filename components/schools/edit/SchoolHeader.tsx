import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Props {
  id: string;
}

export default function SchoolHeader({ id }: Props) {
  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-3xl font-bold">詳細</h1>
        <div className="flex gap-3">
          <Button variant="outline" asChild>
            <Link href="/schools">一覧へ戻る</Link>
          </Button>
          <Button asChild>
            <Link href={`/schools/${id}/public-students`}>
              ダッシュボード
            </Link>
          </Button>
          <Button asChild>
            <Link href={`/public-register/${id}`}>採寸ページ</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
