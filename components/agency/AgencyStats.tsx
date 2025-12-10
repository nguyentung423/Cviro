import { Briefcase, Calendar, TrendingUp, Users } from "lucide-react";
import type { AgencyStats as Stats } from "@/types/agency";

interface AgencyStatsProps {
  stats: Stats;
}

export default function AgencyStats({ stats }: AgencyStatsProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Total Jobs */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600 font-medium">Tổng công việc</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">
              {stats.totalJobs}
            </p>
            <p className="text-xs text-gray-500 mt-2">Tổng số job đã đăng</p>
          </div>
          <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
            <Briefcase className="w-6 h-6 text-blue-600" />
          </div>
        </div>
      </div>

      {/* Jobs This Week */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600 font-medium">Job tuần này</p>
            <p className="text-3xl font-bold text-[#536b4e] mt-2">
              {stats.jobsThisWeek}
            </p>
            <p className="text-xs text-gray-500 mt-2">Job đăng trong 7 ngày</p>
          </div>
          <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
            <TrendingUp className="w-6 h-6 text-green-600" />
          </div>
        </div>
      </div>

      {/* Active Jobs */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600 font-medium">Đang diễn ra</p>
            <p className="text-3xl font-bold text-[#536b4e] mt-2">
              {stats.activeJobs}
            </p>
            <p className="text-xs text-gray-500 mt-2">Sự kiện sắp tới</p>
          </div>
          <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
            <Calendar className="w-6 h-6 text-green-600" />
          </div>
        </div>
      </div>

      {/* Total Applications */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600 font-medium">Đơn ứng tuyển</p>
            <p className="text-3xl font-bold text-purple-600 mt-2">
              {stats.totalApplications}
            </p>
            <p className="text-xs text-gray-500 mt-2">Tổng ứng viên</p>
          </div>
          <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center">
            <Users className="w-6 h-6 text-purple-600" />
          </div>
        </div>
      </div>
    </div>
  );
}
