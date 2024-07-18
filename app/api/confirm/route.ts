import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
import { redirect } from "next/navigation";

import { type NextRequest, type NextResponse } from "next/server";
import { db } from "@/lib/firebase/server";

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const session_id = searchParams.get("session_id") as string;
  const studentId = searchParams.get("studentId") as string;

  try {
    const session = await stripe.checkout.sessions.retrieve(session_id);
    // console.log(session);

    const schoolId = session.metadata?.schoolId;
    const studentId = session.metadata?.studentId;
    if (session.status === "complete" && schoolId && studentId) {
      const studentRef = db
        .collection("schools")
        .doc(schoolId)
        .collection("students")
        .doc(studentId);
      await studentRef.update({
        paymentStatus: true,
      });
    }
  } catch (err) {
    console.log(err);
    return Response.json(null, {
      status: 500,
      statusText: "Internal Server Error",
    });
  }
  redirect(`/mypage/${studentId}`);
};
