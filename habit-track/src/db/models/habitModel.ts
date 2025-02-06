import { z } from "zod";
import { ObjectId } from "mongodb";
import { HabitType } from "@/types";
import { database } from "../configs/mongoConfig";

const habitSchema = z.object({
  name: z.string(),
  slug: z.string(),
  description: z.string(),
  category: z.string(),
  points: z.number(),
});

export default class HabitModel {
  static collection() {
    const db = database();
    return db.collection<HabitType>("habits");
  }

  static async findAll() {
    const habits = await this.collection().find().toArray();
    return habits;
  }

  static async findByName(name: string) {
    return await this.collection().findOne({
      name: { $regex: new RegExp(`^${name}$`, "i") },
    });
  }

  static async create(body: HabitType) {
    const { name, description, category, points } = body;

    const slug = name
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");

    const habit = habitSchema.parse({
      name,
      slug,
      description,
      category,
      points,
    });

    const result = {
      ...habit,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    return await this.collection().insertOne(result);
  }
}
