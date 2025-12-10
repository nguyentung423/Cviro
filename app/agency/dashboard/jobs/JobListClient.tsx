"use client";

import { useState, useMemo } from "react";
import JobCard from "@/components/agency/JobCard";
import { Filter } from "lucide-react";
import type { Job } from "@/types/agency";

interface JobListClientProps {
  jobs: Job[];
}

export default function JobListClient({ jobs }: JobListClientProps) {
  const [locationFilter, setLocationFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Get unique locations
  const locations = useMemo(() => {
    const locs = new Set<string>();
    jobs.forEach((job) => {
      if (job.location) locs.add(job.location);
    });
    return Array.from(locs).sort();
  }, [jobs]);

  // Filter jobs
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchLocation =
        locationFilter === "all" || job.location === locationFilter;
      const matchStatus =
        statusFilter === "all" ||
        (statusFilter === "open" && job.published) ||
        (statusFilter === "closed" && !job.published);
      return matchLocation && matchStatus;
    });
  }, [jobs, locationFilter, statusFilter]);

  const openCount = jobs.filter((j) => j.published).length;
  const closedCount = jobs.filter((j) => !j.published).length;

  return (
    <>
      {/* Filters */}
      {jobs.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-4 space-y-4">
          {/* Status Filter */}
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <Filter className="w-4 h-4" />
              Trạng thái:
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setStatusFilter("all")}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  statusFilter === "all"
                    ? "bg-[#536b4e] text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Tất cả ({jobs.length})
              </button>
              <button
                onClick={() => setStatusFilter("open")}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  statusFilter === "open"
                    ? "bg-[#536b4e] text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Đang tuyển ({openCount})
              </button>
              <button
                onClick={() => setStatusFilter("closed")}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  statusFilter === "closed"
                    ? "bg-[#536b4e] text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Đã đóng ({closedCount})
              </button>
            </div>
          </div>

          {/* Location Filter */}
          {locations.length > 0 && (
            <div className="flex items-center gap-3 flex-wrap">
              <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <Filter className="w-4 h-4" />
                Địa điểm:
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setLocationFilter("all")}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    locationFilter === "all"
                      ? "bg-[#536b4e] text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Tất cả
                </button>
                {locations.map((loc) => {
                  const count = jobs.filter((j) => j.location === loc).length;
                  return (
                    <button
                      key={loc}
                      onClick={() => setLocationFilter(loc)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                        locationFilter === loc
                          ? "bg-[#536b4e] text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {loc} ({count})
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Job Grid */}
      {filteredJobs.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">Không tìm thấy công việc phù hợp</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      )}
    </>
  );
}
