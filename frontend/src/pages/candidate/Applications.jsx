import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { AlertCircle, Users } from "lucide-react";
import { mockCandidateApplications } from "../../data/mockData";

const statusColors = {
  pending: "text-amber-600 bg-amber-100",
  accepted: "text-emerald-600 bg-emerald-100",
  rejected: "text-red-600 bg-red-100",
};

export default function CandidateApplications() {
  const outletContext = useOutletContext() || {};
  const candidateId = outletContext.candidateId ?? "demo-user";
  const [applications] = useState(mockCandidateApplications);

  if (applications.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border p-8 text-center">
        <Users className="w-10 h-10 text-slate-400 mx-auto mb-4" />
        <p className="text-slate-600">Bạn chưa ứng tuyển công việc nào trong bản demo.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Đơn ứng tuyển của tôi</h1>
        <span className="text-xs text-slate-500">
          Candidate ID: <strong>{candidateId}</strong>
        </span>
      </div>
      <ul className="space-y-3">
        {applications.map((app) => (
          <li
            key={app.id}
            className="bg-white rounded-xl shadow-sm border p-4 flex justify-between items-center"
          >
            <div>
              <p className="font-semibold text-slate-800">{app.jobTitle}</p>
              <p className="text-xs text-slate-500">
                Ngày nộp: {new Date(app.createdAt).toLocaleDateString("vi-VN")}
              </p>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                statusColors[app.status] || "bg-slate-100 text-slate-600"
              }`}
            >
              {app.status === "pending"
                ? "Đang xem xét"
                : app.status === "accepted"
                ? "Đã chấp nhận"
                : app.status === "rejected"
                ? "Bị từ chối"
                : app.status}
            </span>
          </li>
        ))}
      </ul>
      <div className="flex items-center gap-2 text-xs text-slate-500">
        <AlertCircle className="w-4 h-4" />
        Đây là dữ liệu mô phỏng, không có kết nối với máy chủ.
      </div>
    </div>
  );
}
