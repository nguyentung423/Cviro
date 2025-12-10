import { MapPin, Calendar, Users } from "lucide-react";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import type { Job } from "@/types/agency";
import Link from "next/link";

interface JobCardProps {
  job: Job;
}

export default function JobCard({ job }: JobCardProps) {
  return (
    <div
      className={`bg-white rounded-2xl border shadow-sm hover:shadow-md transition-all p-5 ${
        !job.published ? "border-gray-300 opacity-75" : "border-gray-100"
      }`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            {job.title}
          </h3>
          {job.description && (
            <p className="text-sm text-gray-600 line-clamp-2">
              {job.description}
            </p>
          )}
        </div>
        {job.published ? (
          <span className="px-3 py-1 bg-green-50 text-green-700 text-xs font-medium rounded-full shrink-0 ml-4">
            Đang tuyển
          </span>
        ) : (
          <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full shrink-0 ml-4">
            Đã đóng
          </span>
        )}
      </div>

      {/* Job Info */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <MapPin className="w-4 h-4 text-gray-400 shrink-0" />
          <span>{job.location}</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Calendar className="w-4 h-4 text-gray-400 shrink-0" />
          <span>
            {format(new Date(job.start_time), "dd/MM/yyyy", { locale: vi })}
          </span>
        </div>
      </div>

      {/* Actions */}
      <Link
        href={`/agency/dashboard/jobs/${job.id}`}
        className="w-full px-4 py-2.5 bg-[#536b4e] text-white rounded-xl hover:bg-[#435940] transition-colors font-medium text-center text-sm flex items-center justify-center gap-2"
      >
        <Users className="w-4 h-4" />
        Xem ứng viên
      </Link>
    </div>
  );
}
