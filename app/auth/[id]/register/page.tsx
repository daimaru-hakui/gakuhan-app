import { db } from "@/lib/firebase/server";
import PaymentSignUpForm from "./PaymentSignUpForm";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/auth";
import { School } from "@/utils/school.interface";
import AnonymousForm from "./AnonymousForm";

interface Props {
  params: {
    id: string;
  };
}

export default async function PaymentSignUpPage({ params }: Props) {
  const { id } = params;

  const schoolSnap = await db.collection("schools").doc(id).get();

  if (!schoolSnap.exists) return notFound();
  const schoolRaw = JSON.stringify(schoolSnap.data());
  const school = JSON.parse(schoolRaw) as School;

  if (!school.isPublic || school.isDeleted) return notFound();

  const session = await auth();
  if (session) {
    redirect(`/student-register/${id}`);
  }
  return (
    <div className="w-full flex justify-center items-center min-h-[100vh]">
      {school.isPayment ? (
        <PaymentSignUpForm id={id} school={school} />
      ) : (
        <AnonymousForm id={id} school={school} />
      )}
    </div>
  );
}
