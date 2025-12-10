"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import NotificationBell from "@/components/candidate/NotificationBell";

export default function DashboardHeader({
  initialAvatarUrl,
  firstName,
}: {
  initialAvatarUrl: string | null;
  firstName: string;
}) {
  const [avatarUrl, setAvatarUrl] = useState(initialAvatarUrl);

  // Fetch fresh avatar on mount and listen for updates
  useEffect(() => {
    // Fetch latest avatar from API
    const fetchAvatar = async () => {
      try {
        const res = await fetch("/api/candidate/profile");
        if (res.ok) {
          const data = await res.json();
          if (data.avatar_url) {
            setAvatarUrl(data.avatar_url);
          }
        }
      } catch (error) {
        console.error("Failed to fetch avatar:", error);
      }
    };

    fetchAvatar();

    // Listen for real-time updates
    const handleAvatarUpdate = (event: Event) => {
      const customEvent = event as CustomEvent<{ avatarUrl: string }>;
      setAvatarUrl(customEvent.detail.avatarUrl);
    };

    window.addEventListener("avatarUpdated", handleAvatarUpdate);

    return () => {
      window.removeEventListener("avatarUpdated", handleAvatarUpdate);
    };
  }, []);

  return (
    <header className="bg-white/80 backdrop-blur-xl sticky top-0 z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/candidate/dashboard">
            <Image
              src="/logo.png"
              alt="Cviro"
              width={140}
              height={40}
              className="h-10 w-auto"
              priority
            />
          </Link>

          {/* Right Section */}
          <div className="flex items-center gap-2">
            {/* Notification Bell */}
            <NotificationBell />

            {/* Avatar - Link to Profile */}
            <Link href="/candidate/profile">
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt="Avatar"
                  className="w-10 h-10 rounded-full object-cover hover:opacity-90 transition-opacity cursor-pointer"
                />
              ) : (
                <button className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-base font-medium text-gray-700 hover:bg-gray-300 transition-colors">
                  {firstName.charAt(0).toUpperCase()}
                </button>
              )}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
