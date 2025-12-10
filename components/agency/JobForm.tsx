"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Save } from "lucide-react";
import { HANOI_DISTRICTS, type JobFormData } from "@/types/agency";

interface JobFormProps {
  initialData?: Partial<JobFormData>;
  jobId?: string;
  onSubmit?: (data: JobFormData) => Promise<void>;
}

export default function JobForm({
  initialData,
  jobId,
  onSubmit,
}: JobFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<JobFormData>({
    title: initialData?.title || "",
    description: initialData?.description || "",
    location: initialData?.location || "",
    salary: initialData?.salary || "",
    date: initialData?.date || "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.location || !formData.description) {
      alert("Vui lòng điền đầy đủ thông tin bắt buộc");
      return;
    }

    setLoading(true);

    try {
      if (onSubmit) {
        await onSubmit(formData);
      } else {
        // Default submit to API
        const endpoint = jobId
          ? `/api/agency/jobs/${jobId}`
          : "/api/agency/jobs";
        const method = jobId ? "PUT" : "POST";

        const res = await fetch(endpoint, {
          method,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        if (res.ok) {
          alert(jobId ? "Cập nhật job thành công!" : "Tạo job mới thành công!");
          router.push("/agency/dashboard/jobs");
        } else {
          const data = await res.json();
          alert(data.error || "Có lỗi xảy ra");
        }
      }
    } catch (error) {
      console.error("Submit error:", error);
      alert("Có lỗi xảy ra, vui lòng thử lại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Location */}
      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">
          Địa điểm <span className="text-red-500">*</span>
        </label>
        <select
          value={formData.location}
          onChange={(e) =>
            setFormData({ ...formData, location: e.target.value })
          }
          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#536b4e] focus:border-transparent text-gray-900"
          required
        >
          <option value="">Chọn quận</option>
          {HANOI_DISTRICTS.map((district) => (
            <option key={district} value={district}>
              {district}
            </option>
          ))}
        </select>
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">
          Mô tả công việc <span className="text-red-500">*</span>
        </label>
        <p className="text-xs text-gray-600 mb-2 bg-amber-50 border border-amber-200 rounded-lg p-2">
          <strong>📝 Chỉ mô tả 1 công việc duy nhất.</strong> Không gộp nhiều vị
          trí khác nhau trong cùng 1 bài.
        </p>
        <textarea
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          rows={8}
          maxLength={500}
          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#536b4e] focus:border-transparent text-gray-900"
          placeholder="Ví dụ: Tuyển PG bán hàng tại TTTM Vincom. Giờ làm việc 9h-21h, lương 150k/ca. Yêu cầu: nữ 18-25 tuổi, ngoại hình khá..."
          required
        />
        <p className="text-xs text-gray-500 mt-1 text-right">
          {formData.description.length}/500 ký tự
        </p>
      </div>

      {/* Submit Button */}
      <div className="flex gap-3 pt-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="flex-1 px-4 py-3 border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
          disabled={loading}
        >
          Hủy
        </button>
        <button
          type="submit"
          disabled={loading}
          className="flex-1 px-4 py-3 bg-[#536b4e] text-white rounded-xl hover:bg-[#435940] transition-colors font-medium flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Đang đăng...
            </>
          ) : (
            <>
              <Save className="w-5 h-5" />
              {jobId ? "Cập nhật" : "Đăng job"}
            </>
          )}
        </button>
      </div>
    </form>
  );
}
