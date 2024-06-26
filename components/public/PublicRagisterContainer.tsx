"use client";
import React, { useEffect, useState } from "react";
import PublicRegisterForm from "./PublicRegisterForm";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/firebase/client";
import { School } from "@/utils/school.interface";
import LoaderIcon from "../LoaderIcon";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

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
    <div className="w-full md:max-w-[600px] mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>採寸登録</CardTitle>
        </CardHeader>
        <CardContent className="w-full">
          <PublicRegisterForm school={school} />
        </CardContent>
      </Card>
    </div>
  );
}
