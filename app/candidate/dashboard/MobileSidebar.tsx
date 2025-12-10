"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  User,
  Briefcase,
  FileText,
  Menu,
  X,
} from "lucide-react";

interface MobileSidebarProps {
  stats: {
    total: number;
    pending: number;
    approved: number;
    rejected: number;
  };
}

export default function MobileSidebar({ stats }: MobileSidebarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Hide menu button on profile page (has its own bottom bar)
  const isProfilePage = pathname === "/candidate/dashboard/profile";

  const navigation = [
    {
      name: "Tổng quan",
      href: "/candidate/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Thông tin cá nhân",
      href: "/candidate/dashboard/profile",
      icon: User,
    },
    {
      name: "Tìm việc làm",
      href: "/candidate/dashboard/jobs",
      icon: Briefcase,
    },
    {
      name: "Đơn ứng tuyển",
      href: "/candidate/dashboard/applications",
      icon: FileText,
    },
  ];

  return (
    <>
      {/* Mobile Menu Button - Hidden on profile page */}
      {!isProfilePage && (
        <button
          onClick={() => setIsOpen(true)}
          className="lg:hidden fixed bottom-4 right-4 z-40 w-12 h-12 bg-[#ab3f20] text-white rounded-full shadow-lg flex items-center justify-center hover:bg-[#8a3219] transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>
      )}

      {/* Overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
        />
      )}

      {/* Sidebar */}
      <div
        className={`lg:hidden fixed inset-y-0 left-0 z-50 w-64 bg-white transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h2 className="text-lg font-bold text-[#ab3f20]">Menu</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    isActive
                      ? "bg-[#ab3f20] text-white"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Stats */}
          <div className="p-4 border-t border-gray-200">
            <h3 className="text-xs font-semibold text-gray-500 uppercase mb-3">
              Thống kê
            </h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Tổng đơn</span>
                <span className="font-semibold text-gray-900">
                  {stats.total}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Chờ duyệt</span>
                <span className="font-semibold text-yellow-600">
                  {stats.pending}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Được chấp nhận</span>
                <span className="font-semibold text-green-600">
                  {stats.approved}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
