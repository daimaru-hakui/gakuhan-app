import React from "react";

export default function StudentRegisterlayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="p-3 md:p-6">{children}</div>;
}
