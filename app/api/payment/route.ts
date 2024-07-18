import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
import { NextResponse, type NextRequest } from "next/server";
import { db } from "@/lib/firebase/server";
import { Student } from "@/utils/student.interface";

export const POST = async (req: NextRequest, res: NextResponse) => {
  const requestHeaders = new Headers(req.headers);
  const origin = requestHeaders.get("origin");
  const { schoolId, studentId } = await req.json();

  const studentSnap = await db
    .collection("schools")
    .doc(schoolId)
    .collection("students")
    .doc(studentId)
    .get();
  if (!studentSnap.exists) {
    return NextResponse.json(null, {
      status: 404,
      statusText: "Not Found",
    });
  }

  const data = { ...studentSnap.data(), id: studentSnap.id } as Student;
  const { totalAmount,schoolName } = data;

  console.log(data)

  try {
    const session = await stripe.checkout.sessions.create({
      ui_mode: "embedded",
      metadata: { schoolId: schoolId, studentId: studentId },
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "jpy",

            product_data: {
              name: `${schoolName} 制服一式`,
            },
            unit_amount: totalAmount,
          },
        },
      ],
      mode: "payment",
      return_url: `${origin}/api/confirm?session_id={CHECKOUT_SESSION_ID}&studentId=${studentId}`,
    });

    return Response.json({ clientSecret: session.client_secret });
  } catch (error) {
    console.log(error);

    return Response.json(null, {
      status: 500,
      statusText: "Internal Server Error",
    });
  }
};
