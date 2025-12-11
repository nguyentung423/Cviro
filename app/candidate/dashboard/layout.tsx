import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  User,
  Briefcase,
  FileText,
  LogOut,
} from "lucide-react";
import { CandidateService } from "@/lib/services/candidateService";
import MobileSidebar from "./MobileSidebar";
import DashboardHeader from "./DashboardHeader";
import LogoutButton from "./LogoutButton";

async function getCandidateData(email: string) {
  const candidate = await CandidateService.getProfile(email);
  if (!candidate) {
    return null;
  }

  const stats = await CandidateService.getApplicationStats(candidate.id);
  const recentApplications = await CandidateService.getRecentApplications(
    candidate.id
  );

  return { candidate, stats, recentApplications };
}

export default async function CandidateDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();

  if (!session?.user?.email) {
    redirect("/login/candidate");
  }

  const data = await getCandidateData(session.user.email);

  if (!data) {
    redirect("/login/candidate");
  }

  const { candidate, stats } = data;
  const firstName = candidate.name?.split(" ")[0] || "Bạn";

  return (
    <div className="min-h-screen bg-white">
      <DashboardHeader
        initialAvatarUrl={candidate.avatar_url}
        firstName={firstName}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
        <div className="flex gap-6 lg:gap-10">
          {/* Sidebar - Desktop only */}
          <aside className="hidden lg:block w-56 shrink-0">
            <div className="space-y-1">
              <nav className="space-y-0.5">
                <Link
                  href="/candidate/dashboard"
                  className="flex items-center gap-3 px-3 py-2 text-sm font-normal text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all"
                >
                  <LayoutDashboard className="w-4.5 h-4.5" />
                  Tổng quan
                </Link>
                <Link
                  href="/candidate/dashboard/profile"
                  className="flex items-center gap-3 px-3 py-2 text-sm font-normal text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all"
                >
                  <User className="w-4.5 h-4.5" />
                  Thông tin cá nhân
                </Link>
                <Link
                  href="/candidate/dashboard/jobs"
                  className="flex items-center gap-3 px-3 py-2 text-sm font-normal text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all"
                >
                  <Briefcase className="w-4.5 h-4.5" />
                  Tìm việc làm
                </Link>
                <Link
                  href="/candidate/dashboard/applications"
                  className="flex items-center gap-3 px-3 py-2 text-sm font-normal text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all"
                >
                  <FileText className="w-4.5 h-4.5" />
                  Đơn ứng tuyển
                </Link>
              </nav>

              {/* Stats Quick View */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="text-xs font-semibold text-gray-500 uppercase mb-3">
                  Thống kê
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Tổng đơn</span>
                    <span className="font-semibold text-gray-900">
                      {stats.total}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Chờ duyệt</span>
                    <span className="font-semibold text-yellow-600">
                      {stats.pending}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Được chấp nhận</span>
                    <span className="font-semibold text-green-600">
                      {stats.approved}
                    </span>
                  </div>
                </div>
              </div>

              {/* Logout Button */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <LogoutButton variant="sidebar" />
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">{children}</main>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <MobileSidebar stats={stats} />
    </div>
  );
}
