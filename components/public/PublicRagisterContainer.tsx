"use client";
import React, { useEffect, useState } from "react";
import PublicRegisterForm from "./PublicRegisterForm";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/firebase/client";
import { School } from "@/utils/school.interface";
import LoaderIcon from "../LoaderIcon";
import { notFound } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

export default function PublicRagisterContainer({ id }: { id: string }) {
  const [school, setSchool] = useState<School>();

  useEffect(() => {
    const schoolRef = doc(db, "schools", id);
    const unsub = onSnapshot(schoolRef, {
      next: (snapshot) => {
        setSchool({ ...snapshot.data(), id: snapshot.id } as School);
      },
      error: (e) => {
        console.log(e);
      },
    });
    return () => unsub();
  }, [id]);

  if (!school) return <LoaderIcon />;
  if (school.isDeleted) return notFound();

  return (
    <div className="w-full md:max-w-[500px] mx-auto">
      <h1 className="font-bold text-xl text-center">採寸登録</h1>
      <Card className="mt-2">
        <CardHeader>
          <CardTitle>{school.title}</CardTitle>
        </CardHeader>
        <CardContent className="w-full space-y-6">
          <CardDescription>{school.description}</CardDescription>
          <PublicRegisterForm school={school} />
        </CardContent>
      </Card>
    </div>
  );
}
