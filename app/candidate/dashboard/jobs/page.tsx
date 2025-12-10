import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { CandidateService } from "@/lib/services/candidateService";
import { JobService } from "@/lib/services/jobService";
import JobListClient from "./JobListClient";
import { Briefcase } from "lucide-react";

export const dynamic = "force-dynamic";

async function getJobsData(email: string) {
  const candidate = await CandidateService.getProfile(email);
  if (!candidate) return null;

  const [allJobs, appliedJobs] = await Promise.all([
    JobService.getAllJobs(),
    JobService.getJobsCandidateApplied(candidate.id),
  ]);

  const appliedJobIds = new Set(appliedJobs.map((j) => j.id));
  const availableJobs = allJobs.filter((job) => !appliedJobIds.has(job.id));

  return { candidate, allJobs, appliedJobs, availableJobs };
}

export default async function JobsPage() {
  const session = await getServerSession();

  if (!session?.user?.email) {
    redirect("/login/candidate");
  }

  const data = await getJobsData(session.user.email);

  if (!data) {
    redirect("/login/candidate");
  }

  const { availableJobs, appliedJobs } = data;

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
          Tìm việc làm
        </h1>
        <p className="text-sm sm:text-base text-gray-600 mt-1">
          Khám phá các cơ hội việc làm phù hợp với bạn
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {availableJobs.length}
              </p>
              <p className="text-sm text-gray-600">Việc làm có sẵn</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {appliedJobs.length}
              </p>
              <p className="text-sm text-gray-600">Đã ứng tuyển</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {availableJobs.length + appliedJobs.length}
              </p>
              <p className="text-sm text-gray-600">Tổng việc làm</p>
            </div>
          </div>
        </div>
      </div>

      {/* Available Jobs */}
      <JobListClient availableJobs={availableJobs} appliedJobs={appliedJobs} />
    </div>
  );
}
