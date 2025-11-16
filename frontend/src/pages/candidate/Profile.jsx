import { useState } from "react";
import {
  User,
  MapPin,
  Phone,
  Mail,
  Camera,
  Upload,
  X,
  Edit2,
  Save,
  Plus,
  Image,
} from "lucide-react";
import { mockCandidate } from "../../data/mockData";

export default function CandidateProfile() {
  const [profile, setProfile] = useState({
    fullName: mockCandidate.fullName,
    email: mockCandidate.email,
    phone: mockCandidate.phone,
    location: mockCandidate.location,
    bio: mockCandidate.bio,
    skills: mockCandidate.skills,
    avatarUrl: mockCandidate.avatarUrl,
  });
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [isEditingSkills, setIsEditingSkills] = useState(false);
  const [editBio, setEditBio] = useState(mockCandidate.bio);
  const [editSkills, setEditSkills] = useState(mockCandidate.skills);
  const [portfolioImages, setPortfolioImages] = useState(mockCandidate.portfolio);
  const [uploadError, setUploadError] = useState(null);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [uploadingPortfolio, setUploadingPortfolio] = useState(false);

  const handleAvatarUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setUploadError("Vui lòng chọn ảnh hợp lệ.");
      return;
    }
    setUploadError(null);
    setUploadingAvatar(true);
    const url = URL.createObjectURL(file);
    setTimeout(() => {
      setProfile((prev) => ({ ...prev, avatarUrl: url }));
      setUploadingAvatar(false);
    }, 400);
  };

  const removeAvatar = () => {
    setProfile((prev) => ({ ...prev, avatarUrl: null }));
  };

  const handlePortfolioUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setUploadError("Vui lòng chọn ảnh hợp lệ.");
      return;
    }
    if (portfolioImages.length >= 4) {
      setUploadError("Chỉ lưu tối đa 4 hình.");
      return;
    }
    setUploadError(null);
    setUploadingPortfolio(true);
    const url = URL.createObjectURL(file);
    setTimeout(() => {
      setPortfolioImages((prev) => [...prev, url]);
      setUploadingPortfolio(false);
    }, 400);
  };

  const removePortfolioImage = (imageUrl) => {
    setPortfolioImages((prev) => prev.filter((img) => img !== imageUrl));
  };

  const saveBio = () => {
    setProfile((prev) => ({ ...prev, bio: editBio }));
    setIsEditingBio(false);
  };

  const saveSkills = () => {
    setProfile((prev) => ({ ...prev, skills: editSkills }));
    setIsEditingSkills(false);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-sm border border-slate-200 p-6 space-y-6">
      <div className="flex items-center gap-4">
        <div className="relative">
          <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center overflow-hidden border-2 border-orange-200">
            {profile.avatarUrl ? (
              <img src={profile.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
            ) : (
              <User className="w-8 h-8 text-orange-600" />
            )}
          </div>
          <div className="absolute -bottom-1 -right-1">
            <label className="w-6 h-6 bg-orange-500 hover:bg-orange-600 rounded-full flex items-center justify-center cursor-pointer transition-colors">
              <Camera className="w-3 h-3 text-white" />
              <input type="file" accept="image/*" onChange={handleAvatarUpload} className="hidden" />
            </label>
          </div>
          {profile.avatarUrl && (
            <button
              onClick={removeAvatar}
              className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center transition-colors"
            >
              <X className="w-3 h-3 text-white" />
            </button>
          )}
        </div>

        <div className="flex-1">
          <h1 className="text-xl font-bold text-slate-800">{profile.fullName}</h1>
          <p className="text-slate-500">{mockCandidate.role}</p>

          {(uploadingAvatar || uploadingPortfolio) && (
            <p className="text-orange-600 text-sm mt-1 flex items-center gap-1">
              <Upload className="w-3 h-3 animate-pulse" />
              Đang xử lý ảnh...
            </p>
          )}

          {uploadError && <p className="text-red-500 text-sm mt-1">{uploadError}</p>}
        </div>
      </div>

      <div className="space-y-2 text-slate-700">
        <p className="flex items-center gap-2">
          <Mail className="w-4 h-4 text-slate-400" />
          {profile.email}
        </p>
        <p className="flex items-center gap-2">
          <Phone className="w-4 h-4 text-slate-400" />
          {profile.phone}
        </p>
        <p className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-slate-400" />
          {profile.location}
        </p>
      </div>

      <Section
        title="Giới thiệu"
        isEditing={isEditingBio}
        onEdit={() => setIsEditingBio(true)}
        onCancel={() => {
          setIsEditingBio(false);
          setEditBio(profile.bio);
        }}
        onSave={saveBio}
        content={
          isEditingBio ? (
            <textarea
              value={editBio}
              onChange={(e) => setEditBio(e.target.value)}
              className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
              rows="4"
            />
          ) : (
            <p className="text-slate-600">{profile.bio || "Chưa có mô tả."}</p>
          )
        }
      />

      <Section
        title="Kỹ năng"
        isEditing={isEditingSkills}
        onEdit={() => setIsEditingSkills(true)}
        onCancel={() => {
          setIsEditingSkills(false);
          setEditSkills(profile.skills);
        }}
        onSave={saveSkills}
        content={
          isEditingSkills ? (
            <div className="space-y-2">
              <input
                value={editSkills}
                onChange={(e) => setEditSkills(e.target.value)}
                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="Nhập kỹ năng, ngăn cách bằng dấu phẩy"
              />
              <p className="text-sm text-slate-500">Ví dụ: Giao tiếp, MC cơ bản, Photoshop</p>
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              {profile.skills
                ?.split(",")
                .map((skill) => skill.trim())
                .filter(Boolean)
                .map((skill) => (
                  <span key={skill} className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
            </div>
          )
        }
      />

      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-slate-800">Portfolio</h2>
          <p className="text-sm text-slate-500">{portfolioImages.length}/4 ảnh</p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {portfolioImages.map((imageUrl, index) => (
            <div
              key={`${imageUrl}-${index}`}
              className="relative aspect-square rounded-lg overflow-hidden border border-slate-200 group"
            >
              <img src={imageUrl} alt={`Portfolio ${index + 1}`} className="w-full h-full object-cover" />
              <button
                onClick={() => removePortfolioImage(imageUrl)}
                className="absolute top-1 right-1 w-6 h-6 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-3 h-3 text-white" />
              </button>
            </div>
          ))}

          {portfolioImages.length < 4 && (
            <label className="aspect-square border-2 border-dashed border-orange-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-orange-400 hover:bg-orange-50 transition-colors">
              <Plus className="w-8 h-8 text-orange-400 mb-1" />
              <Image className="w-4 h-4 text-orange-400 mb-1" />
              <span className="text-xs text-orange-600">Thêm ảnh</span>
              <input type="file" accept="image/*" onChange={handlePortfolioUpload} className="hidden" />
            </label>
          )}
        </div>

        {portfolioImages.length === 0 && (
          <p className="text-slate-500 text-center py-8">Chưa có ảnh portfolio</p>
        )}
      </div>
    </div>
  );
}

function Section({ title, isEditing, onEdit, onSave, onCancel, content }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <h2 className="font-semibold text-slate-800">{title}</h2>
        {!isEditing ? (
          <button onClick={onEdit} className="p-1 hover:bg-slate-100 rounded-md transition-colors">
            <Edit2 className="w-4 h-4 text-slate-500" />
          </button>
        ) : (
          <div className="flex gap-1">
            <button onClick={onSave} className="p-1 hover:bg-green-100 rounded-md transition-colors">
              <Save className="w-4 h-4 text-green-600" />
            </button>
            <button onClick={onCancel} className="p-1 hover:bg-red-100 rounded-md transition-colors">
              <X className="w-4 h-4 text-red-600" />
            </button>
          </div>
        )}
      </div>
      {content}
    </div>
  );
}
