import { auth } from "@/auth";
import StudentsBoard from "@/components/students/board/StudentsBoard";
import { db } from "@/lib/firebase/server";
import { School } from "@/utils/school.interface";
import { notFound } from "next/navigation";

interface Props {
  params: {
    id: string;
  };
}

export default async function PublicStudentsPage({ params }: Props) {
  const session = await auth();
  if (!session) return notFound();

  const role = session.user.role;
  if (role === "user") notFound();

  const { id } = params;
  const schoolSnap = await db.collection("schools").doc(id).get();
  const school = schoolSnap.data() as School;

  if (!school) return;
  if (!school.isPublic) return notFound();
  if (school.isDeleted) return notFound();

  return (
    <div>
      <StudentsBoard id={id} />
    </div>
  );
}
