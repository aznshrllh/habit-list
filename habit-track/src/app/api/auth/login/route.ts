import UserModel from "@/db/models/userModel";
import { comparePassword } from "@/helpers/bcrypt";
import errorHandler from "@/helpers/errorHandler";
import { signToken } from "@/helpers/jwt";
import { AppError } from "@/types";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body: { email: string; password: string } = await request.json();

    if (!body.email || !body.password) {
      throw { message: "Email and password are required", status: 400 };
    }

    const user = await UserModel.findByEmail(body.email);

    if (!user) {
      throw { message: "Invalid email or password", status: 401 };
    }

    const comparedPassword = comparePassword(body.password, user.password);

    if (!comparedPassword) {
      throw { message: "Invalid email or password", status: 401 };
    }

    const access_token = signToken({
      _id: user._id.toString(),
      email: user.email,
    });

    const response = NextResponse.next();
    response.cookies.set("authorization", `Bearer ${access_token}`, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24,
    });

    // console.log(response.cookies, "<<<< response.cookies");

    return Response.json(
      { message: "Logged in", access_token },
      { status: 200 }
    );
  } catch (err) {
    return errorHandler(err as AppError);
  }
}
