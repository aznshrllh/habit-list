import { z } from "zod";
import { database } from "../configs/mongoConfig";
import { ObjectId } from "mongodb";
import { AppError, UserType } from "@/types";
import { hashPassword } from "@/helpers/bcrypt";
import errorHandler from "@/helpers/errorHandler";

const userSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export default class UserModel {
  static collection() {
    const db = database();
    const collection = db.collection<UserType>("users");
    return collection;
  }

  static async create(user: UserType) {
    try {
      userSchema.parse(user);

      const existingUser = await this.findByEmail(user.email);

      if (existingUser) {
        throw {
          message: "Email already exists",
          status: 400,
        };
      }

      user.password = hashPassword(user.password);

      const result = {
        ...user,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      await this.collection().insertOne(result);

      // console.log(result, "<<<< result");
      return result;
    } catch (err) {
      // console.log(err, "<<<< error");
      return errorHandler(err as AppError);
    }
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
