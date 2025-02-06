import HabitModel from "@/db/models/habitModel";
import UserModel from "@/db/models/userModel";

export async function POST(request: Request) {
  const body = await request.json();
  const userId = request.headers.get("x-user-id") as string;

  const user = await UserModel.findById(userId);
  if (!user) {
    return new Response(JSON.stringify({ message: "User not found" }), {
      status: 404,
    });
  }

  const existingHabit = await HabitModel.findByName(body.name);
  if (existingHabit) {
    return new Response(JSON.stringify({ message: "Habit already exists" }), {
      status: 400,
    });
  }

  const result = await HabitModel.create(body);
  return new Response(JSON.stringify({ message: "success adding habit" }), {
    status: 201,
  });
}
