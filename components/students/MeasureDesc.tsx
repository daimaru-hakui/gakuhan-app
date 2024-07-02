import React from "react";

export default function MeasureDesc({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children && (
        <div className="border p-6 mb-6">
          <div className="font-semibold">説明</div>
          <div className="whitespace-wrap">{children}</div>
        </div>
      )}
    </>
  );
}
