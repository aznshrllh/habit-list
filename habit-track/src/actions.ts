"use server";

import { cookies } from "next/headers";
import errorHandler from "./helpers/errorHandler";
import { AppError } from "./types";
import { redirect } from "next/navigation";

const baseUrl = process.env.BASE_URL;

// export const handleLogin = async (formData: FormData) => {
//   try {
//     const rawFormData = {
//       email: formData.get("email"),
//       password: formData.get("password"),
//     };

//     const res = await fetch(`${baseUrl}/api/auth/login`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(rawFormData),
//     });

//     const response = await res.json();

//     if (!res.ok) {
//       throw { message: response.message, status: res.status };
//     }
//     const cookieStore = await cookies();
//     cookieStore.set("authorization", `Bearer ${response.access_token}`);
//     redirect("/");
//   } catch (err) {
//     return errorHandler(err as AppError);
//   }
// };

export async function handleLogin(email: string, password: string) {
  try {
    const response = await fetch(`${baseUrl}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error("Invalid email or password");
    }

    return await response.json();
  } catch (error) {
    return errorHandler(error as AppError);
  }
}

export async function handleRegister(
  email: string,
  password: string,
  name: string
) {
  try {
    const response = await fetch(`${baseUrl}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, name }),
    });

    if (!response.ok) {
      throw new Error("Invalid email or password");
    }

    return await response.json();
  } catch (error) {
    return errorHandler(error as AppError);
  }
}

// export const handleRegister = async (formData: FormData) => {
//   try {
//     const rawFormData = {
//       email: formData.get("email"),
//       password: formData.get("password"),
//       name: formData.get("name"),
//     };

//     if (!rawFormData.email || !rawFormData.password || !rawFormData.name) {
//       throw { message: "Email, Password, and Name are required", status: 400 };
//     }

//     const res = await fetch(`${baseUrl}/api/auth/register`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(rawFormData),
//     });

//     const response = await res.json();

//     if (!res.ok) {
//       throw { message: response.message, status: res.status };
//     }

//     redirect("/login");
//   } catch (err) {
//     return errorHandler(err as AppError);
//   }
// };

// export async function handleLogout() {
//   try {
//     // ambil dari api/auth/logout/route.ts
//     const response = await fetch(`${baseUrl}/api/auth/logout`, {
//       method: "DELETE",
//     });
//     if (!response.ok) {
//       throw new Error("Failed to logout");
//     }
//     window.location.href = "/login";
//   } catch (err) {
//     return errorHandler(err as AppError);
//   }
// }
// export const handleLogout = async () => {
//   try {
//     const cookieStore = await cookies();
//     cookieStore.delete("authorization");
//     redirect("/login");
//   } catch (err) {
//     return errorHandler(err as AppError);
//   }
// };
