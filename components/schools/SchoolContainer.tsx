"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SchoolSettingSwitch from "./SchoolSettingSwitch";
import { Textarea } from "@/components/ui/textarea";
import { SchoolSettingCalendar } from "./SchoolSettingCalendar";
import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase/client";
import { School } from "@/utils/school.type";
import { toast } from 'sonner'

export default function SchoolContainer({ id }: { id: string }) {
  const [school, setSchool] = useState<School>();

  useEffect(() => {
    const docRef = doc(db, "schools", id);
    onSnapshot(docRef, {
      next: (snapshot) => {
        setSchool({ ...snapshot.data(), id: snapshot.id } as School);
      },
      error: (e) => {
        console.log(e.message);
      },
    });
  }, [id]);

  if (!school) return <div></div>;

  return (
    <section>
      <Card>
        <CardHeader>
          <CardTitle>詳細</CardTitle>
        </CardHeader>
        <CardContent>
          {/* <SchoolHeader /> */}
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-lg">学校名</h3>
              <div className="mt-1 text-2xl">{school.title}</div>
            </div>
            <div>
              <h3 className="font-semibold">説明</h3>
              <p className="mt-1 text-sm whitespace-pre-line">
                {school.description}
              </p>
            </div>
            <SchoolSettingCalendar school={school} />
          </div>

          <div className="mt-9 space-y-6">
            <SchoolSettingSwitch
              title="性別記入の表示"
              description="男女の選択を追加する場合はチェック"
              school={school}
              prop="isGender"
              value={school.isGender}
            />
            <SchoolSettingSwitch
              title="住所欄の表示"
              description="送り先が必要な時はチェック"
              school={school}
              prop="isAddress"
              value={school.isAddress}
            />
            <SchoolSettingSwitch
              title="送料の有無"
              description="個別配送や送料を請求する場合はチェック"
              school={school}
              prop="isShipping"
              value={school.isShipping}
              input={true}
            />
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
