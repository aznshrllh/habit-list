import UserModel from "@/db/models/userModel";
import errorHandler from "@/helpers/errorHandler";
import { AppError } from "@/types";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { email, password, name } = body;

    if (!body) {
      throw { message: "Email, Password, and Name are required", status: 400 };
    }

    if (!email) {
      throw { message: "Email is required", status: 400 };
    }

    if (!password) {
      throw { message: "Password is required", status: 400 };
    }

    if (!name) {
      throw { message: "Name is required", status: 400 };
    }

    await UserModel.create(body);

    return Response.json({ message: "User created", body }, { status: 201 });
  } catch (err) {
    return errorHandler(err as AppError);
  }
}
