import { mockCandidateStats } from "../../data/mockData";
import {
  Briefcase,
  FileText,
  CheckCircle2,
  XCircle,
  TrendingUp,
  Calendar,
  Clock,
  MapPin,
  Star,
  DollarSign,
  Activity,
  Award,
  Sparkles,
  ChevronRight,
} from "lucide-react";

export default function CandidateOverview() {
  const stats = mockCandidateStats;

  // Mock data for charts and activities
  const recentApplications = [
    { id: 1, title: "MC Sự kiện Khai trương", company: "EventPro VN", status: "pending", date: "2 giờ trước", location: "Hà Nội" },
    { id: 2, title: "Staff phục vụ Hội chợ", company: "MICE Solutions", status: "accepted", date: "1 ngày trước", location: "TP.HCM" },
    { id: 3, title: "Usher sự kiện Hội nghị", company: "Mega Events", status: "under_review", date: "3 ngày trước", location: "Đà Nẵng" },
  ];

  const upcomingEvents = [
    { id: 1, title: "Lễ khai mạc Festival", date: "15/01/2025", time: "08:00", location: "TPHCM" },
    { id: 2, title: "Hội thảo Khởi nghiệp", date: "20/01/2025", time: "14:00", location: "Hà Nội" },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-6 lg:p-8 text-white shadow-2xl shadow-orange-500/30 border border-orange-400/20">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold mb-2 flex items-center gap-2">
              Chào mừng trở lại!
              <span className="text-3xl lg:text-4xl">👋</span>
            </h1>
            <p className="text-orange-50 text-sm lg:text-base">Sẵn sàng cho những cơ hội sự kiện mới nhất</p>
          </div>
          <div className="hidden sm:block">
            <div className="p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        <StatCard
          label="Tổng số đơn"
          value={stats.totalApplications}
          color="from-blue-500 to-blue-600"
          icon={<FileText className="w-6 h-6" />}
          trend="+12%"
        />
        <StatCard
          label="Đang xem xét"
          value={stats.underReview}
          color="from-amber-500 to-amber-600"
          icon={<Clock className="w-6 h-6" />}
          trend="+5"
        />
        <StatCard
          label="Đã chấp nhận"
          value={stats.accepted}
          color="from-emerald-500 to-emerald-600"
          icon={<CheckCircle2 className="w-6 h-6" />}
          trend="+8%"
        />
        <StatCard
          label="Tỷ lệ thành công"
          value={`${Math.round((stats.accepted / stats.totalApplications) * 100)}%`}
          color="from-orange-500 to-orange-600"
          icon={<TrendingUp className="w-6 h-6" />}
          trend="+3%"
        />
      </div>

      {/* Main Content Grid - 2 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Applications - Takes 2 columns */}
        <div className="lg:col-span-2 bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-200/60 p-6 lg:p-7">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl shadow-lg">
                <Activity className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl lg:text-2xl font-bold text-slate-800">Hoạt động gần đây</h2>
            </div>
            <button className="text-sm text-orange-600 hover:text-orange-700 font-bold hover:gap-2 flex items-center gap-1 transition-all group">
              Xem tất cả
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="space-y-3">
            {recentApplications.map((app) => (
              <div
                key={app.id}
                className="flex items-start justify-between p-4 lg:p-5 bg-gradient-to-br from-slate-50 to-white hover:from-white hover:to-slate-50 rounded-xl transition-all border border-slate-200/60 hover:shadow-lg hover:border-orange-200 hover:scale-[1.01] group cursor-pointer"
              >
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-800 group-hover:text-orange-600 transition-colors">
                    {app.title}
                  </h3>
                  <p className="text-sm text-slate-500 mt-1">{app.company}</p>
                  <div className="flex items-center space-x-4 mt-2 text-xs text-slate-400">
                    <span className="flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {app.date}
                    </span>
                    <span className="flex items-center">
                      <MapPin className="w-3 h-3 mr-1" />
                      {app.location}
                    </span>
                  </div>
                </div>
                <div>
                  {app.status === "accepted" && (
                    <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-semibold rounded-full">
                      Đã nhận
                    </span>
                  )}
                  {app.status === "pending" && (
                    <span className="px-3 py-1 bg-amber-100 text-amber-700 text-xs font-semibold rounded-full">
                      Chờ xử lý
                    </span>
                  )}
                  {app.status === "under_review" && (
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
                      Đang xem
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Sidebar Widgets - Takes 1 column */}
        <div className="space-y-6">
          {/* Profile Completion */}
          <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-200/60 p-5 lg:p-6 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center space-x-3 mb-5">
              <div className="p-2.5 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl shadow-lg">
                <Award className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-bold text-slate-800 text-lg">Hoàn thiện hồ sơ</h3>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-slate-600 font-medium">Tiến độ</span>
                <span className="font-bold text-orange-600 text-lg">75%</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden shadow-inner">
                <div
                  className="bg-gradient-to-r from-orange-500 to-orange-600 h-3 rounded-full transition-all duration-500 shadow-lg relative overflow-hidden"
                  style={{ width: "75%" }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                </div>
              </div>
              <p className="text-xs text-slate-500 mt-3 bg-orange-50 p-3 rounded-lg border border-orange-100">
                🌟 Hoàn thiện hồ sơ để tăng cơ hội được tuyển dụng
              </p>
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-200/60 p-5 lg:p-6 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center space-x-3 mb-5">
              <div className="p-2.5 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl shadow-lg">
                <Calendar className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-bold text-slate-800 text-lg">Sự kiện sắp tới</h3>
            </div>
            <div className="space-y-3">
              {upcomingEvents.map((event) => (
                <div
                  key={event.id}
                  className="p-4 bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl border border-orange-200/60 hover:shadow-lg hover:scale-[1.02] transition-all cursor-pointer group"
                >
                  <p className="font-semibold text-slate-800 text-sm">{event.title}</p>
                  <div className="flex items-center justify-between mt-2 text-xs text-slate-500">
                    <span className="flex items-center">
                      <Calendar className="w-3 h-3 mr-1" />
                      {event.date}
                    </span>
                    <span className="flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {event.time}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1 flex items-center">
                    <MapPin className="w-3 h-3 mr-1" />
                    {event.location}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-200/60 p-5 lg:p-6 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center space-x-3 mb-5">
              <div className="p-2.5 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl shadow-lg">
                <Star className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-bold text-slate-800 text-lg">Thống kê nhanh</h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gradient-to-br from-yellow-50 to-amber-50 rounded-lg border border-yellow-200/50 hover:shadow-md transition-all">
                <span className="text-sm text-slate-700 font-medium">Đánh giá TB</span>
                <div className="flex items-center space-x-1.5">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-bold text-slate-800 text-lg">4.8</span>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-blue-200/50 hover:shadow-md transition-all">
                <span className="text-sm text-slate-700 font-medium">Tổng sự kiện</span>
                <span className="font-bold text-slate-800 text-lg">24</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gradient-to-br from-emerald-50 to-green-50 rounded-lg border border-emerald-200/50 hover:shadow-md transition-all">
                <span className="text-sm text-slate-700 font-medium">Thu nhập tháng</span>
                <span className="font-bold text-emerald-600 text-lg">12.5M VNĐ</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, color, icon, trend }) {
  return (
    <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-lg shadow-slate-200/60 border border-slate-200/60 p-5 lg:p-6 hover:shadow-2xl hover:scale-[1.03] hover:-translate-y-1 transition-all duration-300 group">
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 bg-gradient-to-br ${color} rounded-xl shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300`}>
          <div className="text-white">{icon}</div>
        </div>
        {trend && (
          <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1.5 rounded-lg ring-1 ring-emerald-200">
            {trend}
          </span>
        )}
      </div>
      <p className="text-sm text-slate-500 mb-1.5 font-medium">{label}</p>
      <p className="text-3xl lg:text-4xl font-bold text-slate-800 group-hover:text-orange-600 transition-colors">{value}</p>
    </div>
  );
}
