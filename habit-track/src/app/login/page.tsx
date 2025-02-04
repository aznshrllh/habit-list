"use client";
import React, { useState } from "react";
import { handleLogin } from "@/actions";
import ErrorNotification from "@/components/ErrorNotification";
import { AppError } from "@/types";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<AppError | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await handleLogin(email, password);
      if (response.status >= 400) {
        setError(response);
      } else {
        window.location.href = "/dashboard"; // Redirect to dashboard
      }
    } catch (error: any) {
      setError(error);
    }
  };

  return (
    <>
      <ErrorNotification />
      <div className="flex items-center justify-center min-h-screen bg-gray-200">
        <div className="w-full max-w-md p-8 space-y-6 bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 rounded-lg shadow-md backdrop-blur-sm">
          <h2 className="text-2xl font-bold text-center text-gray-800">
            LOGIN
          </h2>
          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="input input-bordered flex items-center gap-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="h-4 w-4 opacity-70"
                >
                  <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                  <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                </svg>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="grow"
                  required
                />
              </label>
            </div>
            <div>
              <label
                htmlFor="password"
                className="input input-bordered flex items-center gap-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="h-4 w-4 opacity-70"
                >
                  <path
                    fillRule="evenodd"
                    d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                    clipRule="evenodd"
                  />
                </svg>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="grow"
                  required
                />
              </label>
            </div>
            <div className="flex items-center justify-center space-x-2 text-sm">
              <span className="text-gray-600">Don't have an account?</span>
              <a
                href="/register"
                className="font-semibold text-gray-800 hover:text-gray-600 transition-colors duration-300 underline decoration-gray-400 hover:decoration-gray-600"
              >
                Register here
              </a>
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="btn btn-sm bg-gray-600 hover:bg-gray-800 text-white transition-colors duration-300"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
