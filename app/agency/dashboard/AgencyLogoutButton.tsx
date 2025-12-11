"use client";

import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

export default function AgencyLogoutButton() {
  const handleLogout = () => {
    signOut({ callbackUrl: "/" });
  };

  return (
    <button
      onClick={handleLogout}
      className="flex items-center gap-3 px-3 py-2 text-sm font-normal text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all w-full"
    >
      <LogOut className="w-4.5 h-4.5" />
      Đăng xuất
    </button>
  );
}
