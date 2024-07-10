import { School } from "@/utils/school.interface";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

import StudentRegisterForm from "./StudentRegisterForm";

interface Props {
  school: School;
  email?: string;
}

export default function StudentRagisterContainer({ school, email }: Props) {
  if (!school) return;

  return (
    <div className="w-full md:max-w-[500px] mx-auto">
      <h1 className="font-bold text-xl text-center">採寸登録</h1>
      <Card className="mt-2">
        <CardHeader>
          <CardTitle>{school.title}</CardTitle>
        </CardHeader>
        <CardContent className="w-full space-y-6">
          <CardDescription>{school.description}</CardDescription>
          <StudentRegisterForm school={school} email={email} />
        </CardContent>
      </Card>
    </div>
  );
}
