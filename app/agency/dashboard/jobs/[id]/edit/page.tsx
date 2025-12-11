import { getServerSession } from "next-auth";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import JobForm from "@/components/agency/JobForm";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { AgencyJobService } from "@/lib/services/agencyJobService";

export const dynamic = "force-dynamic";

async function getJobForEdit(jobId: string, email: string) {
  // Get agency
  const { data: agency } = await supabaseAdmin
    .from("agencies")
    .select("id")
    .eq("email", email)
    .maybeSingle();

  if (!agency) return null;

  // Get job
  const job = await AgencyJobService.getJobById(jobId);

  // Verify job belongs to this agency
  if (!job || job.agency_id !== agency.id) {
    return null;
  }

  return job;
}

export default async function EditJobPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await getServerSession();

  if (!session?.user?.email) {
    redirect("/login/agency");
  }

  const { id } = await params;
  const job = await getJobForEdit(id, session.user.email);

  if (!job) {
    notFound();
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-2">
      <div className="mb-6">
        <Link
          href={`/agency/dashboard/jobs/${id}`}
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Quay lại
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">
          Chỉnh sửa công việc
        </h1>
        <p className="text-sm text-gray-600 mt-1">
          Cập nhật thông tin công việc
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <JobForm
          jobId={id}
          initialData={{
            title: job.title || "",
            description: job.description || "",
            location: job.location || "",
            salary: job.salary || "",
            date: job.date || "",
          }}
        />
      </div>
    </div>
  );
}
