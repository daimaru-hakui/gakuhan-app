"use client";
import { db } from "@/lib/firebase/client";
import { doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";

interface Props {
  id: string;
}

export default function AccountContainer({ id }: Props) {
  const [user, setUser] = useState<{ signature: string; id: string }>();

  useEffect(() => {
    const userRef = doc(db, "users", id);
    const unsub = onSnapshot(userRef, {
      next: (snapshot) => {
        setUser({ ...snapshot.data(), id: snapshot.id } as {
          signature: string;
          id: string;
        });
      },
      error: (e) => {
        console.log(e.message);
      },
    });
    return () => unsub();
  }, [id]);

  return (
    <div>
      <div className="flex gap-3">
        <div className="w-16">署名</div>
        <div className="whitespace-pre-wrap">{user?.signature}</div>
      </div>
    </div>
  );
}
