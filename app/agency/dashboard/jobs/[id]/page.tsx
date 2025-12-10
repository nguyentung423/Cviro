import { getServerSession } from "next-auth";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";

export const dynamic = "force-dynamic";
import { ArrowLeft, MapPin, Calendar, Users, Edit } from "lucide-react";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { AgencyJobService } from "@/lib/services/agencyJobService";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import ApplicationList from "./ApplicationList";
import JobStatusToggle from "./JobStatusToggle";

async function getJobData(jobId: string, email: string) {
  const { data: agency } = await supabaseAdmin
    .from("agencies")
    .select("id")
    .eq("email", email)
    .maybeSingle();

  if (!agency) return null;

  const job = await AgencyJobService.getJobById(jobId);

  // Verify job belongs to this agency
  if (!job || job.agency_id !== agency.id) {
    return null;
  }

  // Get applications for this job
  const { data: applications } = await supabaseAdmin
    .from("applications")
    .select(
      `
      *,
      candidate:candidates (
        name,
        email,
        phone,
        age,
        avatar_url
      )
    `
    )
    .eq("job_id", jobId)
    .order("created_at", { ascending: false });

  return { job, applications: applications || [] };
}

export default async function JobDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await getServerSession();

  if (!session?.user?.email) {
    redirect("/login/agency");
  }

  const { id } = await params;
  const data = await getJobData(id, session.user.email);

  if (!data) {
    notFound();
  }

  const { job, applications } = data;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Link
            href="/agency/dashboard/jobs"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-3"
          >
            <ArrowLeft className="w-4 h-4" />
            Quay lại
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">
            Chi tiết công việc
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <JobStatusToggle jobId={id} initialPublished={job.published} />
          <Link
            href={`/agency/dashboard/jobs/${id}/edit`}
            className="flex items-center gap-2 px-4 py-2.5 bg-[#536b4e] text-white rounded-xl hover:bg-[#435940] transition-colors text-sm font-medium"
          >
            <Edit className="w-4 h-4" />
            Chỉnh sửa
          </Link>
        </div>
      </div>
      {/* Job Info Card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <div className="flex items-start justify-between mb-6">
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {job.title}
            </h2>
            {job.published ? (
              <span className="inline-block px-3 py-1 bg-green-50 text-green-700 text-xs font-medium rounded-full">
                Đang tuyển
              </span>
            ) : (
              <span className="inline-block px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                Đã đóng
              </span>
            )}
          </div>
        </div>

        {/* Job Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
              <MapPin className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Địa điểm</p>
              <p className="text-sm font-medium text-gray-900">
                {job.location}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
            <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center">
              <Calendar className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Ngày đăng</p>
              <p className="text-sm font-medium text-gray-900">
                {format(new Date(job.start_time), "dd/MM/yyyy", {
                  locale: vi,
                })}
              </p>
            </div>
          </div>
        </div>

        {/* Description */}
        {job.description && (
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-2">
              Mô tả công việc
            </h3>
            <p className="text-sm text-gray-600 whitespace-pre-wrap">
              {job.description}
            </p>
          </div>
        )}
      </div>

      {/* Applications */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Users className="w-5 h-5 text-[#536b4e]" />
              Danh sách ứng viên
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              {applications.length} ứng viên đã ứng tuyển
            </p>
          </div>
        </div>

        <div className="p-6">
          <ApplicationList initialApplications={applications} />
        </div>
      </div>
    </div>
  );
}
