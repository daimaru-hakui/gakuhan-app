"use client";
import { Card, CardContent } from "@/components/ui/card";
import SchoolsHeader from "./SchoolsHeader";
import SchoolsList from "./SchoolsList";

export default function SchoolsContainer() {
  return (
    <div className="w-full md:max-w-[1200px] mx-auto">
      <SchoolsHeader />
      <Card className="overflow-auto w-full md:max-w-[1500px]">
        <CardContent>
          <SchoolsList />
        </CardContent>
      </Card>
    </div>
  );
}
