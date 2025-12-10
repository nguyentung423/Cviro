import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, AlertCircle, Info } from "lucide-react";
import JobForm from "@/components/agency/JobForm";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export default async function CreateJobPage() {
  const session = await getServerSession();

  if (!session?.user?.email) {
    redirect("/login/agency");
  }

  // Check if agency profile is complete
  const { data: agency } = await supabaseAdmin
    .from("agencies")
    .select("agency_name, phone")
    .eq("email", session.user.email)
    .maybeSingle();

  const isProfileComplete = agency && agency.agency_name && agency.phone;

  if (!isProfileComplete) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-2">
        <div className="mb-6">
          <Link
            href="/agency/dashboard"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Quay lại
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">
            Tạo công việc mới
          </h1>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center shrink-0">
              <AlertCircle className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Vui lòng cập nhật thông tin cá nhân
              </h3>
              <p className="text-gray-700 mb-4">
                Bạn cần hoàn thiện thông tin cá nhân (họ tên và số điện thoại)
                trước khi đăng tuyển công việc. Điều này giúp ứng viên có thể
                liên hệ với bạn dễ dàng hơn.
              </p>
              <Link
                href="/agency/dashboard/profile"
                className="inline-flex items-center gap-2 px-4 py-3 bg-[#536b4e] text-white rounded-xl hover:bg-[#435940] transition-colors font-medium"
              >
                Cập nhật thông tin ngay
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-2">
      <div className="mb-6">
        <Link
          href="/agency/dashboard"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Quay lại
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Tạo công việc mới</h1>
        <p className="text-sm text-gray-600 mt-1">
          Chỉ cần điền địa điểm và mô tả công việc
        </p>
      </div>

      {/* Important Note */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
            <Info className="w-5 h-5 text-blue-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-gray-900 mb-1">
              ⚠️ Lưu ý quan trọng
            </h3>
            <p className="text-sm text-gray-700 mb-2">
              <strong>Mỗi lần chỉ đăng 1 công việc.</strong> Nếu bạn có nhiều vị
              trí tuyển dụng, vui lòng tạo nhiều bài đăng riêng biệt.
            </p>
            <p className="text-xs text-gray-600">
              💡 Ví dụ: Nếu bạn cần tuyển PG tại Hoàn Kiếm và Nhân sự phục vụ
              tại Đống Đa, hãy tạo 2 job riêng thay vì gộp chung trong 1 bài.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        `
        <JobForm />
      </div>
    </div>
  );
}
