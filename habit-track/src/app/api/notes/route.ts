import NoteModel from "@/db/models/noteModel";
import UserModel from "@/db/models/userModel";
import { ObjectId } from "mongodb";

export async function POST(request: Request) {
  const userId = request.headers.get("x-user-id") as string;
  // console.log(userId, "<<<< userId");
  const body = await request.json();
  // console.log(body, "<<<< body");

  const newNote = {
    ...body,
    userId: userId,
  };

  // console.log(newNote, "<<<< newNote");

  const note = await NoteModel.create(newNote);
  return new Response(JSON.stringify(note), { status: 201 });
}
