import PublicStudentsBoard from "@/components/public-students/PublicStudentsBoard";
import { db } from "@/firebase/server";
import { School } from "@/utils/school.interface";
import { notFound } from "next/navigation";

interface Props {
  params: {
    id: string;
  };
}

export default async function PublicStudentsPage({ params }: Props) {
  const { id } = params;
  const schoolSnap = await db.collection("schools").doc(id).get();
  const school = schoolSnap.data() as School;

  if (!school) return;
  if (!school.isPublic) return notFound();
  if (school.isDeleted) return notFound();

  return (
    <div>
      <PublicStudentsBoard id={id} />
    </div>
  );
}