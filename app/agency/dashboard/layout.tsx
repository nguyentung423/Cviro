import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, Briefcase, Users, User, LogOut } from "lucide-react";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import AgencyHeader from "./AgencyHeader";
import AgencyLogoutButton from "./AgencyLogoutButton";
import AgencyMobileSidebar from "./AgencyMobileSidebar";

async function getAgencyData(email: string) {
  const { data: agency } = await supabaseAdmin
    .from("agencies")
    .select("*")
    .eq("email", email)
    .maybeSingle();

  if (!agency) {
    return null;
  }

  return { agency };
}

export default async function AgencyDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();

  if (!session?.user?.email) {
    redirect("/login/agency");
  }

  const data = await getAgencyData(session.user.email);

  if (!data) {
    redirect("/login/agency");
  }

  const { agency } = data;
  const agencyName = agency.agency_name || agency.name || "Agency";

  return (
    <div className="min-h-screen bg-white">
      <AgencyHeader agencyName={agencyName} />

      {/* Mobile Sidebar */}
      <AgencyMobileSidebar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
        <div className="flex gap-6 lg:gap-10">
          {/* Sidebar - Desktop only */}
          <aside className="hidden lg:block w-56 shrink-0">
            <div className="space-y-1">
              <nav className="space-y-0.5">
                <Link
                  href="/agency/dashboard"
                  className="flex items-center gap-3 px-3 py-2 text-sm font-normal text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all"
                >
                  <LayoutDashboard className="w-4.5 h-4.5" />
                  Tổng quan
                </Link>
                <Link
                  href="/agency/dashboard/jobs"
                  className="flex items-center gap-3 px-3 py-2 text-sm font-normal text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all"
                >
                  <Briefcase className="w-4.5 h-4.5" />
                  Quản lý job
                </Link>
                <Link
                  href="/agency/dashboard/jobs/create"
                  className="flex items-center gap-3 px-3 py-2 text-sm font-normal text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all"
                >
                  <Users className="w-4.5 h-4.5" />
                  Tạo job mới
                </Link>
                <Link
                  href="/agency/dashboard/profile"
                  className="flex items-center gap-3 px-3 py-2 text-sm font-normal text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all"
                >
                  <User className="w-4.5 h-4.5" />
                  Thông tin cá nhân
                </Link>
              </nav>

              {/* Logout Button */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <AgencyLogoutButton />
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">{children}</main>
        </div>
      </div>
    </div>
  );
}
