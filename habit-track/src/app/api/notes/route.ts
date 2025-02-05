import NoteModel from "@/db/models/noteModel";
import UserModel from "@/db/models/userModel";
import { ObjectId } from "mongodb";

export async function POST(request: Request) {
  const userId = request.headers.get("x-user-id") as string;
  const body = await request.json();
  const user = await UserModel.findById(userId);

  if (!user) {
    return new Response("User not found", { status: 404 });
  }

  const newNote = {
    ...body,
    userId: new ObjectId(userId),
  };

  const note = await NoteModel.create(newNote);
  return new Response(JSON.stringify(note), { status: 201 });
}
