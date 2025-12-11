"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";

interface JobStatusToggleProps {
  jobId: string;
  initialPublished: boolean;
}

export default function JobStatusToggle({ jobId }: JobStatusToggleProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (loading) return;

    const confirmed = window.confirm(
      "Bạn có chắc muốn xóa công việc này? Hành động này không thể hoàn tác!"
    );

    if (!confirmed) return;

    setLoading(true);
    try {
      const res = await fetch(`/api/agency/jobs/${jobId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        alert("Đã xóa công việc thành công!");
        router.push("/agency/dashboard/jobs");
      } else {
        const data = await res.json();
        alert(data.error || "Có lỗi xảy ra");
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("Có lỗi xảy ra, vui lòng thử lại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-colors text-sm font-medium bg-red-50 text-red-700 hover:bg-red-100 border border-red-200 ${
        loading ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      <Trash2 className="w-4 h-4" />
      {loading ? "Đang xóa..." : "Xóa job"}
    </button>
  );
}
