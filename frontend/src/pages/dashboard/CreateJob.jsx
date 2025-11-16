import { useState } from "react";
import {
  ArrowLeft,
  Users,
  Plus,
  X,
  AlertCircle,
  CheckCircle,
  Briefcase,
  Info,
  Copy,
} from "lucide-react";
import { Link } from "react-router-dom";

const eventTypes = ["Triển lãm", "Hội nghị", "Lễ hội", "Roadshow", "Concert", "Khác"];
const quickReqs = ["Năng động", "Giao tiếp tốt", "Ngoại hình sáng"];
const quickBenefits = ["Trả lương ngay", "Hỗ trợ ăn uống", "Hỗ trợ di chuyển"];

export default function CreateJobForm() {
  const [formData, setFormData] = useState({
    company: "",
    location: "",
    eventType: "",
    startDate: "",
    endDate: "",
    workingHours: "",
    description: "",
    isUrgent: false,
    contactPerson: "",
    contactPhone: "",
    contactEmail: "",
    positions: [
      {
        id: 1,
        title: "",
        quantity: 1,
        salary: "",
        salaryType: "per_day",
        requirements: [],
        benefits: [],
      },
    ],
  });
  const [error, setError] = useState("");
  const [createdJobs, setCreatedJobs] = useState([]);

  const handleChange = (field, value) => setFormData((p) => ({ ...p, [field]: value }));
  const handlePosChange = (id, field, value) =>
    setFormData((p) => ({
      ...p,
      positions: p.positions.map((pos) => (pos.id === id ? { ...pos, [field]: value } : pos)),
    }));

  const addPosition = () =>
    setFormData((p) => ({
      ...p,
      positions: [
        ...p.positions,
        {
          id: Date.now(),
          title: "",
          quantity: 1,
          salary: "",
          salaryType: "per_day",
          requirements: [],
          benefits: [],
        },
      ],
    }));

  const removePosition = (id) =>
    setFormData((p) => ({ ...p, positions: p.positions.filter((pos) => pos.id !== id) }));

  const duplicatePosition = (id) => {
    const pos = formData.positions.find((p) => p.id === id);
    if (pos) {
      setFormData((p) => ({
        ...p,
        positions: [...p.positions, { ...pos, id: Date.now(), title: `${pos.title} (copy)` }],
      }));
    }
  };

  const addTag = (id, field, value) => {
    if (!value) return;
    setFormData((p) => ({
      ...p,
      positions: p.positions.map((pos) =>
        pos.id === id && !pos[field].includes(value)
          ? { ...pos, [field]: [...pos[field], value] }
          : pos
      ),
    }));
  };

  const removeTag = (id, field, index) =>
    setFormData((p) => ({
      ...p,
      positions: p.positions.map((pos) =>
        pos.id === id ? { ...pos, [field]: pos[field].filter((_, i) => i !== index) } : pos
      ),
    }));

  const validate = () => {
    const required = [
      "company",
      "location",
      "eventType",
      "startDate",
      "endDate",
      "workingHours",
      "description",
      "contactPerson",
      "contactPhone",
      "contactEmail",
    ];
    const empty = required.filter((field) => !formData[field]);
    if (empty.length > 0) {
      setError("Vui lòng điền đủ thông tin bắt buộc.");
      return false;
    }
    if (formData.positions.some((pos) => !pos.title || !pos.salary)) {
      setError("Mỗi vị trí cần tên công việc và mức lương.");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    const mockId = `MOCK-${createdJobs.length + 1}`;
    setCreatedJobs((prev) => [...prev, { id: mockId, ...formData }]);
    alert("Đã tạo job mock thành công!");
    setFormData((p) => ({
      ...p,
      description: "",
      positions: [
        {
          id: Date.now(),
          title: "",
          quantity: 1,
          salary: "",
          salaryType: "per_day",
          requirements: [],
          benefits: [],
        },
      ],
    }));
  };

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <Link
            to="/agency/jobs"
            className="inline-flex items-center gap-2 text-slate-600 hover:text-green-800"
          >
            <ArrowLeft className="w-5 h-5" />
            Danh sách jobs
          </Link>
        </div>
        <h1 className="text-3xl font-bold text-slate-900">Đăng job sự kiện (mock)</h1>
        <p className="text-slate-500">
          Biểu mẫu này không gửi dữ liệu đi đâu cả – chỉ giúp trình diễn UI tạo job hoàn chỉnh.
        </p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-6">
        <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 space-y-4">
          <div className="flex items-center gap-3">
            <Briefcase className="w-5 h-5 text-green-700" />
            <div>
              <h2 className="text-lg font-semibold text-slate-800">Thông tin sự kiện</h2>
              <p className="text-sm text-slate-500">Những dữ liệu cơ bản để hệ thống tạo job.</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <input
              placeholder="Tên sự kiện *"
              value={formData.company}
              onChange={(e) => handleChange("company", e.target.value)}
              className="p-3 border rounded-lg"
            />
            <input
              placeholder="Địa điểm *"
              value={formData.location}
              onChange={(e) => handleChange("location", e.target.value)}
              className="p-3 border rounded-lg"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <select
              value={formData.eventType}
              onChange={(e) => handleChange("eventType", e.target.value)}
              className="p-3 border rounded-lg"
            >
              <option value="">Loại sự kiện *</option>
              {eventTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            <input
              placeholder="Khung giờ làm việc *"
              value={formData.workingHours}
              onChange={(e) => handleChange("workingHours", e.target.value)}
              className="p-3 border rounded-lg"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="date"
              value={formData.startDate}
              onChange={(e) => handleChange("startDate", e.target.value)}
              className="p-3 border rounded-lg"
            />
            <input
              type="date"
              value={formData.endDate}
              onChange={(e) => handleChange("endDate", e.target.value)}
              className="p-3 border rounded-lg"
            />
          </div>

          <textarea
            placeholder="Mô tả công việc *"
            value={formData.description}
            onChange={(e) => handleChange("description", e.target.value)}
            className="w-full p-3 border rounded-lg"
            rows="4"
          />
        </section>

        <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Users className="w-5 h-5 text-green-700" />
              <div>
                <h2 className="text-lg font-semibold text-slate-800">Vị trí tuyển dụng</h2>
                <p className="text-sm text-slate-500">Thêm các vị trí khác nhau cho cùng sự kiện.</p>
              </div>
            </div>
            <button
              type="button"
              onClick={addPosition}
              className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-sm font-medium"
            >
              <Plus className="w-4 h-4" />
              Thêm vị trí
            </button>
          </div>

          <div className="space-y-6">
            {formData.positions.map((pos, index) => (
              <div key={pos.id} className="p-4 border rounded-xl space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-slate-800">Vị trí #{index + 1}</h3>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => duplicatePosition(pos.id)}
                      className="p-2 text-slate-500 hover:text-slate-800 rounded-lg"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                    {formData.positions.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removePosition(pos.id)}
                        className="p-2 text-red-500 hover:text-red-700 rounded-lg"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <input
                    placeholder="Tên vị trí *"
                    value={pos.title}
                    onChange={(e) => handlePosChange(pos.id, "title", e.target.value)}
                    className="p-3 border rounded-lg"
                  />
                  <input
                    type="number"
                    min="1"
                    value={pos.quantity}
                    onChange={(e) => handlePosChange(pos.id, "quantity", parseInt(e.target.value, 10) || 1)}
                    className="p-3 border rounded-lg"
                  />
                  <input
                    placeholder="Mức lương *"
                    value={pos.salary}
                    onChange={(e) => handlePosChange(pos.id, "salary", e.target.value)}
                    className="p-3 border rounded-lg"
                  />
                </div>

                <QuickTags
                  label="Yêu cầu nhanh"
                  tags={quickReqs}
                  selected={pos.requirements}
                  onAdd={(value) => addTag(pos.id, "requirements", value)}
                  onRemove={(index) => removeTag(pos.id, "requirements", index)}
                  color="green"
                />

                <QuickTags
                  label="Quyền lợi"
                  tags={quickBenefits}
                  selected={pos.benefits}
                  onAdd={(value) => addTag(pos.id, "benefits", value)}
                  onRemove={(index) => removeTag(pos.id, "benefits", index)}
                  color="orange"
                />
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 space-y-4">
          <div className="flex items-center gap-3">
            <Info className="w-5 h-5 text-green-700" />
            <div>
              <h2 className="text-lg font-semibold text-slate-800">Liên hệ tuyển dụng</h2>
              <p className="text-sm text-slate-500">Thông tin để ứng viên liên hệ trực tiếp.</p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <input
              placeholder="Người liên hệ *"
              value={formData.contactPerson}
              onChange={(e) => handleChange("contactPerson", e.target.value)}
              className="p-3 border rounded-lg"
            />
            <input
              placeholder="Số điện thoại *"
              value={formData.contactPhone}
              onChange={(e) => handleChange("contactPhone", e.target.value)}
              className="p-3 border rounded-lg"
            />
            <input
              placeholder="Email *"
              value={formData.contactEmail}
              onChange={(e) => handleChange("contactEmail", e.target.value)}
              className="p-3 border rounded-lg"
            />
          </div>

          <label className="flex items-center gap-2 text-sm text-slate-600">
            <input
              type="checkbox"
              checked={formData.isUrgent}
              onChange={(e) => handleChange("isUrgent", e.target.checked)}
            />
            Đây là job khẩn cấp
            {formData.isUrgent && <AlertCircle className="w-4 h-4 text-red-600" />}
          </label>
        </section>

        {error && <div className="bg-red-50 p-4 rounded-lg text-red-700">{error}</div>}

        <div className="flex justify-end gap-3">
          <button type="submit" className="px-6 py-3 bg-green-700 text-white rounded-lg flex items-center gap-2">
            <CheckCircle className="w-5 h-5" /> Đăng job demo
          </button>
        </div>
      </form>

      {createdJobs.length > 0 && (
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-800 mb-3">Job đã tạo gần đây</h2>
          <ul className="space-y-2 text-sm text-slate-600">
            {createdJobs.map((job) => (
              <li key={job.id} className="flex items-center justify-between">
                <span>{job.company} • {job.location}</span>
                <span className="text-xs text-slate-400">ID: {job.id}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function QuickTags({ label, tags, selected, onAdd, onRemove, color }) {
  const colorMap = {
    green: { add: "bg-slate-100", pill: "bg-green-100 text-green-700" },
    orange: { add: "bg-slate-100", pill: "bg-orange-100 text-orange-700" },
  };
  return (
    <div>
      <p className="text-sm font-medium text-slate-700 mb-2">{label}</p>
      <div className="flex gap-2 flex-wrap mb-2">
        {tags.map((tag) => (
          <button key={tag} type="button" onClick={() => onAdd(tag)} className={`px-2 py-1 rounded ${colorMap[color].add}`}>
            {tag}
          </button>
        ))}
      </div>
      <div className="flex gap-2 flex-wrap">
        {selected.map((value, idx) => (
          <span key={`${value}-${idx}`} className={`px-2 py-1 rounded flex items-center gap-1 ${colorMap[color].pill}`}>
            {value}
            <X className="w-3 h-3 cursor-pointer" onClick={() => onRemove(idx)} />
          </span>
        ))}
      </div>
    </div>
  );
}
