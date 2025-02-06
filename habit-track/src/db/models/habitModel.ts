import { z } from "zod";
import { ObjectId } from "mongodb";
import { HabitType } from "@/types";
import { database } from "../configs/mongoConfig";

const habitSchema = z.object({
  name: z.string(),
  description: z.string(),
  category: z.string(),
  points: z.number(),
});

export default class HabitModel {
  static async collection() {
    const db = database();
    return db.collection<HabitType>("habits");
  }

  static async create(body: HabitType) {
    const { name, description, category, points } = body;

    const habit = habitSchema.parse({ name, description, category, points });

    const result = {
      ...habit,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await (await this.collection()).insertOne(result);
    return result;
  }
}
