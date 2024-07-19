import { auth } from "@/auth";
import paths from "@/utils/paths";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();
  if (!session) {
    redirect("/auth/login");
  }

  if (session.user.role === "user") {
    redirect("/mypage");
  }
  redirect(paths.schoolAll());
}
