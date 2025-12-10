import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { CandidateService } from "@/lib/services/candidateService";

export const dynamic = "force-dynamic";
import ApplicationStatusCard from "@/components/candidate/ApplicationStatusCard";
import Link from "next/link";
import {
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  Briefcase,
  Search,
} from "lucide-react";

async function getOverviewData(email: string) {
  const candidate = await CandidateService.getProfile(email);
  if (!candidate) return null;

  const stats = await CandidateService.getApplicationStats(candidate.id);
  const recentApplications = await CandidateService.getRecentApplications(
    candidate.id
  );

  return { candidate, stats, recentApplications };
}

export default async function DashboardOverviewPage() {
  const session = await getServerSession();

  if (!session?.user?.email) {
    redirect("/login/candidate");
  }

  const data = await getOverviewData(session.user.email);

  if (!data) {
    redirect("/login/candidate");
  }

  const { candidate, stats, recentApplications } = data;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
            Tổng quan
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Theo dõi tiến độ ứng tuyển của bạn
          </p>
        </div>
        <Link
          href="/candidate/dashboard/jobs"
          className="flex items-center gap-2 px-4 py-2.5 bg-[#ab3f20] text-white rounded-xl hover:bg-[#8a3219] transition-colors text-sm font-medium shadow-sm"
        >
          <Search className="w-4 h-4" />
          <span className="hidden sm:inline">Tìm việc làm</span>
          <span className="sm:hidden">Tìm việc</span>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center sm:justify-between gap-3">
            <div>
              <p className="text-xs sm:text-sm text-gray-600 font-medium">
                Tổng đơn
              </p>
              <p className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1">
                {stats.total}
              </p>
            </div>
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Briefcase className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2 sm:mt-3">
            Tổng số đơn ứng tuyển
          </p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center sm:justify-between gap-3">
            <div>
              <p className="text-xs sm:text-sm text-gray-600 font-medium">
                Chờ duyệt
              </p>
              <p className="text-2xl sm:text-3xl font-bold text-yellow-600 mt-1">
                {stats.pending}
              </p>
            </div>
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-600" />
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2 sm:mt-3">
            Đang chờ phản hồi
          </p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center sm:justify-between gap-3">
            <div>
              <p className="text-xs sm:text-sm text-gray-600 font-medium">
                Được chấp nhận
              </p>
              <p className="text-2xl sm:text-3xl font-bold text-green-600 mt-1">
                {stats.approved}
              </p>
            </div>
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2 sm:mt-3">Đơn được duyệt</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center sm:justify-between gap-3">
            <div>
              <p className="text-xs sm:text-sm text-gray-600 font-medium">
                Bị từ chối
              </p>
              <p className="text-2xl sm:text-3xl font-bold text-red-600 mt-1">
                {stats.rejected}
              </p>
            </div>
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <XCircle className="w-5 h-5 sm:w-6 sm:h-6 text-red-600" />
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2 sm:mt-3">Đơn không đạt</p>
        </div>
      </div>

      {/* Recent Applications */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-4 sm:p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base sm:text-lg font-semibold text-gray-900">
                Đơn ứng tuyển gần đây
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 mt-1">
                5 đơn ứng tuyển mới nhất
              </p>
            </div>
            <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
          </div>
        </div>

        <div className="p-4 sm:p-6">
          {recentApplications.length === 0 ? (
            <div className="text-center py-8 sm:py-12">
              <Briefcase className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-sm sm:text-base text-gray-600">
                Bạn chưa có đơn ứng tuyển nào
              </p>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">
                Hãy bắt đầu tìm việc làm phù hợp với bạn
              </p>
            </div>
          ) : (
            <ApplicationStatusCard applications={recentApplications} />
          )}
        </div>
      </div>

      {/* Profile Completion Reminder */}
      {(() => {
        const hasBasicInfo =
          candidate.name &&
          candidate.age &&
          candidate.height &&
          candidate.weight &&
          candidate.zalo &&
          candidate.experience;
        const photoCount = [
          candidate.photo_1,
          candidate.photo_2,
          candidate.photo_3,
          candidate.photo_4,
        ].filter(Boolean).length;
        const isComplete = hasBasicInfo && photoCount >= 3;

        return !isComplete ? (
          <div className="bg-linear-to-r from-[#ab3f20] to-[#8a3219] rounded-lg p-4 sm:p-6 text-white">
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 rounded-lg flex items-center justify-center shrink-0">
                <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-base sm:text-lg">
                  Hoàn thiện hồ sơ của bạn
                </h3>
                <p className="text-white/90 mt-1 text-sm sm:text-base">
                  Hồ sơ đầy đủ sẽ giúp bạn có cơ hội được tuyển dụng cao hơn
                </p>
                <a
                  href="/candidate/profile"
                  className="inline-block mt-3 px-3 sm:px-4 py-2 bg-white text-[#ab3f20] rounded-lg text-sm sm:text-base font-medium hover:bg-gray-100 transition-colors"
                >
                  Cập nhật hồ sơ
                </a>
              </div>
            </div>
          </div>
        ) : null;
      })()}
    </div>
  );
}
