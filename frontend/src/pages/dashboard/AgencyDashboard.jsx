import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Briefcase,
  Users,
  Building2,
  Settings,
  LogOut,
  Bell,
  Search,
  Calendar,
  User,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState, useEffect } from "react";
import {
  mockAgencyApplications,
  mockAgencyJobs,
  mockAgencyNotifications,
  mockAgencyProfile,
} from "../../data/mockData";

const navItems = [
  { name: "Tổng quan", path: "/agency", icon: LayoutDashboard },
  { name: "Quản lý Jobs", path: "/agency/jobs", icon: Briefcase },
  { name: "Ứng viên", path: "/agency/applications", icon: Users },
  { name: "Hồ sơ công ty", path: "/agency/profile", icon: Building2 },
  { name: "Cài đặt", path: "/agency/settings", icon: Settings },
];

export default function AgencyDashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(location.pathname);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  
  const jobsCount = mockAgencyJobs.length;
  const applicationsCount = mockAgencyApplications.length;
  const notifications = mockAgencyNotifications;
  const agencyId = mockAgencyProfile.id;

  useEffect(() => {
    setActiveTab(location.pathname);
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login-agency");
  };

  const handleNavClick = (path) => {
    navigate(path);
    setSidebarOpen(false);
  };

  const getCurrentPageName = () => {
    const current = navItems.find((item) => item.path === activeTab);
    return current ? current.name : "Dashboard";
  };

  return (
    <div className="relative flex h-screen overflow-hidden bg-gradient-to-br from-green-50 via-emerald-50 to-slate-100">
      {/* Animated Background Orbs - Green Theme */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-20 -left-20 w-96 h-96 bg-gradient-to-br from-green-200/30 to-emerald-300/30 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-tr from-emerald-200/20 to-green-300/20 rounded-full blur-3xl animate-pulse-slow-delayed" />
        <div className="absolute top-1/2 left-1/3 w-72 h-72 bg-gradient-to-bl from-green-100/40 to-emerald-100/30 rounded-full blur-3xl animate-pulse-slow" />
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Glassmorphism Sidebar - Green Theme */}
      <aside
        className={`fixed lg:relative inset-y-0 left-0 z-50 transition-all duration-300 ${
          sidebarExpanded ? "w-72" : "w-20"
        } bg-white/80 backdrop-blur-xl shadow-2xl shadow-green-500/5 flex flex-col overflow-hidden ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Close Button Mobile */}
        <button
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden absolute top-4 right-4 p-2 text-slate-500 hover:text-green-600 z-10 rounded-lg hover:bg-white/50 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Logo & Toggle */}
        <div className={`p-5 border-b border-slate-200/50 relative ${!sidebarExpanded && "flex justify-center"}`}>
          {sidebarExpanded ? (
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-11 h-11 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg shadow-green-500/30 ring-2 ring-green-100">
                  <Building2 className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent">
                    Cviro
                  </h1>
                  <p className="text-xs text-slate-500 font-medium">Nhà tuyển dụng</p>
                </div>
              </div>
              <button
                onClick={() => setSidebarExpanded(!sidebarExpanded)}
                className="hidden lg:block p-2 hover:bg-white/50 rounded-lg transition-colors text-slate-400 hover:text-green-600"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center space-y-2">
              <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-green-500 rounded-xl flex items-center justify-center shadow-lg shadow-green-500/30">
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <button
                onClick={() => setSidebarExpanded(!sidebarExpanded)}
                className="hidden lg:block p-1.5 hover:bg-white/50 rounded-lg transition-colors text-slate-400 hover:text-green-600"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-1.5 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent">
          {navItems.map(({ name, path, icon: Icon }) => (
            <button
              key={path}
              onClick={() => handleNavClick(path)}
              title={!sidebarExpanded ? name : ""}
              className={`group flex items-center w-full px-3.5 py-3 rounded-xl transition-all duration-200 ${
                activeTab === path
                  ? "bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg shadow-green-500/30 scale-[1.02]"
                  : "text-slate-600 hover:bg-white/70 hover:text-green-600 hover:shadow-sm"
              } ${!sidebarExpanded && "justify-center"}`}
            >
              <div
                className={`p-2 rounded-lg transition-colors ${
                  activeTab === path ? "bg-white/20" : "bg-slate-100 group-hover:bg-green-50"
                }`}
              >
                <Icon
                  className={`w-5 h-5 ${
                    activeTab === path ? "text-white" : "text-slate-500 group-hover:text-green-600"
                  }`}
                />
              </div>
              {sidebarExpanded && <span className="ml-3 font-semibold text-sm">{name}</span>}
            </button>
          ))}
        </nav>

        {/* User Profile & Logout */}
        <div className="p-4 border-t border-slate-200/50 bg-white/30">
          {sidebarExpanded ? (
            <>
              <div className="flex items-center space-x-3 px-3.5 py-3 bg-gradient-to-br from-white/60 to-white/40 rounded-xl shadow-sm mb-2.5 border border-white/50 hover:shadow-md transition-all">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center shadow-md ring-2 ring-blue-100">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-slate-800 truncate">
                    {mockAgencyProfile.companyName}
                  </p>
                  <p className="text-xs text-slate-500 font-medium">{mockAgencyProfile.companyType}</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center w-full px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200 group"
              >
                <div className="p-2 rounded-lg bg-red-50 group-hover:bg-red-100 transition-colors">
                  <LogOut className="w-4 h-4" />
                </div>
                <span className="ml-3 font-semibold text-sm">Đăng xuất</span>
              </button>
            </>
          ) : (
            <div className="flex flex-col items-center space-y-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                <User className="w-5 h-5 text-white" />
              </div>
              <button
                onClick={handleLogout}
                title="Đăng xuất"
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 relative z-10">
        {/* Header Bar */}
        <header className="bg-white/80 backdrop-blur-xl shadow-sm border-b border-slate-200/50 sticky top-0 z-30">
          <div className="px-4 lg:px-8 py-4 lg:py-6 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 text-slate-600 hover:text-green-600 hover:bg-white/50 rounded-xl transition-all"
              >
                <Menu className="w-5 h-5" />
              </button>
              <div>
                <h2 className="text-xl lg:text-2xl font-bold text-slate-800">
                  {getCurrentPageName()}
                </h2>
                <p className="text-xs lg:text-sm text-slate-500 hidden sm:block">
                  Quản lý tuyển dụng event part-time hiệu quả
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2 lg:space-x-4">
              <button className="relative p-2.5 lg:p-3 bg-white/50 backdrop-blur-sm hover:bg-white/80 rounded-xl transition-all border border-slate-200/50 hover:border-green-200">
                <Bell className="w-5 h-5 text-slate-600 hover:text-green-600 transition-colors" />
                {notifications.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-br from-green-500 to-green-600 rounded-full animate-pulse shadow-lg shadow-green-500/50" />
                )}
              </button>

              {/* Stats in Header - Desktop Only */}
              <div className="hidden xl:flex items-center space-x-4 pl-4 border-l border-slate-200/50">
                <div className="text-center px-3 py-1.5 bg-white/50 backdrop-blur-sm rounded-lg">
                  <div className="text-lg lg:text-xl font-bold bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent">
                    {jobsCount}
                  </div>
                  <div className="text-xs text-slate-500 font-medium">Jobs Active</div>
                </div>
                <div className="text-center px-3 py-1.5 bg-white/50 backdrop-blur-sm rounded-lg">
                  <div className="text-lg lg:text-xl font-bold bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
                    {applicationsCount}
                  </div>
                  <div className="text-xs text-slate-500 font-medium">Ứng viên</div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Stats Bar */}
          <div className="xl:hidden bg-white/50 backdrop-blur-sm border-t border-slate-200/50 px-4 py-3">
            <div className="flex justify-around text-center">
              <div className="px-3 py-1.5 bg-white/70 rounded-lg">
                <div className="text-lg font-bold bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent">
                  {jobsCount}
                </div>
                <div className="text-xs text-slate-500 font-medium">Jobs Active</div>
              </div>
              <div className="w-px bg-slate-200" />
              <div className="px-3 py-1.5 bg-white/70 rounded-lg">
                <div className="text-lg font-bold bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
                  {applicationsCount}
                </div>
                <div className="text-xs text-slate-500 font-medium">Ứng viên</div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 p-4 lg:p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            <Outlet context={{ agencyId }} />
          </div>
        </div>
      </main>
    </div>
  );
}
