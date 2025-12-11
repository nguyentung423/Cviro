"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Users, Briefcase, ArrowRight, X } from "lucide-react";

export default function SignupPage() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(true);

  const handleRoleSelect = (role: "candidate" | "agency") => {
    if (role === "candidate") {
      router.push("/login/candidate");
    } else {
      router.push("/login/agency");
    }
  };

  const handleClose = () => {
    setIsModalOpen(false);
    router.push("/");
  };

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      {/* Modal */}
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl animate-in slide-in-from-bottom-8 duration-300">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Đóng"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>

        {/* Header */}
        <div className="text-center pt-8 pb-6 px-6 border-b border-gray-100">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Chào mừng đến với Cviro! 👋
          </h1>
          <p className="text-gray-600">Bạn muốn đăng ký với vai trò nào?</p>
        </div>

        {/* Role Selection */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Candidate Option */}
          <button
            onClick={() => handleRoleSelect("candidate")}
            className="group relative overflow-hidden rounded-2xl border-2 border-gray-200 bg-white p-6 text-left transition-all hover:border-[#ab3f20] hover:shadow-xl active:scale-95"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#ab3f20]/5 to-[#ab3f20]/0 opacity-0 transition-opacity group-hover:opacity-100" />

            <div className="relative">
              <div className="mb-4 inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#ab3f20]/10 text-[#ab3f20] group-hover:scale-110 transition-transform">
                <Users className="w-7 h-7" />
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Người tìm việc
              </h3>

              <p className="text-sm text-gray-600 mb-4">
                Tìm kiếm và ứng tuyển các công việc sự kiện phù hợp với bạn
              </p>

              <div className="flex items-center gap-2 text-[#ab3f20] font-semibold text-sm">
                <span>Tiếp tục</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </button>

          {/* Agency Option */}
          <button
            onClick={() => handleRoleSelect("agency")}
            className="group relative overflow-hidden rounded-2xl border-2 border-gray-200 bg-white p-6 text-left transition-all hover:border-[#536b4e] hover:shadow-xl active:scale-95"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#536b4e]/5 to-[#536b4e]/0 opacity-0 transition-opacity group-hover:opacity-100" />

            <div className="relative">
              <div className="mb-4 inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#536b4e]/10 text-[#536b4e] group-hover:scale-110 transition-transform">
                <Briefcase className="w-7 h-7" />
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Nhà tuyển dụng
              </h3>

              <p className="text-sm text-gray-600 mb-4">
                Đăng tin tuyển dụng và tìm kiếm ứng viên phù hợp cho sự kiện
              </p>

              <div className="flex items-center gap-2 text-[#536b4e] font-semibold text-sm">
                <span>Tiếp tục</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </button>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 rounded-b-3xl border-t border-gray-100">
          <p className="text-center text-sm text-gray-500">
            Đăng ký miễn phí • Không cần thẻ tín dụng • Bắt đầu ngay
          </p>
        </div>
      </div>
    </div>
  );
}
