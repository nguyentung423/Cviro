import { getServerSession } from "next-auth";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";

export const dynamic = "force-dynamic";
import Image from "next/image";
import { ArrowLeft, User, Phone, Mail, Briefcase } from "lucide-react";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import PhotoGallery from "@/components/agency/PhotoGallery";

async function getCandidateData(candidateId: string) {
  const { data: candidate, error } = await supabaseAdmin
    .from("candidates")
    .select("*")
    .eq("id", candidateId)
    .maybeSingle();

  if (error || !candidate) {
    return null;
  }

  return candidate;
}

export default async function CandidateProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await getServerSession();

  if (!session?.user?.email) {
    redirect("/login/agency");
  }

  const { id } = await params;
  const candidate = await getCandidateData(id);

  if (!candidate) {
    notFound();
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <Link
          href="/agency/dashboard"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-3"
        >
          <ArrowLeft className="w-4 h-4" />
          Quay lại
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Hồ sơ ứng viên</h1>
      </div>
      {/* Notice */}
      <div className="px-4 py-3 bg-blue-50 border border-blue-200 rounded-xl">
        <p className="text-sm text-blue-800">
          ℹ️ Đây là hồ sơ của ứng viên. Bạn chỉ có thể xem thông tin, không thể
          chỉnh sửa.
        </p>
      </div>
      {/* Avatar Card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center shrink-0">
            {candidate.avatar_url ? (
              <Image
                src={candidate.avatar_url}
                alt="Avatar"
                width={80}
                height={80}
                className="w-full h-full object-cover"
              />
            ) : (
              <User className="w-10 h-10 text-gray-400" />
            )}
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              {candidate.name || "Chưa có tên"}
            </h2>
            <p className="text-sm text-gray-500 mt-1">Thông tin ứng viên</p>
          </div>
        </div>
      </div>
      {/* Basic Info */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-4">
          Thông tin cơ bản
        </h3>
        <div className="space-y-4">
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
            <User className="w-5 h-5 text-gray-400" />
            <div className="flex-1">
              <p className="text-xs text-gray-500">Họ và tên</p>
              <p className="text-sm font-medium text-gray-900">
                {candidate.name || "Chưa cập nhật"}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="p-3 bg-gray-50 rounded-xl">
              <p className="text-xs text-gray-500 mb-1">Tuổi</p>
              <p className="text-sm font-medium text-gray-900">
                {candidate.age || "-"}
              </p>
            </div>

            <div className="p-3 bg-gray-50 rounded-xl">
              <p className="text-xs text-gray-500 mb-1">Cao (cm)</p>
              <p className="text-sm font-medium text-gray-900">
                {candidate.height || "-"}
              </p>
            </div>

            <div className="p-3 bg-gray-50 rounded-xl">
              <p className="text-xs text-gray-500 mb-1">Nặng (kg)</p>
              <p className="text-sm font-medium text-gray-900">
                {candidate.weight || "-"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
            <Mail className="w-5 h-5 text-gray-400" />
            <div className="flex-1">
              <p className="text-xs text-gray-500">Email</p>
              <p className="text-sm font-medium text-gray-900">
                {candidate.email}
              </p>
            </div>
          </div>

          {candidate.phone && (
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
              <Phone className="w-5 h-5 text-gray-400" />
              <div className="flex-1">
                <p className="text-xs text-gray-500">Số điện thoại</p>
                <p className="text-sm font-medium text-gray-900">
                  {candidate.phone}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Experience */}
      {candidate.experience && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center gap-2 mb-4">
            <Briefcase className="w-5 h-5 text-gray-600" />
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
              Kinh nghiệm làm việc
            </h3>
          </div>
          <div className="p-4 bg-gray-50 rounded-xl">
            <p className="text-sm text-gray-900 whitespace-pre-wrap">
              {candidate.experience}
            </p>
          </div>
        </div>
      )}{" "}
      {/* Photo Gallery */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-4">
          Album ảnh
        </h3>
        <PhotoGallery
          photos={{
            photo_1: candidate.photo_1,
            photo_2: candidate.photo_2,
            photo_3: candidate.photo_3,
            photo_4: candidate.photo_4,
          }}
        />
      </div>
    </div>
  );
}
