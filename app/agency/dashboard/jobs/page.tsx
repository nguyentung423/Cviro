import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { AgencyJobService } from "@/lib/services/agencyJobService";
import JobListClient from "./JobListClient";
import { Plus, Briefcase, ArrowLeft } from "lucide-react";

export const dynamic = "force-dynamic";

async function getJobsData(email: string) {
  const { data: agency } = await supabaseAdmin
    .from("agencies")
    .select("id")
    .eq("email", email)
    .maybeSingle();

  if (!agency) return null;

  const jobs = await AgencyJobService.getAgencyJobs(agency.id);

  return { agency, jobs };
}

export default async function AgencyJobsPage() {
  const session = await getServerSession();

  if (!session?.user?.email) {
    redirect("/login/agency");
  }

  const data = await getJobsData(session.user.email);

  if (!data) {
    redirect("/login/agency");
  }

  const { jobs } = data;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">
            <div className="flex items-center gap-3">
              <Link
                href="/agency/dashboard"
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </Link>
              <div>
                <h1 className="text-lg sm:text-xl font-bold text-[#333333]">
                  Danh sách công việc
                </h1>
                <p className="text-xs sm:text-sm text-gray-600">
                  {jobs.length} công việc
                </p>
              </div>
            </div>
            <Link
              href="/agency/dashboard/jobs/create"
              className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-[#ab3f20] text-white rounded-lg hover:bg-[#8a3219] transition-colors text-sm sm:text-base font-medium"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Tạo job mới</span>
              <span className="sm:hidden">Tạo</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        {jobs.length === 0 ? (
          <div className="bg-white rounded-xl border border-[#E0E0E0] shadow-sm p-8 sm:p-12 text-center">
            <Briefcase className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-lg sm:text-xl font-semibold text-[#333333] mb-2">
              Chưa có công việc nào
            </h2>
            <p className="text-sm sm:text-base text-gray-600 mb-6">
              Hãy tạo job đầu tiên để bắt đầu tuyển dụng ứng viên
            </p>
            <Link
              href="/agency/dashboard/jobs/create"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#ab3f20] text-white rounded-lg hover:bg-[#8a3219] transition-colors font-medium"
            >
              <Plus className="w-5 h-5" />
              Tạo job đầu tiên
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            <JobListClient jobs={jobs} />
          </div>
        )}
      </main>
    </div>
  );
}
