import NoteModel from "@/db/models/noteModel";
import { AppError } from "@/types";

export async function PUT(
  request: Request,
  { params }: { params: { noteId: string } }
) {
  const userId = request.headers.get("x-user-id") as string;

  const { noteId } = params;
  // console.log(params, "<<<< notesId");

  const note = await NoteModel.findById(noteId.toString());

  // console.log(note, "<<<< note");
  if (!note) {
    return new Response(JSON.stringify({ message: "Note not found" }), {
      status: 404,
    });
  }

  if (!userId) {
    return new Response(JSON.stringify({ message: "Unauthorized" }), {
      status: 401,
    });
  }
  if (userId !== note.userId.toString()) {
    return new Response(JSON.stringify({ message: "Unauthorized" }), {
      status: 401,
    });
  }

  const newNote = await request.json();
  // console.log(newNote, "<<<< newNote");

  try {
    if (!newNote.name || !newNote.description) {
      return new Response(
        JSON.stringify({ message: "Name and description are required" }),
        { status: 400 }
      );
    }

    const result = await NoteModel.updateById(noteId, newNote);
    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    const err = error as AppError;
    return new Response(JSON.stringify({ message: err.message }), {
      status: 400,
    });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { noteId: string } }
) {
  const userId = request.headers.get("x-user-id") as string;
  const { noteId } = params;

  const note = await NoteModel.findById(noteId.toString());
  if (!note) {
    return new Response(JSON.stringify({ message: "Note not found" }), {
      status: 404,
    });
  }

  if (!userId) {
    return new Response(JSON.stringify({ message: "Unauthorized" }), {
      status: 401,
    });
  }

  if (userId !== note.userId.toString()) {
    return new Response(JSON.stringify({ message: "Unauthorized" }), {
      status: 401,
    });
  }

  try {
    await NoteModel.deleteById(noteId);
    return new Response(JSON.stringify({ message: "Note deleted" }), {
      status: 200,
    });
  } catch (error) {
    const err = error as AppError;
    return new Response(JSON.stringify({ message: err.message }), {
      status: 400,
    });
  }
}
