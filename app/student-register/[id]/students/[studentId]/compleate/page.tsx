import { auth } from "@/auth";
import MeasureCompleate from "@/components/student-register/MeasureCompleate";
import { db } from "@/lib/firebase/server";
import { School } from "@/utils/school.interface";
import { notFound } from "next/navigation";

interface Props {
  params: {
    id: string;
  };
}

export default async function StudentCompleatePage({ params }: Props) {
  const { id } = params;
  const session = await auth();
  if (!session) return notFound();

  const schoolSnap = await db.collection("schools").doc(id).get();
  const schoolRaw = JSON.stringify({ ...schoolSnap.data(), id: schoolSnap.id });
  const school = JSON.parse(schoolRaw) as School;

  return (
    <div className="w-full min-h-[calc(100vh-200px)] flex justify-center items-center">
      <MeasureCompleate school={school} />
    </div>
  );
}
