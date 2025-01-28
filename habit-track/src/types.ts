import { ObjectId } from "mongodb";
import { ZodError } from "zod";

export type UserType = {
  _id?: ObjectId;
  name: string;
  email: string;
  password: string;
  habits: HabitType[];
};

export type HabitType = {
  _id?: ObjectId;
  name: string;
  goal: number;
  logs: IntervalType[];
};

//interval type seperti daily, weekly, monthly
export type IntervalType = {
  _id?: ObjectId;
  name: string;
  date: string;
  completed: boolean;
};

export type CustomError = {
  message: string;
  status: number;
};

export type AppError = CustomError | Error | ZodError;
