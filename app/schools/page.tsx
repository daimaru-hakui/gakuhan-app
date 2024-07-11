import { auth } from "@/auth";
import SchoolsContainer from "@/components/schools/SchoolsContainer";
import { notFound, redirect } from "next/navigation";

export default async function SchoolsPage() {
  const session = await auth();
  if (!session)  {
    redirect(`/auth/login`)
  }

  const role = session.user.role;
  if (role === "user" || !role) {
    redirect(`/auth/login`);
  }

  return (
    <div className="w-full grid grid-cols-1 px-6">
      <SchoolsContainer />
    </div>
  );
}
