"use client"
import PublicRegisterForm from "../public-register/PublicRegisterForm";
import { School } from "@/utils/school.interface";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

interface Props {
  school: School;
}

export default function PublicRagisterContainer({  school }: Props) {

  return (
    <div className="w-full md:max-w-[500px] mx-auto">
      <h1 className="font-bold text-xl text-center">採寸登録</h1>
      <Card className="mt-2">
        <CardHeader>
          <CardTitle>{school.title}</CardTitle>
        </CardHeader>
        <CardContent className="w-full space-y-6">
          <CardDescription>{school.description}</CardDescription>
          <PublicRegisterForm school={school} />
        </CardContent>
      </Card>
    </div>
  );
}
