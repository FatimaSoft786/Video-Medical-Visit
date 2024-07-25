import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import getPath from "./path";
const roleMiddleware = async (req) => {
  const path = getPath();
  const token = await getToken({ req });
  const url = req.nextUrl.clone();

  if (!token) {
    return NextResponse.redirect(new URL(`/${path}/signin`, url));
  }

  const { role } = token.user;

  if (url.pathname.startsWith("/admin") && role !== "Admin") {
    return NextResponse.redirect(new URL(`/${path}unauthorized`, url));
  }

  if (url.pathname.startsWith("/doctor") && role !== "Doctor") {
    return NextResponse.redirect(new URL(`/${path}unauthorized`, url));
  }

  if (url.pathname.startsWith("/patient") && role !== "Patient") {
    return NextResponse.redirect(new URL(`/${path}unauthorized`, url));
  }

  return NextResponse.next();
};

export default roleMiddleware;
