import {
  Home,
  FileText,
  Calendar,
  User,
  Star,
  Settings,
  LogOut,
  Bell,
  Search,
  Briefcase,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Outlet, useNavigate, useLocation, Link } from "react-router-dom";
import { mockCandidate } from "../../data/mockData";

const navItems = [
  { name: "Tổng quan", path: "/candidate", icon: Home },
  { name: "Tìm việc", path: "/candidate/jobs", icon: Briefcase },
  { name: "Đơn ứng tuyển", path: "/candidate/applications", icon: FileText },
  { name: "Hồ sơ", path: "/candidate/profile", icon: User },
  { name: "Cài đặt", path: "/candidate/settings", icon: Settings },
];

export default function CandidateDashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(location.pathname);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarExpanded, setSidebarExpanded] = useState(true);

  useEffect(() => {
    setActiveTab(location.pathname);
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login-candidate");
  };

  const handleNavClick = (path) => {
    navigate(path);
    setSidebarOpen(false);
  };

  const getCurrentPageName = () => {
    const currentItem = navItems.find((item) => item.path === activeTab);
    return currentItem ? currentItem.name : "Dashboard";
  };

  return (
    <div className="relative flex h-screen overflow-hidden bg-gradient-to-br from-orange-50 via-amber-50 to-slate-100">
      {/* Animated Background Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-20 -left-20 w-96 h-96 bg-gradient-to-br from-orange-200/30 to-amber-300/30 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-tr from-amber-200/20 to-orange-300/20 rounded-full blur-3xl animate-pulse-slow-delayed" />
        <div className="absolute top-1/2 left-1/3 w-72 h-72 bg-gradient-to-bl from-orange-100/40 to-amber-100/30 rounded-full blur-3xl animate-pulse-slow" />
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Glassmorphism Sidebar */}
      <aside
        className={`fixed lg:relative inset-y-0 left-0 z-50 transition-all duration-300 ${
          sidebarExpanded ? "w-72" : "w-20"
        } bg-white/80 backdrop-blur-xl shadow-2xl shadow-orange-500/5 flex flex-col overflow-hidden ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Close Button Mobile */}
        <button
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden absolute top-4 right-4 p-2 text-slate-500 hover:text-orange-600 z-10 rounded-lg hover:bg-white/50 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Logo & Toggle */}
        <div className={`p-5 border-b border-slate-200/50 relative ${!sidebarExpanded && "flex justify-center"}`}>
          {sidebarExpanded ? (
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-11 h-11 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/30 ring-2 ring-orange-100">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
                    Cviro
                  </h1>
                  <p className="text-xs text-slate-500 font-medium">Ứng viên</p>
                </div>
              </div>
              <button
                onClick={() => setSidebarExpanded(!sidebarExpanded)}
                className="hidden lg:block p-2 hover:bg-white/50 rounded-lg transition-colors text-slate-400 hover:text-orange-600"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center space-y-2">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-600 to-orange-500 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/30">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <button
                onClick={() => setSidebarExpanded(!sidebarExpanded)}
                className="hidden lg:block p-1.5 hover:bg-white/50 rounded-lg transition-colors text-slate-400 hover:text-orange-600"
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
                  ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/30 scale-[1.02]"
                  : "text-slate-600 hover:bg-white/70 hover:text-orange-600 hover:shadow-sm"
              } ${!sidebarExpanded && "justify-center"}`}
            >
              <div
                className={`p-2 rounded-lg transition-colors ${
                  activeTab === path ? "bg-white/20" : "bg-slate-100 group-hover:bg-orange-50"
                }`}
              >
                <Icon
                  className={`w-5 h-5 ${
                    activeTab === path ? "text-white" : "text-slate-500 group-hover:text-orange-600"
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
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl flex items-center justify-center shadow-md ring-2 ring-emerald-100">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-slate-800 truncate">
                    {mockCandidate.fullName}
                  </p>
                  <p className="text-xs text-slate-500 font-medium">{mockCandidate.role}</p>
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
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
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
                className="lg:hidden p-2 text-slate-600 hover:text-orange-600 hover:bg-white/50 rounded-xl transition-all"
              >
                <Menu className="w-5 h-5" />
              </button>
              <div>
                <h2 className="text-xl lg:text-2xl font-bold text-slate-800">
                  {getCurrentPageName()}
                </h2>
                <p className="text-xs lg:text-sm text-slate-500 hidden sm:block">
                  Tìm kiếm và quản lý công việc event part-time
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2 lg:space-x-4">
              <div className="relative hidden sm:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Tìm công việc, sự kiện..."
                  className="pl-10 pr-4 py-2.5 w-32 sm:w-48 lg:w-64 bg-white/50 backdrop-blur-sm border border-slate-200/50 rounded-xl text-sm focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                />
              </div>
              <button className="relative p-2.5 lg:p-3 bg-white/50 backdrop-blur-sm hover:bg-white/80 rounded-xl transition-all border border-slate-200/50 hover:border-orange-200">
                <Bell className="w-5 h-5 text-slate-600 hover:text-orange-600 transition-colors" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full animate-pulse shadow-lg shadow-orange-500/50" />
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 p-4 lg:p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            <Outlet context={{ candidateId: mockCandidate.id }} />
          </div>
        </div>
      </main>
    </div>
  );
}
