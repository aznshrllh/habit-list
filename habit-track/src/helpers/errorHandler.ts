// import { useError } from "@/context/errorContext";
import { AppError } from "@/types";
import { z } from "zod";

export default function errorHandler(err: AppError) {
  // const { setError } = useError();
  let message = err.message || "Internal Server Error";
  let status = 500;

  if ("status" in err) {
    status = err.status;
  }

  if (err instanceof z.ZodError) {
    status = 400;
    message = err.errors[0].message;
  }

  // setError(message);

  console.log(err, "<<<< error");
  return Response.json({ message: message }, { status: status });
}
