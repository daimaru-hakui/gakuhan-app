'use client';

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function SchoolsHeader() {
  return (
    <div className="flex justify-between items-center mb-3">
      <h3>School 一覧</h3>
      <Button size='sm' asChild>
        <Link href='/schools/new'>
          新規追加
        </Link>
      </Button>
    </div>
  );
}