import { stripe } from "@/lib/stripe";
import { NextRequest, NextResponse } from "next/server";

interface Body {
  name: string;
  price: number;
  email: string;
}

export async function POST(req: NextRequest) {
  const data = (await req.json()) as Body;
  console.log(data);
  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "jpy",
            product_data: {
              name: data.name || "制服一式",
            },
            unit_amount: data.price,
          },
          quantity: 1,
        },
      ],
      customer_email: data.email ?? null,
      mode: "payment",
      success_url: `${req.nextUrl.href}/?success=true`,
      cancel_url: `${req.nextUrl.href}/?canceled=true`,
    });
    if (!session.url) throw new Error("失敗しました");
    console.log(session);
    return NextResponse.json({ url: session.url }, { status: 200 });
  } catch (err) {
    if (err instanceof Error) {
      console.log(err);
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
  }
}
