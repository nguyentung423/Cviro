"use client";

import { useState } from "react";
import { Lock, Unlock } from "lucide-react";

interface JobStatusToggleProps {
  jobId: string;
  initialPublished: boolean;
}

export default function JobStatusToggle({
  jobId,
  initialPublished,
}: JobStatusToggleProps) {
  const [published, setPublished] = useState(initialPublished);
  const [loading, setLoading] = useState(false);

  const handleToggle = async () => {
    if (loading) return;

    const confirmed = window.confirm(
      published
        ? "Bạn có chắc muốn đóng tuyển? Ứng viên sẽ không thể ứng tuyển vào công việc này nữa."
        : "Bạn có chắc muốn mở lại tuyển dụng?"
    );

    if (!confirmed) return;

    setLoading(true);
    try {
      const res = await fetch(`/api/agency/jobs/${jobId}/toggle`, {
        method: "PUT",
      });

      if (res.ok) {
        const data = await res.json();
        setPublished(data.published);
        alert(
          data.published
            ? "Đã mở lại tuyển dụng thành công!"
            : "Đã đóng tuyển thành công!"
        );
      } else {
        const data = await res.json();
        alert(data.error || "Có lỗi xảy ra");
      }
    } catch (error) {
      console.error("Toggle error:", error);
      alert("Có lỗi xảy ra, vui lòng thử lại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleToggle}
      disabled={loading}
      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-colors text-sm font-medium ${
        published
          ? "bg-red-50 text-red-700 hover:bg-red-100 border border-red-200"
          : "bg-green-50 text-green-700 hover:bg-green-100 border border-green-200"
      } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      {published ? (
        <>
          <Lock className="w-4 h-4" />
          {loading ? "Đang đóng..." : "Đóng tuyển"}
        </>
      ) : (
        <>
          <Unlock className="w-4 h-4" />
          {loading ? "Đang mở..." : "Mở lại tuyển"}
        </>
      )}
    </button>
  );
}
