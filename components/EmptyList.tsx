import { cn } from '@/lib/utils';
import React from 'react';

interface Props {
  text?: string;
  className?: string;
}

export default function EmptyList({ text = "データが見つかりませんでした。", className }: Props) {
  return (
    <div className={cn("w-full flex justify-center items-center", className)}>
      {text}
    </div>
  );
}
