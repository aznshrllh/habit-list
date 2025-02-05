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

  static async create(body: NoteType) {
    const { name, description, userId } = body;
    // console.log(body, "<<<< body");

    const note = noteSchema.parse({ name, description });
    // console.log(note, "<<<< note");

    const result = {
      ...note,
      userId: new ObjectId(userId),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // console.log(result, "<<<< result");

    await this.collection().insertOne(result);
    return result;
  }

  static async findByUserId(userId: string) {
    return this.collection()
      .find({ userId: new ObjectId(userId) })
      .toArray();
  }
}
