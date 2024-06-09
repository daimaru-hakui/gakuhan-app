import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";

export default function SchoolHeader() {
  return (
    <Card className="w-[350px]">
      <CardHeader className="pb-3">
        <CardTitle className="">
          <div className="text-3xl">詳細</div>
        </CardTitle>
      </CardHeader>
      <CardContent>

      </CardContent>
    </Card >
  );
}