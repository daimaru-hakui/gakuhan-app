import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SchoolHeader from "./SchoolHeader";
import SchoolSettingSwitch from "./SchoolSettingSwitch";
import { Textarea } from "@/components/ui/textarea";
import { SchoolSettingCalendar } from "./SchoolSettingCalendar";

export default function SchoolContainer() {
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
              <div className="mt-1 text-2xl">帝塚山学院大学</div>
            </div>
            <div>
              <h3 className="font-semibold">説明</h3>
              <div className="mt-1 text-sm whitespace-pre">
                説明分
                説明分説明分説明分説明分説明分
                説明分説明分説明分説明分説明分説明分説明分</div>
            </div>
            <SchoolSettingCalendar />
          </div>


          <div className="mt-9 space-y-4">
            <SchoolSettingSwitch
              title='性別記入の表示'
              description='男女の選択を追加する場合はチェック'
            />
            <SchoolSettingSwitch
              title='住所欄の表示'
              description='送り先が必要な時はチェック'
            />
            <SchoolSettingSwitch
              title='送料の有無'
              description='個別配送や送料を請求する場合はチェック'
              input={true}
            />
          </div>

        </CardContent>
      </Card>
    </section>
  );
}