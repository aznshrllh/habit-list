// import { comparePassword } from "@/helpers/bcrypt";

// export async function POST(request: Request) {
//   const body: { email: string; password: string } = await request.json();

//   if (!body.email || !body.password) {
//     return new Response(
//       JSON.stringify({ message: "Email and password are required" }),
//       {
//         status: 400,
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//     );
//   }

//   if (!user) {
//     throw { message: "Invalid email or password", status: 401 };
//   }

//   const comparedPassword = comparePassword(body.password, user.password);
// }
