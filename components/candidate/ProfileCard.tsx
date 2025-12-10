"use client";

import { User } from "lucide-react";
import type { Candidate } from "@/types/candidate";

interface ProfileCardProps {
  candidate: Candidate | null;
  onEdit?: () => void;
}

export default function ProfileCard({ candidate, onEdit }: ProfileCardProps) {
  if (!candidate) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6 animate-pulse">
        <div className="flex items-center gap-4">
          <div className="w-32 h-32 bg-gray-200 rounded-full"></div>
          <div className="flex-1 space-y-3">
            <div className="h-6 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/3"></div>
          </div>
        </div>
      </div>
    );
  }

  const completionPercentage = calculateProfileCompletion(candidate);

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-start gap-6">
        {/* Avatar */}
        <div className="flex-shrink-0">
          {candidate.avatar_url ? (
            <img
              src={candidate.avatar_url}
              alt={candidate.name || "Avatar"}
              className="w-32 h-32 rounded-full object-cover border-4 border-gray-100"
            />
          ) : (
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#ab3f20] to-[#8b2f15] flex items-center justify-center">
              <User className="w-16 h-16 text-white" />
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold text-gray-900 mb-1">
            {candidate.name || "Chưa cập nhật tên"}
          </h2>
          <p className="text-sm text-gray-500 mb-4">{candidate.email}</p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div>
              <p className="text-xs text-gray-500">Tuổi</p>
              <p className="text-lg font-semibold text-gray-900">
                {candidate.age || "-"}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Chiều cao</p>
              <p className="text-lg font-semibold text-gray-900">
                {candidate.height ? `${candidate.height}cm` : "-"}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Cân nặng</p>
              <p className="text-lg font-semibold text-gray-900">
                {candidate.weight ? `${candidate.weight}kg` : "-"}
              </p>
            </div>
          </div>

          {/* Profile Completion */}
          <div className="mb-4">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-gray-600">Độ hoàn thiện hồ sơ</span>
              <span className="font-semibold text-gray-900">
                {completionPercentage}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-[#ab3f20] h-2 rounded-full transition-all duration-300"
                style={{ width: `${completionPercentage}%` }}
              ></div>
            </div>
          </div>

          {onEdit && (
            <button
              onClick={onEdit}
              className="px-4 py-2 bg-[#ab3f20] text-white rounded-lg hover:bg-[#8b2f15] transition-colors text-sm font-medium"
            >
              Chỉnh sửa hồ sơ
            </button>
          )}
        </div>
      </div>

      {/* Experience */}
      {candidate.experience && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h3 className="text-sm font-semibold text-gray-900 mb-2">
            Kinh nghiệm
          </h3>
          <p className="text-sm text-gray-600 whitespace-pre-wrap">
            {candidate.experience}
          </p>
        </div>
      )}
    </div>
  );
}

function calculateProfileCompletion(candidate: Candidate): number {
  const fields = [
    candidate.name,
    candidate.age,
    candidate.height,
    candidate.weight,
    candidate.avatar_url,
    candidate.experience,
    candidate.photo_1,
    candidate.phone || candidate.zalo,
  ];

  const filledFields = fields.filter(
    (field) => field !== null && field !== ""
  ).length;
  return Math.round((filledFields / fields.length) * 100);
}
