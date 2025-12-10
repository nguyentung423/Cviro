"use client";

import { signIn, useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import {
  ArrowRight,
  ShieldCheck,
  Building2,
  MessageCircle,
} from "lucide-react";

function Pill({ label }: { label: string }) {
  return (
    <span className="rounded-full bg-white px-4 py-2 text-sm font-medium text-gray-700 border border-gray-200 shadow-sm">
      {label}
    </span>
  );
}

export default function AgencyLoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    async function handleExistingSession() {
      if (status === "authenticated" && session?.user?.email) {
        // Check if user already exists
        const res = await fetch("/api/auth/check-user", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: session.user.email,
            userType: "agency",
          }),
        });
        const data = await res.json();

        if (data.exists && data.userType === "agency") {
          // User is already agency, go to dashboard
          router.replace("/agency/dashboard");
        } else if (data.exists && data.userType === "candidate") {
          // User is candidate, need to sign out first
          await signOut({ redirect: false });
          alert(
            "Email này đã đăng ký với vai trò Candidate. Vui lòng đăng xuất và sử dụng email khác để đăng ký Agency."
          );
        }
      }
    }

    handleExistingSession();
  }, [status, session, router]);

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-xl space-y-8">
        <div className="text-center space-y-2">
          <p className="text-sm font-semibold uppercase tracking-wider text-[#ab3f20]">
            Agency
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Đăng nhập bằng Google
          </h1>
          <p className="text-base text-gray-600">
            Xác thực nhanh. Không mật khẩu. Vào quản lý job và ứng viên ngay sau
            khi đăng nhập.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 justify-center">
          <Pill label="Miễn phí" />
          <Pill label="Không spam" />
          <Pill label="Duyệt ứng viên" />
        </div>

        <div className="rounded-3xl bg-white border border-gray-100 shadow-xl p-8 space-y-6">
          <button
            type="button"
            className="w-full inline-flex items-center justify-center gap-3 bg-[#ab3f20] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#8b2f15] transition-all shadow-lg hover:shadow-xl"
            onClick={() => {
              sessionStorage.setItem("pendingUserType", "agency");
              sessionStorage.removeItem("hasRedirected");
              signIn("google");
            }}
          >
            Tiếp tục với Google
            <ArrowRight className="w-5 h-5" />
          </button>

          <div className="grid gap-3 sm:grid-cols-3">
            <Mini item="Xác thực" icon={ShieldCheck} />
            <Mini item="Quản lý job" icon={Building2} />
            <Mini item="Trao đổi" icon={MessageCircle} />
          </div>

          <div className="rounded-2xl bg-gray-50 border border-gray-100 p-4 text-sm text-gray-600">
            Khi tiếp tục, bạn cam kết không spam, không thông tin giả. Vi phạm
            có thể bị khóa tài khoản.
          </div>

          <p className="text-xs text-gray-500 text-center">
            Google chỉ chia sẻ email và tên. Chúng tôi không lưu mật khẩu của
            bạn.
          </p>
        </div>
      </div>
    </main>
  );
}

function Mini({
  item,
  icon: Icon,
}: {
  item: string;
  icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <div className="flex items-center gap-2 rounded-xl border border-gray-100 bg-white px-3 py-2 shadow-sm">
      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#ab3f20]/10 text-[#ab3f20]">
        <Icon className="w-4 h-4" />
      </span>
      <span className="text-sm font-semibold text-gray-800">{item}</span>
    </div>
  );
}
