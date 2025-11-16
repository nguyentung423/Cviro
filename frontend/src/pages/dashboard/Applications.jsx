import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { AlertCircle, Users } from "lucide-react";
import { mockAgencyApplications } from "../../data/mockData";

export default function Applications() {
  const { agencyId } = useOutletContext() || { agencyId: "demo-agency" };
  const [applications, setApplications] = useState(mockAgencyApplications);

  const handleStatusChange = (id, newStatus) => {
    setApplications((prev) => prev.map((app) => (app.id === id ? { ...app, status: newStatus } : app)));
  };

  if (applications.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border p-8 text-center">
        <Users className="w-10 h-10 text-slate-400 mx-auto mb-4" />
        <p className="text-slate-600">Chưa có ứng viên trong bản demo.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold mb-4">Quản lý ứng viên</h1>
        <span className="text-xs text-slate-500">
          Agency ID: <strong>{agencyId}</strong>
        </span>
      </div>
      <ul className="space-y-3">
        {applications.map((app) => (
          <li
            key={app.id}
            className="bg-white rounded-xl shadow-sm border p-4 flex justify-between items-center flex-wrap gap-4"
          >
            <div>
              <p className="font-semibold">{app.candidateName}</p>
              <p className="text-sm text-slate-600">Job: {app.jobTitle}</p>
              <p className="text-xs text-slate-500">{new Date(app.createdAt).toLocaleDateString("vi-VN")}</p>
              <p className="text-xs text-slate-500 italic">
                {app.status === "pending"
                  ? "Đang xem xét"
                  : app.status === "accepted"
                  ? "Đã chấp nhận"
                  : app.status === "rejected"
                  ? "Đã từ chối"
                  : app.status}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleStatusChange(app.id, "accepted")}
                className="px-3 py-1 text-sm bg-emerald-600 text-white rounded-lg"
              >
                Chấp nhận
              </button>
              <button
                onClick={() => handleStatusChange(app.id, "rejected")}
                className="px-3 py-1 text-sm bg-red-600 text-white rounded-lg"
              >
                Từ chối
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="flex items-center gap-2 text-xs text-slate-500">
        <AlertCircle className="w-4 h-4" />
        Dữ liệu mô phỏng – không có máy chủ phía sau.
      </div>
    </div>
  );
}
