/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect } from "react";
import QRCode from "react-qr-code";

interface Props {
  id: string;
  studentId: string;
}

export default function StudentQrCode({ id, studentId }: Props) {
  let hostName;
  useEffect(() => {
    hostName = window.location.origin;
  }, []);
  return (
    <div className="mt-6 md:mt-0 p-2 max-w-[250px] border text-center mx-auto">
      <QRCode
        size={256}
        style={{ height: "auto", maxWidth: "100%", width: "100%" }}
        value={`${hostName}/schools/${id}/students/${studentId}/edit`}
        viewBox={`0 0 256 256`}
      />
      <p className="text-center text-xs mt-2">もう一度採寸QR</p>
    </div>
  );
}
