import React from "react";
import AnonymousLoginForm from "./AnonymousLoginForm";

interface Props {
  params: {
    id: string;
  };
}

export default function AnoonymousLoginPage({ params }: Props) {
  const { id } = params;
  return (
    <div className="w-full">
      <AnonymousLoginForm id={id} />
    </div>
  );
}
