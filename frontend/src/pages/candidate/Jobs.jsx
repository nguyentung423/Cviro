import { useState } from "react";
import { MapPin, DollarSign, Calendar, Briefcase, CheckCircle } from "lucide-react";
import { mockCandidateJobs } from "../../data/mockData";

export default function CandidateJobs() {
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [jobs] = useState(mockCandidateJobs);
  const [applying, setApplying] = useState(null);

  const handleApply = (jobId) => {
    if (appliedJobs.includes(jobId)) return;
    setApplying(jobId);
    setTimeout(() => {
      setAppliedJobs((prev) => [...prev, jobId]);
      setApplying(null);
    }, 500);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-800 mb-6">Việc làm sự kiện nổi bật</h1>
      {jobs.length === 0 ? (
        <p className="text-slate-600">Hiện chưa có job nào được mở.</p>
      ) : (
        <div className="space-y-4">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition"
            >
              <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-orange-600" /> {job.title}
              </h2>
              <p className="text-slate-600 mt-1">{job.description}</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4 text-sm text-slate-600">
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" /> {job.location}
                </div>
                <div className="flex items-center gap-1">
                  <DollarSign className="w-4 h-4" /> {job.salary}
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" /> Hạn ứng tuyển: {job.deadline}
                </div>
              </div>

              <button
                onClick={() => handleApply(job.id)}
                disabled={applying === job.id || appliedJobs.includes(job.id)}
                className="mt-4 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {appliedJobs.includes(job.id) ? (
                  <>
                    <CheckCircle className="w-4 h-4" /> Đã ứng tuyển
                  </>
                ) : applying === job.id ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Đang gửi...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4" /> Ứng tuyển ngay
                  </>
                )}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
