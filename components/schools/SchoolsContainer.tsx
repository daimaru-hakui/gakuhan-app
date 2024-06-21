'use client';
import { Card } from "@/components/ui/card";
import SchoolsHeader from "./SchoolsHeader";
import SchoolsList from "./SchoolsList";

export default function SchoolsContainer() {
  return (
    <>
      <SchoolsHeader />
      <Card>
        <SchoolsList />
      </Card>
    </>
  );
}