"use client";
import { useError } from "@/context/errorContext";
import React, { useEffect } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const mySwal = withReactContent(Swal);

const ErrorNotification: React.FC = () => {
  const { error, setError } = useError();

  useEffect(() => {
    if (error) {
      mySwal.fire({
        title: "Oops...",
        text: error,
        icon: "error",
        confirmButtonText: "Ok",
      });
      setError(null);
    }
  }, [error, setError]);
  return null;
};

export default ErrorNotification;
