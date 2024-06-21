"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

interface Props {
  children: React.ReactNode;
  href: string;
}

export default function MenuItem({ children, href }: Props) {
  const pathname = usePathname();
  const isActive = pathname === href;
  return (
    <li className={cn("text-sm", isActive ? "text-primary font-bold" : "")}>
      <Link href={href}>{children}</Link>
    </li>
  );
}
