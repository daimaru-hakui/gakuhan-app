"use client";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import {
  collection,
  doc,
  getCountFromServer,
  onSnapshot,
} from "firebase/firestore";
import { db } from "@/lib/firebase/client";
import { School } from "@/utils/school.interface";
import SchoolContent from "@/components/schools/setting/SchoolContent";
import SchoolSetting from "@/components/schools/setting/SchoolSetting";
import { notFound } from "next/navigation";
import LoaderIcon from "@/components/LoaderIcon";
import { useStore } from "@/store";
import SchoolHeader from "./SchoolHeader";

export default function SchoolContainer({ id }: { id: string }) {
  const [school, setSchool] = useState<School>();
  const setStudentsCount = useStore((state) => state.setStudentsCount);

  useEffect(() => {
    const getStudentsCount = async () => {
      const studentsRef = collection(db, "schools", id, "students");
      const snapshot = await getCountFromServer(studentsRef);
      setStudentsCount(snapshot.data().count);
    };
    getStudentsCount();
  }, [id, setStudentsCount]);

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
    <>
      <SchoolHeader title="各種設定" school={school} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="w-full pt-6">
          <CardContent>
            <SchoolContent school={school} />
          </CardContent>
        </Card>
        <Card className="w-full pt-6">
          <CardContent>
            <SchoolSetting school={school} />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
