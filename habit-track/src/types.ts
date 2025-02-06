import { ObjectId } from "mongodb";
import { ZodError } from "zod";

export type UserType = {
  _id?: ObjectId;
  name: string;
  email: string;
  password: string;
};

export type HabitType = {
  _id?: ObjectId;
  name: string;
  slug: string;
  description: string;
  category: string;
  points: number;
};

export type UserHabitType = {
  _id?: ObjectId;
  userId?: ObjectId;
  habitId?: ObjectId;
  frequency: number;
  interval: number;
  completed: boolean;
};

export type NoteType = {
  _id?: ObjectId;
  userId: ObjectId;
  name: string;
  description: string;
  points?: number;
};

export type ProgressType = {
  _id?: ObjectId;
  userId: ObjectId;
  habitId: ObjectId;
  date: Date;
  completed: boolean;
  notes?: string;
};

export type AchievementType = {
  _id?: ObjectId;
  title: string;
  description: string;
  category: string;
  points: number;
};

export type UserAchievementType = {
  _id?: ObjectId;
  userId: ObjectId;
  achievementId: ObjectId;
  completed: boolean;
};

export type UserPointsType = {
  _id?: ObjectId;
  userId: ObjectId;
  points: number;
};

export type BookType = {
  _id?: ObjectId;
  title: string;
  author: string;
  category: string;
  points: number;
};

export type DoneReadBookType = {
  _id?: ObjectId;
  userId?: ObjectId;
  bookId?: ObjectId;
  finishDate: string;
  rating?: number;
  notes?: string;
};

export type CustomError = {
  message: string;
  status: number;
};

export type AppError = CustomError | Error | ZodError;
