"use client";

import { handleLogout } from "@/actions";

export default function LogoutButton() {
  const handleLogoutClick = () => {
    handleLogout();
    window.location.href = "/login";
  };

  return (
    <button
      onClick={handleLogoutClick}
      className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
    >
      Logout
    </button>
  );
}
