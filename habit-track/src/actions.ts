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
      throw new Error("Invalid credentials");
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
}

export const handleRegister = async (formData: FormData) => {
  try {
    const rawFormData = {
      email: formData.get("email"),
      password: formData.get("password"),
      name: formData.get("name"),
    };

    if (!rawFormData.email || !rawFormData.password || !rawFormData.name) {
      throw { message: "Email, Password, and Name are required", status: 400 };
    }

    const res = await fetch(`${baseUrl}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(rawFormData),
    });

    const response = await res.json();

    if (!res.ok) {
      throw { message: response.message, status: res.status };
    }

    redirect("/login");
  } catch (err) {
    return errorHandler(err as AppError);
  }
};

export const handleLogout = async () => {
  try {
    const cookieStore = await cookies();
    cookieStore.delete("authorization");
    redirect("/login");
  } catch (err) {
    return errorHandler(err as AppError);
  }
};
