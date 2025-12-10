"use client";

import { useEffect, useState, useRef, Suspense } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { AlertCircle } from "lucide-react";

function AuthCheckContent() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const userType = searchParams.get("type") || "candidate";
  const [error, setError] = useState("");
  const hasChecked = useRef(false);

  useEffect(() => {
    async function checkUser() {
      if (status === "loading") return;

      if (status === "unauthenticated") {
        router.push(`/login/${userType}`);
        return;
      }

      if (!session?.user?.email) {
        router.push(`/login/${userType}`);
        return;
      }

      if (hasChecked.current) return;
      hasChecked.current = true;

      try {
        // Quick client-side check
        const res = await fetch(`/api/auth/check-user`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: session.user.email, userType }),
        });

        const data = await res.json();

        if (data.exists) {
          // Check if exists but wrong role
          if (data.userType && data.userType !== userType) {
            const roleName =
              data.userType === "candidate" ? "Candidate" : "Agency";
            setError(
              `Email này đã được đăng ký với vai trò ${roleName}. Vui lòng đăng nhập với vai trò tương ứng hoặc sử dụng email khác.`
            );
            return;
          }
          // User exists with correct role - go to dashboard
          router.replace(`/${userType}/dashboard`);
        } else {
          // New user - need OTP
          router.replace(`/auth/verify-otp?type=${userType}`);
        }
      } catch (error) {
        console.error("Check user error:", error);
        // On error, assume new user
        router.replace(`/auth/verify-otp?type=${userType}`);
      }
    }

    checkUser();
  }, [session, status, router, userType]);

  if (error) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6 text-center space-y-4">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
            <AlertCircle className="w-8 h-8 text-red-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-900">
            Email đã được sử dụng
          </h2>
          <p className="text-gray-600">{error}</p>
          <div className="flex flex-col gap-3 mt-6">
            <button
              onClick={() => {
                signOut({ redirect: false });
                router.push("/");
              }}
              className="px-4 py-2 bg-[#ab3f20] text-white rounded-lg hover:bg-[#8a3219] transition-colors font-medium"
            >
              Về trang chủ
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 border-4 border-[#ab3f20] border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="text-gray-600">Đang kiểm tra...</p>
      </div>
    </main>
  );
}

export default function AuthCheckPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 border-4 border-[#ab3f20] border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-gray-600">Đang tải...</p>
          </div>
        </main>
      }
    >
      <AuthCheckContent />
    </Suspense>
  );
}
