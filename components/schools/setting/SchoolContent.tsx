import { format } from "date-fns";
import { School } from "@/utils/school.interface";
import { Badge } from "@/components/ui/badge";
import SchoolEditCalendar from "./SchoolEditCalendarI";
import SchoolEditTitle from "./SchoolEditTitleModal";
import SchoolEditDesc from "./SchoolEditDescModal";

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
        </div>
      </div>
      <div>
        <SchoolEditTitle school={school} />
      </div>
      <div>
        <SchoolEditDesc school={school} />
      </div>
      <div>
        <SchoolEditCalendar school={school} />
      </div>
    </div>
  );
}
