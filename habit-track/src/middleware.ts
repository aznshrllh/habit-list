import { cookies } from "next/headers";
import { NextResponse, NextRequest } from "next/server";
import { verifyTokenJose } from "./helpers/jwt";

export async function middleware(request: NextRequest) {
  // const cookie = req.cookies.get("habit-track-token");

  const cookieStore = await cookies();
  const authorization = cookieStore.get("authorization")?.value;

  // console.log(authorization, "<<<< authorization");

  if (!authorization) {
    return NextResponse.json(
      {
        message: "Unauthorized",
      },
      {
        status: 401,
      }
    );
  }

  const token = authorization.split(" ")[1];

  const decode = await verifyTokenJose<{ _id: string; email: string }>(token);

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-user-id", decode._id);

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  // console.log(response, "<<<< response");
  // response.cookies.set("authorization", authorization);

  return response;
}

export const config = {
  matcher: [
    "/api/habits/:path*",
    "/api/habits",
    "/api/notes/:path*",
    "/api/notes",
  ],
};
//Now, let’s use this middleware in our  /api/habits  endpoint.
