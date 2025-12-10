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
  Shield,
  AlertTriangle,
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

      {/* Report Fraud Section */}
      <div className="bg-linear-to-br from-red-50 to-orange-50 rounded-lg border-2 border-red-200 p-4 sm:p-6">
        <div className="flex items-start gap-3 sm:gap-4">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-red-100 rounded-lg flex items-center justify-center shrink-0">
            <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-red-600" />
          </div>
          <div className="flex-1">
            <div className="flex items-start gap-2">
              <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-base sm:text-lg text-red-900">
                  Phát hiện tin tuyển dụng lừa đảo?
                </h3>
                <p className="text-red-800 mt-2 text-sm sm:text-base leading-relaxed">
                  Nếu bạn nhận thấy bất kỳ <strong>dấu hiệu đáng ngờ</strong>{" "}
                  nào từ nhà tuyển dụng (yêu cầu chuyển tiền, thông tin cá nhân
                  nhạy cảm, lương cao bất thường...), vui lòng{" "}
                  <strong className="text-red-900">
                    báo ngay cho đội ngũ hỗ trợ
                  </strong>{" "}
                  của chúng tôi.
                </p>
                <div className="mt-4 flex flex-col sm:flex-row gap-3">
                  <a
                    href="https://zalo.me/0374918396"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-all shadow-md hover:shadow-lg text-sm sm:text-base"
                  >
                    <svg
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 0C5.373 0 0 4.975 0 11.111c0 3.497 1.745 6.616 4.472 8.652.096 4.432-.684 4.638-2.472 8.237 2.92-.011 5.63-1.19 7.678-3.052.768.17 1.572.263 2.322.263 6.627 0 12-4.974 12-11.111C24 4.975 18.627 0 12 0zm.219 14.863h-3.43v-1.03h1.188v-3.6h-1.188v-.975c.456 0 .913-.036 1.369-.036.456 0 .913.036 1.369.036v4.575h.692v1.03zm3.274 0h-1.095l-1.782-3.015v3.015h-1.095v-5.64h1.095l1.782 3.015v-3.015h1.095v5.64z" />
                    </svg>
                    Báo cáo qua Zalo
                  </a>
                  <a
                    href="tel:0374918396"
                    className="inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-white text-red-600 border-2 border-red-600 rounded-lg font-semibold hover:bg-red-50 transition-all text-sm sm:text-base"
                  >
                    📞 Gọi: 0374918396
                  </a>
                </div>
                <p className="text-xs sm:text-sm text-red-700 mt-3 flex items-start gap-1.5">
                  <span className="text-base">🛡️</span>
                  <span>
                    <strong>Cam kết bảo vệ:</strong> Mọi thông tin báo cáo sẽ
                    được bảo mật tuyệt đối. Chúng tôi sẽ xử lý trong vòng 24h.
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
