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
  // const { id, studentId } = params;
  // const session = await auth();
  // if (!session) return <NotFound />;
  // const studentSnap = await db
  //   .collection("schools")
  //   .doc(id)
  //   .collection("students")
  //   .doc(studentId)
  //   .get();
  // if (!studentSnap.exists) return <NotFound />;
  return <div>PublicStudentP</div>;
}
