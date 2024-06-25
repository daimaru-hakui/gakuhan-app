import { format } from "date-fns";
import SchoolEditModal from "./SchoolEditModal";
import { School } from "@/utils/school.interface";

interface Props {
  school: School;
}

export default function SchoolHeader({ school }: Props) {
  return (
    <div className="space-y-6">
      <div>
        <div className="flex justify-between">
          <h3 className="font-semibold">学校名</h3>
          <span>
            <SchoolEditModal school={school} />
          </span>
        </div>
        <div className="text-2xl">{school.title}</div>
      </div>
      <div>
        <h3 className="font-semibold">説明</h3>
        <p className="mt-1 whitespace-pre-line">{school.description}</p>
      </div>
      <div>
        <h3 className="font-semibold">採寸日</h3>
        <p className="mt-1 text-md whitespace-pre-line">
          {format(school.scheduledDate.toDate(), "yyyy年MM月dd日")}
        </p>
      </div>
    </div>
  );
}
