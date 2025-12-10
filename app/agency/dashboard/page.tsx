import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { AgencyJobService } from "@/lib/services/agencyJobService";
import AgencyStats from "@/components/agency/AgencyStats";
import JobCard from "@/components/agency/JobCard";
import { Plus, Briefcase } from "lucide-react";

export const dynamic = "force-dynamic";

async function getAgencyData(email: string) {
  const { data: agency } = await supabaseAdmin
    .from("agencies")
    .select("*")
    .eq("email", email)
    .maybeSingle();

  if (!agency) return null;

  const [stats, recentJobs] = await Promise.all([
    AgencyJobService.getAgencyStats(agency.id),
    AgencyJobService.getRecentJobs(agency.id),
  ]);

  return { agency, stats, recentJobs };
}

export default async function AgencyDashboardPage() {
  const session = await getServerSession();

  if (!session?.user?.email) {
    redirect("/login/agency");
  }

  const data = await getAgencyData(session.user.email);

  if (!data) {
    redirect("/login/agency");
  }

  const { agency, stats, recentJobs } = data;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
            Tổng quan
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Quản lý công việc và ứng viên của bạn
          </p>
        </div>
        <Link
          href="/agency/dashboard/jobs/create"
          className="flex items-center gap-2 px-4 py-2.5 bg-[#536b4e] text-white rounded-xl hover:bg-[#435940] transition-colors text-sm font-medium shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">Đăng job mới</span>
          <span className="sm:hidden">Đăng job</span>
        </Link>
      </div>

      {/* Stats */}
      <AgencyStats stats={stats} />

      {/* Recent Jobs */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
        <div className="p-5 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h3 className="text-base font-semibold text-gray-900">
              Công việc gần đây
            </h3>
            <p className="text-sm text-gray-500 mt-0.5">5 job mới nhất</p>
          </div>
          <Link
            href="/agency/dashboard/jobs"
            className="text-sm text-[#536b4e] hover:text-[#435940] font-medium"
          >
            Xem tất cả →
          </Link>
        </div>

        <div className="p-5">
          {recentJobs.length === 0 ? (
            <div className="text-center py-12">
              <Briefcase className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-sm text-gray-600 mb-2">
                Chưa có công việc nào
              </p>
              <p className="text-sm text-gray-500 mb-4">
                Hãy tạo job đầu tiên để bắt đầu tuyển dụng
              </p>
              <Link
                href="/agency/dashboard/jobs/create"
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#536b4e] text-white rounded-xl hover:bg-[#435940] transition-colors text-sm font-medium"
              >
                <Plus className="w-4 h-4" />
                Tạo job đầu tiên
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {recentJobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
