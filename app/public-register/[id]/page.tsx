import PublicRagisterContainer from "@/components/public-register/PublicRagisterContainer";
import { db } from "@/firebase/server";
import { School } from "@/utils/school.interface";
import { notFound } from "next/navigation";
import React from "react";

interface Props {
  params: {
    id: string;
  };
}

export default async function PublicRegisterPage({ params }: Props) {
  const { id } = params;
  const snapshot = await db.collection("schools").doc(id).get();
  const rawData = { ...snapshot.data(), id: snapshot.id } as School;
  const JsonData = JSON.stringify(rawData);
  const school = JSON.parse(JsonData) as School;

  if (!school) return;
  if (!school.isPublic) return notFound();
  if (school.isDeleted) return notFound();

  return (
    <div>
      <PublicRagisterContainer id={school.id} />
    </div>
  );
}
