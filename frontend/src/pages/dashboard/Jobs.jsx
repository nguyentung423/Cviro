import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Plus,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  Calendar,
  Users,
  MapPin,
  Clock,
  DollarSign,
  MoreVertical,
  TrendingUp,
  AlertCircle,
  Star,
} from "lucide-react";
import { mockAgencyJobs } from "../../data/mockData";

const statusColors = {
  "Đang tuyển": "bg-emerald-100 text-emerald-700 border-emerald-200",
  "Chờ duyệt": "bg-amber-100 text-amber-700 border-amber-200",
  "Đã đăng": "bg-blue-100 text-blue-700 border-blue-200",
};

const urgencyColors = {
  high: "border-l-red-500 bg-red-50/30",
  medium: "border-l-amber-500 bg-amber-50/30",
  low: "border-l-green-500 bg-green-50/30",
};

export default function Jobs() {
  const [jobs, setJobs] = useState(mockAgencyJobs);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("Tất cả");
  const [showFilters, setShowFilters] = useState(false);
  const navigate = useNavigate();

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company_name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "Tất cả" || job.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleDeleteJob = (jobId) => {
    if (window.confirm("Bạn chắc chắn muốn xóa job này khỏi danh sách demo?")) {
      setJobs((prev) => prev.filter((job) => job.id !== jobId));
    }
  };

  const statsData = {
    total: jobs.length,
    active: jobs.filter((job) => job.status === "Đang tuyển").length,
    pending: jobs.filter((job) => job.status === "Chờ duyệt").length,
    totalApplicants: jobs.reduce((sum, job) => sum + (job.applicants || 0), 0),
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Quản lý Công việc Sự kiện</h1>
          <p className="text-slate-600">
            Dữ liệu mô phỏng để trình diễn giao diện dashboard tuyển dụng cho agency.
          </p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Tổng jobs" value={statsData.total} color="text-slate-800" icon={<Users className="w-5 h-5 text-green-700" />} />
          <StatCard label="Đang tuyển" value={statsData.active} color="text-emerald-600" icon={<TrendingUp className="w-5 h-5 text-emerald-700" />} />
          <StatCard label="Chờ duyệt" value={statsData.pending} color="text-amber-600" icon={<AlertCircle className="w-5 h-5 text-amber-700" />} />
          <StatCard label="Ứng viên" value={statsData.totalApplicants} color="text-blue-600" icon={<Users className="w-5 h-5 text-blue-700" />} />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-3 flex-1 max-w-2xl">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Tìm kiếm job, công ty..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-3 w-full bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-colors"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500"
              >
                <option value="Tất cả">Tất cả trạng thái</option>
                <option value="Đang tuyển">Đang tuyển</option>
                <option value="Chờ duyệt">Chờ duyệt</option>
                <option value="Đã đăng">Đã đăng</option>
              </select>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm hover:bg-slate-100 transition-colors"
              >
                <Filter className="w-4 h-4" />
              </button>
            </div>
          </div>

          <Link
            to="/agency/jobs/new"
            className="bg-gradient-to-r from-green-800 to-green-700 hover:from-green-900 hover:to-green-800 text-white font-semibold px-6 py-3 rounded-xl shadow-lg shadow-green-800/25 transition-all duration-200 flex items-center gap-2 hover:scale-105"
          >
            <Plus className="w-5 h-5" />
            Đăng job mới
          </Link>
        </div>

        {showFilters && (
          <p className="text-xs text-slate-500 mt-3">
            Chế độ lọc nâng cao đang được mô phỏng. Bạn có thể mở rộng tính năng này khi kết nối backend thực tế.
          </p>
        )}
      </div>

      {jobs.length === 0 && (
        <EmptyState
          title="Chưa có job nào"
          subtitle="Hãy đăng job mới để bắt đầu tuyển dụng."
          actionLabel="Đăng job mới"
          onAction={() => navigate("/agency/jobs/new")}
        />
      )}

      {jobs.length > 0 && filteredJobs.length === 0 && (
        <EmptyState
          title="Không tìm thấy job phù hợp"
          subtitle="Thử xoá bộ lọc hoặc thay đổi từ khoá tìm kiếm."
          actionLabel="Xoá bộ lọc"
          onAction={() => {
            setSearchTerm("");
            setStatusFilter("Tất cả");
          }}
        />
      )}

      {filteredJobs.length > 0 && (
        <div className="grid gap-6">
          {filteredJobs.map((job) => (
            <div
              key={job.id}
              className={`bg-white rounded-xl shadow-sm border-l-4 border border-slate-200 p-6 hover:shadow-md transition-shadow duration-200 ${
                urgencyColors[job.urgency] || urgencyColors.low
              }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex-1 space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-xl font-bold text-slate-800">{job.title}</h3>
                        {job.featured && <Star className="w-5 h-5 text-amber-500 fill-amber-500" />}
                      </div>
                      <p className="text-slate-600 font-medium">{job.company_name}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium border ${statusColors[job.status] || "bg-slate-100 text-slate-600 border-slate-200"}`}>
                      {job.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                    <InfoRow icon={<MapPin className="w-4 h-4" />} text={job.location} />
                    <InfoRow icon={<DollarSign className="w-4 h-4" />} text={job.salary} />
                    <InfoRow icon={<Clock className="w-4 h-4" />} text={`Hạn: ${job.deadline}`} />
                    <InfoRow icon={<Calendar className="w-4 h-4" />} text={job.created_at.split("T")[0]} />
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {job.requirements?.slice(0, 3).map((req) => (
                      <span key={req} className="px-3 py-1 bg-slate-100 text-slate-700 rounded-lg text-xs">
                        {req}
                      </span>
                    ))}
                    {job.requirements?.length > 3 && (
                      <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-lg text-xs">
                        +{job.requirements.length - 3} khác
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex lg:flex-col items-center lg:items-end gap-4">
                  <div className="text-center lg:text-right space-y-1">
                    <div className="text-2xl font-bold text-slate-800">{job.applicants || 0}</div>
                    <div className="text-xs text-slate-500">Ứng viên</div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => navigate(`/agency/jobs/${job.id}`)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors group"
                    >
                      <Eye className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    </button>
                    <Link
                      to={`/agency/jobs/edit/${job.id}`}
                      className="p-2 text-amber-600 hover:bg-amber-50 rounded-lg transition-colors group"
                    >
                      <Edit className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    </Link>
                    <button
                      onClick={() => handleDeleteJob(job.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors group"
                    >
                      <Trash2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    </button>
                    <button className="p-2 text-slate-600 hover:bg-slate-50 rounded-lg transition-colors">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function StatCard({ label, value, color, icon }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-600">{label}</p>
          <p className={`text-2xl font-bold ${color}`}>{value}</p>
        </div>
        <div className="p-3 bg-slate-100 rounded-lg">{icon}</div>
      </div>
    </div>
  );
}

function InfoRow({ icon, text }) {
  return (
    <div className="flex items-center gap-2 text-slate-600">
      {icon}
      <span>{text}</span>
    </div>
  );
}

function EmptyState({ title, subtitle, actionLabel, onAction }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12 text-center">
      <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <Search className="w-8 h-8 text-slate-400" />
      </div>
      <h3 className="text-lg font-semibold text-slate-800 mb-2">{title}</h3>
      <p className="text-slate-600 mb-4">{subtitle}</p>
      <button onClick={onAction} className="text-green-700 hover:text-green-800 font-medium">
        {actionLabel}
      </button>
    </div>
  );
}
