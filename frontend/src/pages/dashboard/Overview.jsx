import {
  Briefcase,
  Users,
  Clock,
  CheckCircle2,
  TrendingUp,
  Calendar,
  MapPin,
  DollarSign,
  Activity,
  Award,
  Target,
  Zap,
  Star,
  XCircle,
  ChevronRight,
} from "lucide-react";

export default function Overview() {
  // Mock data for agency dashboard
  const stats = {
    totalJobs: 12,
    totalApplications: 47,
    pendingReview: 5,
    hiredCandidates: 18,
  };

  const recentActivities = [
    {
      id: 1,
      type: "application",
      candidate: "Nguyễn Văn A",
      job: "MC Sự kiện Khai trương",
      time: "2 giờ trước",
      status: "new",
    },
    {
      id: 2,
      type: "hired",
      candidate: "Trần Thị B",
      job: "Staff phục vụ Hội chợ",
      time: "5 giờ trước",
      status: "accepted",
    },
    {
      id: 3,
      type: "withdraw",
      candidate: "Lê Văn C",
      job: "PG Roadshow",
      time: "1 ngày trước",
      status: "withdrawn",
    },
  ];

  const topJobs = [
    { id: 1, title: "MC Sự kiện Khai trương", applications: 23, location: "Hà Nội", salary: "500K/ngày" },
    { id: 2, title: "Staff phục vụ Hội chợ", applications: 18, location: "TP.HCM", salary: "300K/ngày" },
    { id: 3, title: "PG Roadshow", applications: 15, location: "Đà Nẵng", salary: "400K/ngày" },
  ];

  const upcomingEvents = [
    { id: 1, title: "Lễ khai mạc Festival", date: "15/01/2025", time: "08:00", staffNeeded: 12 },
    { id: 2, title: "Hội thảo Khởi nghiệp", date: "20/01/2025", time: "14:00", staffNeeded: 8 },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-6 lg:p-8 text-white shadow-2xl shadow-green-500/30 border border-green-400/20">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold mb-2 flex items-center gap-2">
              Dashboard Tuyển dụng
              <span className="text-3xl lg:text-4xl">🎯</span>
            </h1>
            <p className="text-green-50 text-sm lg:text-base">Quản lý hiệu quả tuyển dụng sự kiện của bạn</p>
          </div>
          <div className="hidden sm:block">
            <div className="p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
              <Target className="w-8 h-8 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        <StatCard
          label="Tổng số Jobs"
          value={stats.totalJobs}
          color="from-blue-500 to-blue-600"
          icon={<Briefcase className="w-6 h-6" />}
          trend="+2"
        />
        <StatCard
          label="Tổng ứng viên"
          value={stats.totalApplications}
          color="from-orange-500 to-orange-600"
          icon={<Users className="w-6 h-6" />}
          trend="+12"
        />
        <StatCard
          label="Chờ duyệt"
          value={stats.pendingReview}
          color="from-amber-500 to-amber-600"
          icon={<Clock className="w-6 h-6" />}
          trend="-3"
        />
        <StatCard
          label="Đã tuyển"
          value={stats.hiredCandidates}
          color="from-emerald-500 to-emerald-600"
          icon={<CheckCircle2 className="w-6 h-6" />}
          trend="+5"
        />
      </div>

      {/* Main Content Grid - 3 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activities - 2 columns */}
        <div className="lg:col-span-2 bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-200/60 p-6 lg:p-7">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg">
                <Activity className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl lg:text-2xl font-bold text-slate-800">Hoạt động gần đây</h2>
            </div>
            <button className="text-sm text-green-600 hover:text-green-700 font-bold hover:gap-2 flex items-center gap-1 transition-all group">
              Xem tất cả
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="space-y-3">
            {recentActivities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-start justify-between p-4 lg:p-5 bg-gradient-to-br from-slate-50 to-white hover:from-white hover:to-slate-50 rounded-xl transition-all border border-slate-200/60 hover:shadow-lg hover:border-green-200 hover:scale-[1.01] group cursor-pointer"
              >
                <div className="flex-1">
                  <div className="flex items-start space-x-3">
                    {activity.status === "new" && (
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Users className="w-4 h-4 text-blue-600" />
                      </div>
                    )}
                    {activity.status === "accepted" && (
                      <div className="p-2 bg-emerald-100 rounded-lg">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      </div>
                    )}
                    {activity.status === "withdrawn" && (
                      <div className="p-2 bg-red-100 rounded-lg">
                        <XCircle className="w-4 h-4 text-red-600" />
                      </div>
                    )}
                    <div className="flex-1">
                      <p className="font-semibold text-slate-800 group-hover:text-green-600 transition-colors">
                        {activity.candidate}
                      </p>
                      <p className="text-sm text-slate-600 mt-1">
                        {activity.type === "application" && `Đã ứng tuyển vào `}
                        {activity.type === "hired" && `Đã được tuyển vào `}
                        {activity.type === "withdraw" && `Đã rút ứng tuyển khỏi `}
                        <span className="font-medium text-green-600">{activity.job}</span>
                      </p>
                      <p className="text-xs text-slate-400 mt-1 flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {activity.time}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Sidebar Widgets */}
        <div className="space-y-6">
          {/* Performance Widget */}
          <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-200/60 p-5 lg:p-6 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center space-x-3 mb-5">
              <div className="p-2.5 bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg">
                <Award className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-bold text-slate-800 text-lg">Hiệu suất</h3>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-slate-600 font-medium">Tỷ lệ tuyển dụng</span>
                <span className="font-bold text-green-600 text-lg">75%</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden shadow-inner">
                <div
                  className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full transition-all duration-500 shadow-lg relative overflow-hidden"
                  style={{ width: "75%" }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                </div>
              </div>
              <div className="pt-3 space-y-3 border-t border-slate-200/50">
                <div className="flex items-center justify-between p-3 bg-gradient-to-br from-yellow-50 to-amber-50 rounded-lg border border-yellow-200/50 hover:shadow-md transition-all">
                  <span className="text-sm text-slate-700 font-medium">Đánh giá TB</span>
                  <div className="flex items-center space-x-1.5">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-bold text-slate-800 text-lg">4.9</span>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-blue-200/50 hover:shadow-md transition-all">
                  <span className="text-sm text-slate-700 font-medium">Thời gian tuyển TB</span>
                  <span className="font-bold text-slate-800 text-lg">3.2 ngày</span>
                </div>
              </div>
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-200/60 p-5 lg:p-6 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center space-x-3 mb-5">
              <div className="p-2.5 bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg">
                <Calendar className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-bold text-slate-800 text-lg">Sự kiện sắp tới</h3>
            </div>
            <div className="space-y-3">
              {upcomingEvents.map((event) => (
                <div
                  key={event.id}
                  className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200/60 hover:shadow-lg hover:scale-[1.02] transition-all cursor-pointer group"
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
                    <Users className="w-3 h-3 mr-1" />
                    Cần {event.staffNeeded} nhân viên
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Top Jobs Section */}
      <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-200/60 p-6 lg:p-7">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg">
              <Target className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl lg:text-2xl font-bold text-slate-800">Top Jobs đang tuyển</h2>
          </div>
          <button className="text-sm text-green-600 hover:text-green-700 font-bold hover:gap-2 flex items-center gap-1 transition-all group">
            Xem tất cả
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-5">
          {topJobs.map((job) => (
            <div
              key={job.id}
              className="p-5 lg:p-6 bg-gradient-to-br from-slate-50 to-white rounded-xl border border-slate-200/60 hover:shadow-xl hover:border-green-200 hover:scale-[1.02] transition-all group cursor-pointer"
            >
              <h3 className="font-bold text-slate-800 group-hover:text-green-600 transition-colors mb-2">
                {job.title}
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    Ứng viên
                  </span>
                  <span className="font-bold text-orange-600">{job.applications}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    Địa điểm
                  </span>
                  <span className="font-semibold text-slate-700">{job.location}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 flex items-center">
                    <DollarSign className="w-4 h-4 mr-1" />
                    Lương
                  </span>
                  <span className="font-bold text-emerald-600">{job.salary}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, color, icon, trend }) {
  const isPositive = trend && trend.startsWith("+");
  const isNegative = trend && trend.startsWith("-");

  return (
    <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-lg shadow-slate-200/60 border border-slate-200/60 p-5 lg:p-6 hover:shadow-2xl hover:scale-[1.03] hover:-translate-y-1 transition-all duration-300 group">
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 bg-gradient-to-br ${color} rounded-xl shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300`}>
          <div className="text-white">{icon}</div>
        </div>
        {trend && (
          <span
            className={`text-xs font-bold px-2.5 py-1.5 rounded-lg ring-1 ${
              isPositive
                ? "text-emerald-600 bg-emerald-50 ring-emerald-200"
                : isNegative
                ? "text-red-600 bg-red-50 ring-red-200"
                : "text-slate-600 bg-slate-100 ring-slate-200"
            }`}
          >
            {trend}
          </span>
        )}
      </div>
      <p className="text-sm text-slate-500 mb-1.5 font-medium">{label}</p>
      <p className="text-3xl lg:text-4xl font-bold text-slate-800 group-hover:text-green-600 transition-colors">{value}</p>
    </div>
  );
}
