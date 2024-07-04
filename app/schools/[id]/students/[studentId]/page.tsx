import NotFound from "@/app/not-found";
import { auth } from "@/auth";
import { db } from "@/lib/firebase/server";

interface Props {
  params: {
    id: string;
    studentId: string;
  };
}
export default async function PublicStudentShowPage({ params }: Props) {
  return <div>PublicStudentP</div>;
}
