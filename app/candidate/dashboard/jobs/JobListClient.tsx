"use client";

import { useState, useMemo } from "react";
import JobList from "@/components/candidate/JobList";
import type { Job, JobWithApplication } from "@/types/candidate";
import { Filter } from "lucide-react";

interface JobListClientProps {
  availableJobs: Job[];
  appliedJobs: JobWithApplication[];
}

export default function JobListClient({
  availableJobs: initialAvailable,
  appliedJobs: initialApplied,
}: JobListClientProps) {
  const [availableJobs, setAvailableJobs] = useState(initialAvailable);
  const [appliedJobs, setAppliedJobs] = useState(initialApplied);
  const [applying, setApplying] = useState<string | null>(null);
  const [locationFilter, setLocationFilter] = useState<string>("all");

  // Get unique locations
  const locations = useMemo(() => {
    const locs = new Set<string>();
    [...initialAvailable, ...initialApplied].forEach((job) => {
      if (job.location) locs.add(job.location);
    });
    return Array.from(locs).sort();
  }, [initialAvailable, initialApplied]);

  // Filter jobs by location
  const filteredAvailable = useMemo(() => {
    if (locationFilter === "all") return availableJobs;
    return availableJobs.filter((job) => job.location === locationFilter);
  }, [availableJobs, locationFilter]);

  // Filter applied jobs by location AND hide approved/rejected after 24h
  const filteredApplied = useMemo(() => {
    const now = new Date();
    const filtered = appliedJobs.filter((job) => {
      // Location filter
      if (locationFilter !== "all" && job.location !== locationFilter) {
        return false;
      }

      // Auto-hide approved/rejected applications after 24h
      if (
        job.application &&
        (job.application.status === "approved" ||
          job.application.status === "rejected")
      ) {
        const updatedAt = new Date(job.application.created_at);
        const hoursDiff =
          (now.getTime() - updatedAt.getTime()) / (1000 * 60 * 60);
        if (hoursDiff > 24) {
          return false; // Hide after 24h
        }
      }

      return true;
    });

    return filtered;
  }, [appliedJobs, locationFilter]);

  const handleApply = async (jobId: string) => {
    // Check profile completeness first
    try {
      const profileRes = await fetch("/api/candidate/profile");
      if (profileRes.ok) {
        const profile = await profileRes.json();

        // Check required fields
        if (!profile) {
          alert(
            "⚠️ Bạn cần hoàn thiện hồ sơ trước khi ứng tuyển!\n\nVui lòng cập nhật:\n- Thông tin cá nhân\n- Kinh nghiệm làm việc\n- Ảnh hồ sơ (ít nhất 3 ảnh)"
          );
          return;
        }

        const missingFields = [];
        if (!profile.name?.trim()) missingFields.push("Họ và tên");
        if (!profile.age) missingFields.push("Tuổi");
        if (!profile.height) missingFields.push("Chiều cao");
        if (!profile.weight) missingFields.push("Cân nặng");
        if (!profile.zalo?.trim()) missingFields.push("Số Zalo");
        if (!profile.experience?.trim())
          missingFields.push("Kinh nghiệm làm việc");

        // Check photos (need at least 3)
        const photos = [
          profile.photo_1,
          profile.photo_2,
          profile.photo_3,
          profile.photo_4,
        ].filter(Boolean);
        if (photos.length < 3) {
          missingFields.push(
            `Ảnh hồ sơ (cần ít nhất 3 ảnh, hiện có ${photos.length})`
          );
        }

        if (missingFields.length > 0) {
          alert(
            `⚠️ Vui lòng hoàn thiện hồ sơ trước khi ứng tuyển!\n\nThiếu thông tin:\n${missingFields
              .map((f) => `• ${f}`)
              .join("\n")}`
          );
          return;
        }
      }
    } catch (error) {
      console.error("Profile check error:", error);
      alert("Không thể kiểm tra hồ sơ. Vui lòng thử lại!");
      return;
    }

    setApplying(jobId);
    try {
      const res = await fetch("/api/jobs/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobId }),
      });

      if (res.ok) {
        // Move job from available to applied with pending status
        const appliedJob = availableJobs.find((j) => j.id === jobId);
        if (appliedJob) {
          setAvailableJobs((prev) => prev.filter((j) => j.id !== jobId));
          setAppliedJobs((prev) => [
            {
              ...appliedJob,
              application: {
                id: "", // Will be replaced on refresh
                status: "pending",
                created_at: new Date().toISOString(),
              },
            },
            ...prev,
          ]);
        }
        alert("Ứng tuyển thành công!");
      } else {
        const data = await res.json();
        alert(data.error || "Có lỗi xảy ra, vui lòng thử lại");
      }
    } catch (error) {
      console.error("Apply error:", error);
      alert("Có lỗi xảy ra, vui lòng thử lại");
    } finally {
      setApplying(null);
    }
  };

  const appliedJobIds = appliedJobs.map((j) => j.id);

  return (
    <>
      {/* Location Filter */}
      {locations.length > 0 && (
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <Filter className="w-4 h-4" />
              Lọc theo địa điểm:
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setLocationFilter("all")}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  locationFilter === "all"
                    ? "bg-[#ab3f20] text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Tất cả ({initialAvailable.length + initialApplied.length})
              </button>
              {locations.map((loc) => {
                const count = [...initialAvailable, ...initialApplied].filter(
                  (j) => j.location === loc
                ).length;
                return (
                  <button
                    key={loc}
                    onClick={() => setLocationFilter(loc)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                      locationFilter === loc
                        ? "bg-[#ab3f20] text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {loc} ({count})
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Available Jobs */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-4 sm:p-6 border-b border-gray-200">
          <h2 className="text-base sm:text-lg font-semibold text-gray-900">
            Việc làm có sẵn
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 mt-1">
            {filteredAvailable.length} việc làm bạn có thể ứng tuyển
          </p>
        </div>
        <div className="p-4 sm:p-6">
          <JobList
            jobs={filteredAvailable}
            appliedJobIds={appliedJobIds}
            onApply={handleApply}
            loading={applying !== null}
          />
        </div>
      </div>

      {/* Applied Jobs */}
      {filteredApplied.length > 0 && (
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="p-4 sm:p-6 border-b border-gray-200">
            <h2 className="text-base sm:text-lg font-semibold text-gray-900">
              Việc làm đã ứng tuyển
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 mt-1">
              {filteredApplied.length} việc làm bạn đã nộp đơn
            </p>
            <p className="text-xs text-blue-600 mt-2 bg-blue-50 rounded-lg p-2 inline-block">
              ℹ️ Đơn đã duyệt/từ chối sẽ tự động ẩn sau 24 giờ
            </p>
          </div>
          <div className="p-4 sm:p-6">
            <JobList jobs={filteredApplied} appliedJobIds={appliedJobIds} />
          </div>
        </div>
      )}
    </>
  );
}
