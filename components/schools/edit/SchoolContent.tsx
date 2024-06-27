import { format } from "date-fns";
import SchoolEditModal from "@/components/schools/edit/SchoolEditModal";
import { School } from "@/utils/school.interface";

interface Props {
  school: School;
}

export default function SchoolContent({ school }: Props) {
  return (
    <div className="space-y-8">
      <div>
        <div className="flex justify-between items-center">
          <h3 className="font-semibold">学校名</h3>
          <SchoolEditModal school={school}/>
        </div>
        <div className="mt-1 text-md">{school.title}</div>
      </div>
      <div>
        <h3 className="font-semibold">説明</h3>
        <p className="mt-1 whitespace-pre-line">{school.description}</p>
      </div>
      <div>
        <h3 className="font-semibold">採寸日</h3>
        <p className="mt-1 text-md whitespace-pre-line">
          {format(school.scheduledDate?.toDate(), "yyyy年MM月dd日")}
        </p>
      </div>
    </div>
  );
}
