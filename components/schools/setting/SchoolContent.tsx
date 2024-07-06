import { format } from "date-fns";
import SchoolEditModal from "@/components/schools/setting/SchoolEditModal";
import { School } from "@/utils/school.interface";
import { Badge } from "@/components/ui/badge";

interface Props {
  school: School;
}

export default function SchoolContent({ school }: Props) {
  return (
    <div className="space-y-8">
      <div>
        <div className="flex justify-between items-center">
          {school.isPublic
            ? <Badge variant="outline">公開</Badge>
            : <Badge variant="secondary">非公開</Badge>
          }
          <SchoolEditModal school={school} />
        </div>
      </div>
      <div>
        <div className="flex justify-between items-center">
          <h3 className="font-semibold">学校名</h3>
        </div>
        <div className="mt-1 text-md">{school.title}</div>
      </div>
      <div>
        <h3 className="font-semibold">採寸日</h3>
        <p className="mt-1 text-md whitespace-pre-line">
          {format(school.scheduledDate?.toDate(), "yyyy年MM月dd日")}
        </p>
      </div>
      <div>
        <h3 className="font-semibold">説明</h3>
        <p className="mt-1 whitespace-pre-line">{school.description}</p>
      </div>
    </div>
  );
}
