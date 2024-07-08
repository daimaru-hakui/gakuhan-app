import { auth } from "@/auth";
import AccountContainer from "@/components/account/AccountContainer";
import AccountEdit from "@/components/account/AccountEdit";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { db } from "@/lib/firebase/server";
import { User } from "@/utils/user.interface";
import React from "react";

interface Props {
  params: {
    id: string;
  };
}

export default async function AccountPage({ params }: Props) {
  const { id } = params;
  const session = await auth();
  const userSnap = await db.collection("users").doc(id).get();
  const userRaw = JSON.stringify({ ...userSnap.data(), id: userSnap.id } as User);
  const user = JSON.parse(userRaw);

  return (
    <div className="w-full grid grid-cols-1 justify-center">
      <Card className="mx-auto w-full max-w-[500px]">
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            アカウント情報 <AccountEdit user={user} />
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="flex gap-3">
            <div className="w-16">Email</div>
            <div>{session?.user.email}</div>
          </div>
          <AccountContainer id={id} />
        </CardContent>
      </Card>
    </div>
  );
}
