"use client";

import { useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";

export default function PostAuthRedirect() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const hasChecked = useRef(false);
  const isChecking = useRef(false);

  useEffect(() => {
    if (
      status === "authenticated" &&
      session?.user?.email &&
      !hasChecked.current &&
      !isChecking.current
    ) {
      // Don't redirect if already on dashboard or auth pages
      if (pathname.includes("/dashboard") || pathname.includes("/auth/")) {
        return;
      }

      // Only redirect from homepage
      if (pathname !== "/") {
        return;
      }

      hasChecked.current = true;
      isChecking.current = true;

      // Check if user exists in database
      fetch("/api/auth/check-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: session.user.email }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.exists && data.userType) {
            // User exists - go straight to dashboard
            router.replace(`/${data.userType}/dashboard`);
          } else {
            // New user - check if we have pendingUserType
            const pendingType = sessionStorage.getItem("pendingUserType");
            if (pendingType) {
              router.replace(`/auth/check?type=${pendingType}`);
            }
          }
        })
        .catch(() => {
          // On error, try to get userType from sessionStorage
          const pendingType =
            sessionStorage.getItem("pendingUserType") || "candidate";
          router.replace(`/auth/check?type=${pendingType}`);
        })
        .finally(() => {
          isChecking.current = false;
        });
    }
  }, [status, session, pathname, router]);

  return null;
}
