"use client";

import { FileText, Clock, CheckCircle, XCircle } from "lucide-react";
import type { Application } from "@/types/candidate";
import { format } from "date-fns";
import { vi } from "date-fns/locale";

interface ApplicationStatusCardProps {
  applications: Application[];
  loading?: boolean;
}

const statusConfig = {
  pending: {
    label: "Đang chờ",
    icon: Clock,
    bgColor: "bg-yellow-100",
    textColor: "text-yellow-700",
    iconColor: "text-yellow-600",
  },
  approved: {
    label: "Đã duyệt",
    icon: CheckCircle,
    bgColor: "bg-green-100",
    textColor: "text-green-700",
    iconColor: "text-green-600",
  },
  rejected: {
    label: "Từ chối",
    icon: XCircle,
    bgColor: "bg-red-100",
    textColor: "text-red-700",
    iconColor: "text-red-600",
  },
  withdrawn: {
    label: "Đã rút",
    icon: XCircle,
    bgColor: "bg-gray-100",
    textColor: "text-gray-700",
    iconColor: "text-gray-600",
  },
};

export default function ApplicationStatusCard({
  applications,
  loading = false,
}: ApplicationStatusCardProps) {
  if (loading) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="h-6 bg-gray-200 rounded w-1/3 mb-4 animate-pulse"></div>
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="h-16 bg-gray-100 rounded animate-pulse"
            ></div>
          ))}
        </div>
      </div>
    );
  }

  if (applications.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
        <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
        <p className="text-gray-500">Chưa có đơn ứng tuyển nào</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Đơn ứng tuyển gần đây
      </h3>

      <div className="space-y-3">
        {applications.map((application) => {
          const config = statusConfig[application.status];
          const StatusIcon = config.icon;
          const jobTitle = application.job?.title || "N/A";
          const agencyName =
            application.job?.agency?.agency_name ||
            application.job?.agency?.name ||
            "Nhà tuyển dụng";

          return (
            <div
              key={application.id}
              className="p-3 sm:p-4 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow"
            >
              <div className="flex items-start justify-between gap-2 sm:gap-4">
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm sm:text-base font-medium text-gray-900 mb-1 truncate">
                    {jobTitle}
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-600 mb-1 sm:mb-2">
                    {agencyName}
                  </p>
                  <p className="text-xs text-gray-500">
                    Ứng tuyển:{" "}
                    {format(new Date(application.created_at), "dd/MM/yyyy", {
                      locale: vi,
                    })}
                  </p>
                  {application.status === "approved" &&
                    application.job?.agency?.phone && (
                      <a
                        href={`https://zalo.me/${
                          application.job.agency.phone.startsWith("0")
                            ? "84" + application.job.agency.phone.substring(1)
                            : application.job.agency.phone
                        }`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 font-medium mt-2"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (
                            !confirm(
                              `Bạn sẽ được chuyển đến Zalo để liên hệ với ${agencyName}. Tiếp tục?`
                            )
                          ) {
                            e.preventDefault();
                          }
                        }}
                      >
                        💬 Liên hệ người tuyển dụng
                      </a>
                    )}
                </div>

                <div className="shrink-0">
                  <span
                    className={`inline-flex items-center gap-1 px-2 sm:px-3 py-1 rounded-full text-xs font-medium ${config.bgColor} ${config.textColor}`}
                  >
                    <StatusIcon className={`w-3 h-3 ${config.iconColor}`} />
                    {config.label}
                  </span>
                </div>
              </div>

              {application.note && (
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <p className="text-xs text-gray-600">
                    <span className="font-medium">Ghi chú:</span>{" "}
                    {application.note}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
