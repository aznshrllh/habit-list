import NoteModel from "@/db/models/noteModel";
import UserModel from "@/db/models/userModel";
import errorHandler from "@/helpers/errorHandler";
import { AppError } from "@/types";

export async function POST(request: Request) {
  try {
    const userId = request.headers.get("x-user-id") as string;
    const body = await request.json();

    const user = await UserModel.findById(userId);

    if (!user) {
      throw { message: "User not found", status: 404 };
    }

    if (!body.name || !body.description) {
      throw { message: "Name and description are required", status: 400 };
    }

    const newNote = {
      ...body,
      userId: userId,
    };

    // console.log(newNote, "<<<< newNote");

    const note = await NoteModel.create(newNote);
    return new Response(JSON.stringify({ message: `success adding notes` }), {
      status: 201,
    });
  } catch (error) {
    return errorHandler(error as AppError);
  }
}

export async function GET(request: Request) {
  try {
    const userId = request.headers.get("x-user-id") as string;
    // console.log(userId, "<<<< userId");

    const user = await UserModel.findById(userId);

    if (!user) {
      throw { message: "User not found", status: 404 };
    }

    const notes = await NoteModel.findByUserId(userId);

    return new Response(JSON.stringify(notes), { status: 200 });
  } catch (error) {
    return errorHandler(error as AppError);
  }
}
