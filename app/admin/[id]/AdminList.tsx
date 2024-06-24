"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useStore } from "@/store";
import React, { useEffect } from "react";

interface Props {
  users: {
    uid: string;
    email: string | undefined;
    displayName: string;
    role: "admin" | "user" | "member";
  }[];
  id: string;
}

export default function AdminList({ users, id }: Props) {
  const user = useStore((state) => state.user);
  if (user?.uid !== id) return;

  return (
    <div className="max-w-[900px]">
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell>uid</TableCell>
            <TableCell>email</TableCell>
            <TableCell>displayName</TableCell>
            <TableCell>role</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.uid}>
              <TableCell>{user.uid}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.displayName}</TableCell>
              <TableCell>{user.role}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
