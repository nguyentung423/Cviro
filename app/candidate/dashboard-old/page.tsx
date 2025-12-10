"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Bell,
  Settings,
  LogOut,
  TrendingUp,
  Clock,
  MapPin,
  ChevronRight,
  User,
  Star,
  FileText,
} from "lucide-react";

export default function CandidateDashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    async function checkAuth() {
      if (status === "unauthenticated") {
        router.replace("/login/candidate");
        return;
      }

      if (status === "authenticated" && session?.user?.email) {
        const res = await fetch("/api/auth/check-user", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: session.user.email }),
        });
        const data = await res.json();

        if (!data.exists || data.userType !== "candidate") {
          router.replace("/login/candidate");
        }
      }
    }
    checkAuth();
  }, [status, session, router]);

  if (status === "loading") {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#ab3f20] border-t-transparent rounded-full animate-spin"></div>
      </main>
    );
  }

  const firstName = session?.user?.name?.split(" ")[0] || "Bạn";

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <h1 className="text-xl font-bold text-[#ab3f20]">Cviro</h1>
              <nav className="hidden md:flex gap-6">
                <button
                  onClick={() => setActiveTab("overview")}
                  className={`text-sm font-medium transition-colors ${
                    activeTab === "overview"
                      ? "text-[#ab3f20]"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Tổng quan
                </button>
                <button
                  onClick={() => setActiveTab("jobs")}
                  className={`text-sm font-medium transition-colors ${
                    activeTab === "jobs"
                      ? "text-[#ab3f20]"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Việc làm
                </button>
                <button
                  onClick={() => setActiveTab("applications")}
                  className={`text-sm font-medium transition-colors ${
                    activeTab === "applications"
                      ? "text-[#ab3f20]"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Ứng tuyển
                </button>
              </nav>
            </div>

            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Bell className="w-5 h-5 text-gray-600" />
              </button>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[#ab3f20] text-white rounded-full flex items-center justify-center text-sm font-medium">
                  {firstName.charAt(0).toUpperCase()}
                </div>
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Sidebar - Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-[#ab3f20] to-[#8b2f15] text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {firstName.charAt(0).toUpperCase()}
                </div>
                <h2 className="text-lg font-semibold text-gray-900">
                  {session?.user?.name}
                </h2>
                <p className="text-sm text-gray-500">{session?.user?.email}</p>
              </div>

              <div className="border-t border-gray-200 pt-4 space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Độ hoàn thiện hồ sơ</span>
                  <span className="font-medium text-gray-900">40%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-[#ab3f20] h-2 rounded-full"
                    style={{ width: "40%" }}
                  ></div>
                </div>
                <button className="w-full text-sm text-[#ab3f20] font-medium hover:bg-[#ab3f20]/5 py-2 rounded-lg transition-colors">
                  Hoàn thiện hồ sơ →
                </button>
              </div>

              <div className="border-t border-gray-200 mt-6 pt-6 space-y-2">
                <button
                  onClick={() => router.push("/candidate/profile")}
                  className="w-full flex items-center gap-3 text-sm text-gray-700 hover:bg-gray-50 p-2 rounded-lg transition-colors"
                >
                  <User className="w-4 h-4" />
                  Thông tin cá nhân
                </button>
                <button className="w-full flex items-center gap-3 text-sm text-gray-700 hover:bg-gray-50 p-2 rounded-lg transition-colors">
                  <FileText className="w-4 h-4" />
                  CV của tôi
                </button>
                <button className="w-full flex items-center gap-3 text-sm text-gray-700 hover:bg-gray-50 p-2 rounded-lg transition-colors">
                  <Settings className="w-4 h-4" />
                  Cài đặt
                </button>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Welcome Banner */}
            <div className="bg-gradient-to-r from-[#ab3f20] to-[#8b2f15] rounded-lg p-6 text-white">
              <h1 className="text-2xl font-bold mb-2">
                Chào mừng trở lại, {firstName}! 👋
              </h1>
              <p className="text-white/90 mb-4">
                Bạn có 3 việc làm mới phù hợp với hồ sơ của bạn
              </p>
              <button className="bg-white text-[#ab3f20] px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                Xem ngay
              </button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <FileText className="w-5 h-5 text-blue-600" />
                  </div>
                </div>
                <p className="text-2xl font-bold text-gray-900">5</p>
                <p className="text-sm text-gray-600">Đơn ứng tuyển</p>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                  </div>
                </div>
                <p className="text-2xl font-bold text-gray-900">2</p>
                <p className="text-sm text-gray-600">Đang xem xét</p>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Star className="w-5 h-5 text-purple-600" />
                  </div>
                </div>
                <p className="text-2xl font-bold text-gray-900">12</p>
                <p className="text-sm text-gray-600">Việc đã lưu</p>
              </div>
            </div>

            {/* Recommended Jobs */}
            <div className="bg-white rounded-lg border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">
                  Việc làm phù hợp với bạn
                </h2>
              </div>
              <div className="divide-y divide-gray-200">
                {[
                  {
                    title: "PG Bán hàng - Sự kiện khai trương",
                    company: "Công ty ABC",
                    location: "TP. Hồ Chí Minh",
                    salary: "2-3 triệu/ngày",
                    time: "2 ngày trước",
                    featured: true,
                  },
                  {
                    title: "Model chụp ảnh sản phẩm",
                    company: "Studio XYZ",
                    location: "Hà Nội",
                    salary: "1.5-2 triệu/buổi",
                    time: "5 ngày trước",
                    featured: false,
                  },
                  {
                    title: "MC dẫn chương trình sự kiện",
                    company: "Event Solutions",
                    location: "Đà Nẵng",
                    salary: "3-5 triệu/sự kiện",
                    time: "1 tuần trước",
                    featured: false,
                  },
                ].map((job, idx) => (
                  <div
                    key={idx}
                    className="p-4 hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium text-gray-900">
                            {job.title}
                          </h3>
                          {job.featured && (
                            <span className="bg-[#ab3f20] text-white text-xs px-2 py-0.5 rounded">
                              Hot
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mb-2">
                          {job.company}
                        </p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {job.location}
                          </span>
                          <span className="font-medium text-[#ab3f20]">
                            {job.salary}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {job.time}
                          </span>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-4 border-t border-gray-200">
                <button className="text-sm text-[#ab3f20] font-medium hover:underline">
                  Xem tất cả việc làm →
                </button>
              </div>
            </div>

            {/* Recent Applications */}
            <div className="bg-white rounded-lg border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">
                  Đơn ứng tuyển gần đây
                </h2>
              </div>
              <div className="p-6">
                <p className="text-center text-gray-500 py-8">
                  Bạn chưa có đơn ứng tuyển nào
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
