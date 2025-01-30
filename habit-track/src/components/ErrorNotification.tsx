"use client";

import Swal from "sweetalert2";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function ErrorNotification() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  useEffect(() => {
    if (error) {
      Swal.fire({
        title: "Failed!",
        text: error,
        icon: "error",
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        // Remove the error parameter from the URL
        const url = new URL(window.location.href);
        url.searchParams.delete("error");
        window.history.replaceState({}, document.title, url.pathname);
      });
    }
  }, [error]);

  return null;
}
