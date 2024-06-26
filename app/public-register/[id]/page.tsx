import PublicRagisterContainer from "@/components/public/PublicRagisterContainer";
import React from "react";

interface Props {
  params: {
    id: string;
  };
}

export default function PublicRegisterPage({ params }: Props) {
  const { id } = params;
  return (
    <div>
      <PublicRagisterContainer id={id} />
    </div>
  );
}
