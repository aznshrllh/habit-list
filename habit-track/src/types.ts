import { ObjectId } from "mongodb";

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
