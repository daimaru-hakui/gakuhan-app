"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/firebase/client";
import { School } from "@/utils/school.interface";
import { toast } from 'sonner';
import SchoolHeader from "./SchoolHeader";
import SchoolContent from "./SchoolContent";

export default function SchoolContainer({ id }: { id: string; }) {
  const [school, setSchool] = useState<School>();

  useEffect(() => {
    const docRef = doc(db, "schools", id);
    onSnapshot(docRef, {
      next: (snapshot) => {
        setSchool({ ...snapshot.data(), id: snapshot.id } as School);
      },
      error: (e) => {
        console.log(e.message);
      },
    });
  }, [id]);

  if (!school) return <div></div>;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>詳細</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SchoolHeader school={school} />
        <SchoolContent school={school} />
      </CardContent>
    </Card>
  );
}
