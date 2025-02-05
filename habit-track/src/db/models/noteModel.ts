import { database } from "../configs/mongoConfig";
import { z } from "zod";
import { ObjectId } from "mongodb";
import { NoteType } from "@/types";

const noteSchema = z.object({
  name: z.string(),
  description: z.string(),
});

export default class NoteModel {
  static collection() {
    const db = database();
    return db.collection<NoteType>("notes");
  }

  static async create({ userId, body }: { userId: string; body: NoteType }) {
    const { name, description } = body;

    const note = noteSchema.parse({ name, description });

    const result = {
      ...note,
      userId: new ObjectId(userId),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await this.collection().insertOne(result);
    return result;
  }
}
