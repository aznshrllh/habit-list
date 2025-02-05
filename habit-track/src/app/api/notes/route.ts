import NoteModel from "@/db/models/noteModel";
import UserModel from "@/db/models/userModel";

export async function POST(request: Request) {
  const userId = request.headers.get("x-user-id") as string;
  // console.log(userId, "<<<< userId");
  const body = await request.json();
  // console.log(body, "<<<< body");

  const user = await UserModel.findById(userId);

  if (!user) {
    return new Response(JSON.stringify({ message: "User not found" }), {
      status: 404,
    });
  }

  if (!body.name || !body.description) {
    return new Response(
      JSON.stringify({ message: "Name and description are required" }),
      { status: 400 }
    );
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
}

export async function GET(request: Request) {
  const userId = request.headers.get("x-user-id") as string;
  // console.log(userId, "<<<< userId");

  const user = await UserModel.findById(userId);

  if (!user) {
    return new Response(JSON.stringify({ message: "User not found" }), {
      status: 404,
    });
  }

  const notes = await NoteModel.findByUserId(userId);

  return new Response(JSON.stringify(notes), { status: 200 });
}
