"use client";
import { Card, CardContent } from "@/components/ui/card";
import SchoolsHeader from "./SchoolsHeader";
import SchoolsList from "./SchoolsList";
import { db } from "@/firebase/client";
import { School } from "@/utils/school.interface";
import { format } from "date-fns";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import LoaderIcon from "../LoaderIcon";
import EmptyList from "../EmptyList";

export default function SchoolsContainer() {
  const [schools, setSchools] = useState<School[]>();

  useEffect(() => {
    const schoolsRef = collection(db, "schools");
    const q = query(
      schoolsRef,
      orderBy("createdAt", "desc"),
      where("isDeleted", "==", false)
    );
    const unsub = onSnapshot(q, {
      next: (snapshot) => {
        setSchools(
          snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id } as School))
        );
      },
      error: (e) => {
        console.log(e.message);
      },
    });
    return () => unsub();
  }, []);

  if (!schools) return <LoaderIcon />;

  return (
    <div className="w-full md:max-w-[1200px] mx-auto">
      <SchoolsHeader />
      {schools.length === 0 ? (
        <div className="mt-24">
          <EmptyList />
        </div>
      ) : (
        <Card className="overflow-auto w-full md:max-w-[1500px]">
          <CardContent>
            <SchoolsList schools={schools} />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
