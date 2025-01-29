// // logout route

// import errorHandler from "@/helpers/errorHandler";
// import { AppError } from "@/types";
// import { cookies } from "next/headers";

// export async function DELETE() {
//   try {
//     const cookieStore = await cookies();
//     cookieStore.delete("authorization");
//     return Response.json({ message: "Logged out" }, { status: 200 });
//   } catch (err) {
//     return errorHandler(err as AppError);
//   }
// }
