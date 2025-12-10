"use client";

import { signIn } from "next-auth/react";
import {
  ArrowRight,
  ShieldCheck,
  LockKeyhole,
  MessageCircle,
} from "lucide-react";

export default function CandidateLoginPage() {
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-xl space-y-8">
        <div className="text-center space-y-2">
          <p className="text-sm font-semibold uppercase tracking-wider text-[#ab3f20]">
            Người tìm việc
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Đăng nhập bằng Google
          </h1>
          <p className="text-base text-gray-600">
            Một cú click. Không mật khẩu. Được duyệt là xem và ứng tuyển job
            ngay.
          </p>
        </div>

        <div className="rounded-3xl bg-white border border-gray-100 shadow-xl p-8 space-y-6">
          <button
            type="button"
            className="w-full inline-flex items-center justify-center gap-3 bg-[#ab3f20] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#8b2f15] transition-all shadow-lg hover:shadow-xl"
            onClick={() => {
              sessionStorage.setItem("pendingUserType", "candidate");
              sessionStorage.removeItem("hasRedirected");
              signIn("google");
            }}
          >
            Tiếp tục với Google
            <ArrowRight className="w-5 h-5" />
          </button>

          <div className="grid gap-3 sm:grid-cols-3">
            <Mini item="Chính chủ" icon={ShieldCheck} />
            <Mini item="An toàn" icon={LockKeyhole} />
            <Mini item="Chat nhanh" icon={MessageCircle} />
          </div>

          <div className="rounded-2xl bg-gray-50 border border-gray-100 p-4 text-sm text-gray-600">
            Không spam, không thông tin giả. Vi phạm có thể bị khóa tài khoản.
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
