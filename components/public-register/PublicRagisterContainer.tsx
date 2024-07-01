"use client";
import PublicRegisterForm from "../public-register/PublicRegisterForm";
import { School } from "@/utils/school.interface";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase/client";
import LoaderIcon from "../LoaderIcon";

interface Props {
  id: string;
}

export default function PublicRagisterContainer({ id }: Props) {
  const [school, setSchool] = useState<School>();

  useEffect(() => {
    const schoolRef = doc(db, "schools", id);
    onSnapshot(schoolRef, {
      next: (snapshot) => {
        setSchool({ ...snapshot.data(), id: snapshot.id } as School);
      },
    });
  }, [id]);

  if (!school) return <LoaderIcon />;

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
