import { NextRequest } from "next/server";
import { auth } from "./auth";

export default async function middleware(req: NextRequest) {
  // console.log('1');
}

// export const config = {
//   matcher: ["/((?!api|_next/static|_next/image|favicon.ico|auth).*)"]
// };
