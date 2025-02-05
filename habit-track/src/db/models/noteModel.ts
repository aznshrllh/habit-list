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

  static async findById(noteId: string) {
    return this.collection().findOne({ _id: new ObjectId(noteId) });
  }

  static async updateById(noteId: string, body: NoteType) {
    const { name, description } = body;

    const note = noteSchema.parse({ name, description });

    const result = {
      ...note,
      updatedAt: new Date(),
    };

    await this.collection().updateOne(
      { _id: new ObjectId(noteId) },
      { $set: result }
    );
    return;

    return result;
  }

  static async deleteById(noteId: string) {
    await this.collection().deleteOne({ _id: new ObjectId(noteId) });
  }
}
