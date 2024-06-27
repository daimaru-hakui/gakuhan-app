"use client";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/firebase/client";
import { School } from "@/utils/school.interface";
import SchoolContent from "@/components/schools/edit//SchoolContent";
import SchoolSetting from "@/components/schools/edit//SchoolSetting";
import LoaderIcon from "@/components/LoaderIcon";
import { notFound } from "next/navigation";

export default function SchoolContainer({ id }: { id: string }) {
  const [school, setSchool] = useState<School>();
  console.log(id);

  useEffect(() => {
    const docRef = doc(db, "schools", id);
    const unsub = onSnapshot(docRef, {
      next: (snapshot) => {
        setSchool({ ...snapshot.data(), id: snapshot.id } as School);
      },
      error: (e) => {
        console.log(e.message);
      },
    });
    return () => unsub();
  }, [id]);

  if (!school) return <LoaderIcon />;
  if (school === undefined) return notFound();

  return (
    <Card className="w-full pt-6">
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
        <SchoolContent school={school} />
        <SchoolSetting school={school} />
      </CardContent>
    </Card>
  );
}
