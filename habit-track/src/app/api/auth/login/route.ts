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

    const response = NextResponse.json(
      { message: "Logged in", access_token },
      { status: 200 }
    );

    // response.headers.set(
    //   "authorization",
    //   `access_token=${access_token}; Path=/`
    // );

    return response;
  } catch (err) {
    return errorHandler(err as AppError);
  }
}
