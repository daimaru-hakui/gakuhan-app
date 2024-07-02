import React from "react";
import AnonymousLoginForm from "./AnonymousLoginForm";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

interface Props {
  params: {
    id: string;
  };
}

export default async function AnoonymousLoginPage({ params }: Props) {
  const { id } = params;
  // const session = await auth();

  return (
    <div className="w-full flex justify-center items-center min-h-[100vh]">
      <AnonymousLoginForm id={id} />
    </div>
  );
}
