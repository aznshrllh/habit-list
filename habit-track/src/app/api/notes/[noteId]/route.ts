import NoteModel from "@/db/models/noteModel";
import { AppError } from "@/types";
import errorHandler from "@/helpers/errorHandler";

export async function PUT(
  request: Request,
  { params }: { params: { noteId: string } }
) {
  try {
    const userId = request.headers.get("x-user-id") as string;
    const { noteId } = params;

    const note = await NoteModel.findById(noteId.toString());

    if (!note) {
      throw { message: "Note not found", status: 404 };
    }
    if (!userId) {
      throw { message: "Unauthorized", status: 401 };
    }
    if (userId !== note.userId.toString()) {
      throw { message: "Unauthorized", status: 401 };
    }

    const newNote = await request.json();
    if (!newNote.name || !newNote.description) {
      throw { message: "Name and description are required", status: 400 };
    }

    const result = await NoteModel.updateById(noteId, newNote);
    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    return errorHandler(error as AppError);
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { noteId: string } }
) {
  try {
    const userId = request.headers.get("x-user-id") as string;
    const { noteId } = params;

    const note = await NoteModel.findById(noteId.toString());
    if (!note) {
      throw { message: "Note not found", status: 404 };
    }

    if (!userId) {
      throw { message: "Unauthorized", status: 401 };
    }

    if (userId !== note.userId.toString()) {
      throw { message: "Unauthorized", status: 401 };
    }
    await NoteModel.deleteById(noteId);
    return new Response(JSON.stringify({ message: "Note deleted" }), {
      status: 200,
    });
  } catch (error) {
    return errorHandler(error as AppError);
  }
}

export async function GET(
  request: Request,
  { params }: { params: { noteId: string } }
) {
  try {
    const userId = request.headers.get("x-user-id") as string;
    const { noteId } = params;

    const note = await NoteModel.findById(noteId.toString());

    if (!note) {
      throw { message: "Note not found", status: 404 };
    }

    if (userId !== note.userId.toString()) {
      throw { message: "Unauthorized", status: 401 };
    }

    return new Response(JSON.stringify(note), { status: 200 });
  } catch (error) {
    return errorHandler(error as AppError);
  }
}
