"use server";

import { cookies } from "next/headers";
import errorHandler from "./helpers/errorHandler";
import { AppError } from "./types";
import { redirect } from "next/navigation";

const baseUrl = process.env.BASE_URL;

export async function handleLogin(email: string, password: string) {
  try {
    const res = await fetch(`${baseUrl}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const response = await res.json();

    if (!res.ok) {
      redirect(`/login?error=${encodeURIComponent(response.message)}`);
    }

    const cookieStore = await cookies();
    cookieStore.set("authorization", `Bearer ${response.access_token}`);

    return response;
  } catch (error) {
    throw error;
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

    const res = await response.json();

    if (!response.ok) {
      redirect(`/register?error={encodeURIComponent(res.message)}`);
    }

    return res;
  } catch (error) {
    return errorHandler(error as AppError);
  }
}

export const handleLogout = async () => {
  try {
    const cookieStore = await cookies();
    cookieStore.delete("authorization");

    return null;
  } catch (err) {
    return errorHandler(err as AppError);
  }
};
