"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function AgencyHeader({ agencyName }: { agencyName: string }) {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  useEffect(() => {
    // Fetch avatar on mount
    fetchAvatar();

    // Listen for avatar updates
    const handleAvatarUpdate = (event: CustomEvent) => {
      setAvatarUrl(event.detail.avatarUrl);
    };

    window.addEventListener(
      "avatarUpdated",
      handleAvatarUpdate as EventListener
    );

    return () => {
      window.removeEventListener(
        "avatarUpdated",
        handleAvatarUpdate as EventListener
      );
    };
  }, []);

  const fetchAvatar = async () => {
    try {
      const res = await fetch("/api/agency/profile");
      if (res.ok) {
        const data = await res.json();
        setAvatarUrl(data.avatar_url);
      }
    } catch (error) {
      console.error("Fetch avatar error:", error);
    }
  };

  return (
    <header className="bg-white/80 backdrop-blur-xl sticky top-0 z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/agency/dashboard">
            <Image
              src="/logo.png"
              alt="Cviro"
              width={140}
              height={40}
              className="h-10 w-auto"
              priority
            />
          </Link>

          {/* Agency Avatar */}
          <Link
            href="/agency/dashboard/profile"
            className="w-10 h-10 rounded-full bg-[#536b4e] flex items-center justify-center text-base font-medium text-white hover:bg-[#435940] transition-colors overflow-hidden"
          >
            {avatarUrl ? (
              <Image
                src={avatarUrl}
                alt="Avatar"
                width={40}
                height={40}
                className="w-full h-full object-cover"
              />
            ) : (
              <span>{agencyName.charAt(0).toUpperCase()}</span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
