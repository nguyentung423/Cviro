"use client";

import {
  MapPin,
  Calendar,
  DollarSign,
  ChevronRight,
  Briefcase,
  Check,
  X,
  Clock,
} from "lucide-react";
import type { Job, JobWithApplication } from "@/types/candidate";
import { format } from "date-fns";
import { vi } from "date-fns/locale";

interface JobListProps {
  jobs: (Job | JobWithApplication)[];
  onJobClick?: (job: Job) => void;
  onApply?: (jobId: string) => void;
  appliedJobIds?: string[];
  loading?: boolean;
}

export default function JobList({
  jobs,
  onJobClick,
  onApply,
  appliedJobIds = [],
  loading = false,
}: JobListProps) {
  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-lg border border-gray-200 p-6 animate-pulse"
          >
            <div className="h-6 bg-gray-200 rounded w-2/3 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/3"></div>
          </div>
        ))}
      </div>
    );
  }

  if (jobs.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
        <Briefcase className="w-12 h-12 text-gray-300 mx-auto mb-4" />
        <p className="text-gray-500">Chưa có việc làm nào</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {jobs.map((job) => {
        const isApplied = appliedJobIds.includes(job.id);
        const agencyName =
          job.agency?.agency_name || job.agency?.name || "Nhà tuyển dụng";

        return (
          <div
            key={job.id}
            className="bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
          >
            <div className="p-4 sm:p-6">
              <div className="flex items-start justify-between mb-3 sm:mb-4">
                <div className="flex-1 min-w-0">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1">
                    {job.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600">
                    {agencyName}
                  </p>
                </div>
                {isApplied && "application" in job && job.application && (
                  <div className="shrink-0 ml-2 sm:ml-4">
                    {job.application.status === "approved" && (
                      <span className="flex items-center gap-1 px-2 sm:px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                        <Check className="w-3 h-3" />
                        Đã duyệt
                      </span>
                    )}
                    {job.application.status === "rejected" && (
                      <span className="flex items-center gap-1 px-2 sm:px-3 py-1 bg-red-100 text-red-700 text-xs font-medium rounded-full">
                        <X className="w-3 h-3" />
                        Bị từ chối
                      </span>
                    )}
                    {job.application.status === "pending" && (
                      <span className="flex items-center gap-1 px-2 sm:px-3 py-1 bg-yellow-100 text-yellow-700 text-xs font-medium rounded-full">
                        <Clock className="w-3 h-3" />
                        Đang chờ
                      </span>
                    )}
                  </div>
                )}
                {isApplied && !("application" in job) && (
                  <span className="px-2 sm:px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full shrink-0 ml-2 sm:ml-4">
                    Đã ứng tuyển
                  </span>
                )}
              </div>

              {/* Job Info */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 mb-3 sm:mb-4">
                {job.location && (
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                    <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400 shrink-0" />
                    <span>{job.location}</span>
                  </div>
                )}
                {job.pay && (
                  <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-[#ab3f20]">
                    <DollarSign className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                    <span>{job.pay}</span>
                  </div>
                )}
                {job.start_time && (
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                    <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400 shrink-0" />
                    <span>
                      {format(new Date(job.start_time), "dd/MM/yyyy", {
                        locale: vi,
                      })}
                    </span>
                  </div>
                )}
              </div>

              {/* Description */}
              {job.description && (
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {job.description}
                </p>
              )}

              {/* Contact for approved applications */}
              {"application" in job &&
                job.application?.status === "approved" &&
                job.agency?.phone && (
                  <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-sm font-medium text-green-800 mb-2">
                      ✅ Đơn của bạn đã được duyệt!
                    </p>
                    <a
                      href={`https://zalo.me/${job.agency.phone.replace(
                        /^0/,
                        "84"
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-[#0068FF] text-white rounded-lg hover:bg-[#0052CC] transition-colors text-sm font-medium"
                    >
                      <svg
                        className="w-4 h-4"
                        viewBox="0 0 48 48"
                        fill="currentColor"
                      >
                        <path d="M24 4C12.95 4 4 11.93 4 21.75c0 6.09 3.82 11.47 9.56 14.55.23.12.39.34.43.59l.38 2.42c.05.34.25.42.53.26l3.03-1.63c.18-.1.4-.12.6-.07 1.42.36 2.93.55 4.47.55 11.05 0 20-7.93 20-17.75S35.05 4 24 4z" />
                      </svg>
                      Liên hệ qua Zalo
                    </a>
                  </div>
                )}

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                {onJobClick && (
                  <button
                    onClick={() => onJobClick(job)}
                    className="flex-1 px-3 sm:px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 text-sm sm:text-base"
                  >
                    Xem chi tiết
                    <ChevronRight className="w-4 h-4" />
                  </button>
                )}
                {!isApplied && onApply && (
                  <button
                    onClick={() => onApply(job.id)}
                    className="flex-1 px-3 sm:px-4 py-2 bg-[#ab3f20] text-white rounded-lg hover:bg-[#8b2f15] transition-colors font-medium text-sm sm:text-base"
                  >
                    Ứng tuyển ngay
                  </button>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
