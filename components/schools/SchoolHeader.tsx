import { SchoolSettingCalendar } from "./SchoolSettingCalendar";
import { School } from "@/utils/school.interface";

interface Props {
  school: School;
}

export default function SchoolHeader({ school }: Props) {
  return (
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

  );
}