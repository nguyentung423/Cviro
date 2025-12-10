"use client";

import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

export default function LogoutButton() {
  return (
    <button
      onClick={() => signOut({ redirect: true, callbackUrl: "/" })}
      className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1"
    >
      <LogOut className="w-4 h-4" />
    </button>
  );
}
