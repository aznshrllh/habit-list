import { z } from "zod";
import { database } from "../configs/mongoConfig";
import { ObjectId } from "mongodb";
import { UserType } from "@/types";
import { hashPassword } from "@/helpers/bcrypt";

const logSchema = z.object({
  _id: z.string().optional(),
  name: z.string(),
  date: z.string(),
  completed: z.boolean(),
});

const habitSchema = z.object({
  _id: z.string().optional(),
  name: z.string().min(3, "Name must be at least 3 characters"),
  goal: z.number().min(1, "Goal must be at least 1"),
  logs: z.array(logSchema),
});

const userSchema = z.object({
  _id: z.string().optional(),
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  habits: z.array(habitSchema),
});

export default class UserModel {
  static collection() {
    return database.collection<UserType>("users");
  }

  static async create(user: UserType) {
    userSchema.parse(user);

    const existingUser = await this.collection().findOne({ email: user.email });

    if (existingUser) {
      throw new Error("User already exists");
    }

    user.password = hashPassword(user.password);

    const result = {
      ...user,
      habits: [],
    };

    return this.collection().insertOne(result);
  }

  static async findByEmail(email: string) {
    return this.collection().findOne({ email });
  }

  static async findById(id: string) {
    const agg = [
      {
        $match: {
          _id: new ObjectId(id),
        },
      },
      {
        $project: {
          password: 0,
        },
      },
    ];
    return this.collection().aggregate(agg).toArray();
  }
}
