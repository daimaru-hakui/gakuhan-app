import { auth } from "@/auth";
import SchoolCreateForm from "@/components/schools/new/SchoolCreateFrom";
import { db } from "@/lib/firebase/server";
import { User } from "@/utils/user.interface";

export default async function SchoolCreatePage() {
  const session = await auth();
  if (!session) return;
  const userSnap = await db.collection("users").doc(session.user.uid).get();

  const userRaw = JSON.stringify({
    ...userSnap.data(),
    id: userSnap.id,
  } as User);

  const user = JSON.parse(userRaw);
  return (
    <div>
      <SchoolCreateForm user={user} />
    </div>
  );
}
