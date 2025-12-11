"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Users, Check, X } from "lucide-react";
import { format } from "date-fns";
import { vi } from "date-fns/locale";

interface Application {
  id: string;
  job_id: string;
  candidate_id: string;
  status: string;
  created_at: string;
  candidate: {
    name: string;
    email: string;
    phone?: string;
    age?: number;
    avatar_url?: string;
  };
}

interface ApplicationListProps {
  initialApplications: Application[];
}

export default function ApplicationList({
  initialApplications,
}: ApplicationListProps) {
  const [applications, setApplications] = useState(initialApplications);
  const [updating, setUpdating] = useState<string | null>(null);

  const handleUpdateStatus = async (
    applicationId: string,
    newStatus: "approved" | "rejected"
  ) => {
    setUpdating(applicationId);
    try {
      const res = await fetch(`/api/agency/applications/${applicationId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        setApplications((prev) =>
          prev.map((app) =>
            app.id === applicationId ? { ...app, status: newStatus } : app
          )
        );
      } else {
        alert("Có lỗi xảy ra, vui lòng thử lại");
      }
    } catch (error) {
      console.error("Update status error:", error);
      alert("Có lỗi xảy ra, vui lòng thử lại");
    } finally {
      setUpdating(null);
    }
  };

  if (applications.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Users className="w-8 h-8 text-gray-400" />
        </div>
        <p className="text-gray-600 font-medium">
          Chưa có ứng viên nào ứng tuyển
        </p>
        <p className="text-sm text-gray-500 mt-1">
          Ứng viên sẽ xuất hiện ở đây sau khi họ ứng tuyển
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {applications.map((app) => (
        <div
          key={app.id}
          className="p-4 border border-gray-100 rounded-xl hover:shadow-md transition-all"
        >
          <div className="flex items-start gap-4">
            <Link
              href={`/agency/dashboard/candidates/${app.candidate_id}`}
              className="w-14 h-14 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center shrink-0 hover:opacity-80 transition-opacity"
            >
              {app.candidate?.avatar_url ? (
                <Image
                  src={app.candidate.avatar_url}
                  alt={app.candidate.name || "Ứng viên"}
                  width={56}
                  height={56}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-lg font-medium text-gray-600">
                  {app.candidate?.name?.charAt(0)?.toUpperCase() || "U"}
                </span>
              )}
            </Link>

            <div className="flex-1 min-w-0">
              <Link
                href={`/agency/dashboard/candidates/${app.candidate_id}`}
                className="hover:underline"
              >
                <h4 className="text-base font-semibold text-gray-900">
                  {app.candidate?.name || "Ứng viên"}
                </h4>
              </Link>
              <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-gray-600">
                {app.candidate?.age && (
                  <span>{app.candidate.age} tuổi</span>
                )}
                {app.candidate?.phone && (
                  <span>{app.candidate.phone}</span>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Ứng tuyển lúc{" "}
                {format(new Date(app.created_at), "HH:mm dd/MM/yyyy", {
                  locale: vi,
                })}
              </p>
            </div>

            <div className="flex flex-col gap-2 shrink-0">
              <span
                className={`px-3 py-1.5 rounded-lg text-xs font-medium text-center ${
                  app.status === "approved"
                    ? "bg-green-50 text-green-700"
                    : app.status === "rejected"
                    ? "bg-red-50 text-red-700"
                    : "bg-yellow-50 text-yellow-700"
                }`}
              >
                {app.status === "approved"
                  ? "✓ Đã duyệt"
                  : app.status === "rejected"
                  ? "✗ Từ chối"
                  : "⏳ Chờ duyệt"}
              </span>

              {app.status === "pending" && (
                <div className="flex gap-2">
                  <button
                    onClick={() => handleUpdateStatus(app.id, "approved")}
                    disabled={updating === app.id}
                    className="p-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors disabled:opacity-50"
                    title="Duyệt"
                  >
                    <Check className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleUpdateStatus(app.id, "rejected")}
                    disabled={updating === app.id}
                    className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors disabled:opacity-50"
                    title="Từ chối"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
