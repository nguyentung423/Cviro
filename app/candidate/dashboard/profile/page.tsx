"use client";

import { useState, useEffect, useRef, ChangeEvent } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { uploadToCloudinary, validateImageFile } from "@/lib/uploadImage";
import { Camera, Save, Loader2, User, ArrowLeft, X } from "lucide-react";

interface CandidateProfile {
  id: string;
  name: string | null;
  age: number | null;
  height: number | null;
  weight: number | null;
  phone: string | null;
  zalo: string | null;
  experience: string | null;
  avatar_url: string | null;
  photo_1: string | null;
  photo_2: string | null;
  photo_3: string | null;
  photo_4: string | null;
}

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [profile, setProfile] = useState<CandidateProfile | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login/candidate");
      return;
    }

    if (status === "authenticated") {
      fetchProfile();
    }
  }, [status, router]);

  const fetchProfile = async () => {
    try {
      const res = await fetch("/api/candidate/profile");
      if (res.ok) {
        const data = await res.json();
        setProfile(data.profile || data);
      }
    } catch (error) {
      console.error("Failed to fetch profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!profile) return;

    setSaving(true);
    try {
      const res = await fetch("/api/candidate/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: profile.name,
          age: profile.age,
          height: profile.height,
          weight: profile.weight,
          phone: profile.phone,
          zalo: profile.zalo,
          experience: profile.experience,
        }),
      });

      if (res.ok) {
        alert("Cập nhật thông tin thành công!");
      } else {
        alert("Có lỗi xảy ra, vui lòng thử lại");
      }
    } catch (error) {
      console.error("Failed to update profile:", error);
      alert("Có lỗi xảy ra, vui lòng thử lại");
    } finally {
      setSaving(false);
    }
  };

  const handleAvatarUpload = async (url: string) => {
    try {
      const res = await fetch("/api/candidate/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ avatar_url: url }),
      });

      if (res.ok) {
        setProfile((prev) => (prev ? { ...prev, avatar_url: url } : null));

        // Dispatch custom event to update header avatar
        window.dispatchEvent(
          new CustomEvent("avatarUpdated", {
            detail: { avatarUrl: url },
          })
        );
      }
    } catch (error) {
      console.error("Failed to upload avatar:", error);
      alert("Ảnh đại diện upload thất bại!");
    }
  };

  const handlePhotoUpload = async (slot: number, url: string) => {
    try {
      const res = await fetch("/api/candidate/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [`photo_${slot}`]: url }),
      });

      if (res.ok) {
        setProfile((prev) =>
          prev ? { ...prev, [`photo_${slot}`]: url } : null
        );
      }
    } catch (error) {
      console.error("Failed to upload photo:", error);
      alert("Ảnh hồ sơ upload thất bại!");
    }
  };

  // Handle native file upload
  const handleFileUpload = async (
    e: ChangeEvent<HTMLInputElement>,
    type: "avatar" | number
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    e.target.value = "";

    const validation = validateImageFile(file);
    if (!validation.valid) {
      alert(validation.error);
      return;
    }

    setUploading(true);
    try {
      const url = await uploadToCloudinary(file);
      if (type === "avatar") {
        await handleAvatarUpload(url);
      } else {
        await handlePhotoUpload(type, url);
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Upload thất bại. Vui lòng thử lại!");
    } finally {
      setUploading(false);
    }
  };

  // Refs for file inputs
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const photoInputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-[#ab3f20]" />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="bg-white rounded-xl p-6">
        <p className="text-gray-600">Không tìm thấy thông tin hồ sơ</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-32">
      {/* Upload Toast */}
      {uploading && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-white rounded-lg shadow-lg border border-gray-200 p-4 min-w-[280px] animate-in slide-in-from-top">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 border-4 border-[#ab3f20] border-t-transparent rounded-full animate-spin shrink-0"></div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">
                Đang tải ảnh lên... 📸
              </p>
              <p className="text-xs text-gray-500">
                Vui lòng đợi trong giây lát
              </p>
            </div>
            <button
              onClick={() => setUploading(false)}
              className="text-gray-400 hover:text-gray-600 transition-colors p-1"
              title="Đóng"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="bg-white/80 backdrop-blur-xl sticky top-0 z-10 border-b border-gray-100">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3 mb-4">
            <button
              onClick={() => router.back()}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors active:scale-95"
            >
              <ArrowLeft className="w-5 h-5 text-gray-700" />
            </button>
            <h1 className="text-2xl font-semibold text-gray-900">Hồ sơ</h1>
          </div>

          {/* Avatar in header */}
          <div className="flex items-center gap-4">
            <div className="relative">
              {profile.avatar_url ? (
                <img
                  src={profile.avatar_url}
                  alt="Avatar"
                  className="w-20 h-20 rounded-full object-cover"
                />
              ) : (
                <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center">
                  <User className="w-10 h-10 text-gray-400" />
                </div>
              )}
              <input
                ref={avatarInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={(e) => handleFileUpload(e, "avatar")}
                className="hidden"
              />
              <button
                onClick={() => avatarInputRef.current?.click()}
                className="absolute bottom-0 right-0 w-7 h-7 bg-[#ab3f20] rounded-full flex items-center justify-center shadow-lg hover:bg-[#8a3219] transition-colors active:scale-95"
              >
                <Camera className="w-4 h-4 text-white" />
              </button>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                {profile.name || "Chưa có tên"}
              </h2>
              <p className="text-sm text-gray-500">
                Cập nhật thông tin của bạn
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-4">
        {/* Basic Info */}
        <div className="bg-white rounded-2xl shadow-sm p-5">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
            Thông tin cơ bản
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Họ và tên
              </label>
              <input
                type="text"
                value={profile.name || ""}
                onChange={(e) =>
                  setProfile({ ...profile, name: e.target.value })
                }
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#ab3f20]/20 focus:border-[#ab3f20] transition-all"
                placeholder="Nhập họ và tên"
              />
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Tuổi
                </label>
                <input
                  type="number"
                  value={profile.age || ""}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      age: parseInt(e.target.value) || 0,
                    })
                  }
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#ab3f20]/20 focus:border-[#ab3f20] transition-all"
                  placeholder="25"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Cao (cm)
                </label>
                <input
                  type="number"
                  value={profile.height || ""}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      height: parseInt(e.target.value) || 0,
                    })
                  }
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#ab3f20]/20 focus:border-[#ab3f20] transition-all"
                  placeholder="170"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Nặng (kg)
                </label>
                <input
                  type="number"
                  value={profile.weight || ""}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      weight: parseInt(e.target.value) || 0,
                    })
                  }
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#ab3f20]/20 focus:border-[#ab3f20] transition-all"
                  placeholder="65"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Số điện thoại
              </label>
              <input
                type="tel"
                value={profile.phone || ""}
                onChange={(e) =>
                  setProfile({ ...profile, phone: e.target.value })
                }
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#ab3f20]/20 focus:border-[#ab3f20] transition-all"
                placeholder="0123456789"
              />
            </div>
          </div>
        </div>

        {/* Experience */}
        <div className="bg-white rounded-2xl shadow-sm p-5">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
            Kinh nghiệm làm việc
          </h3>
          <textarea
            value={profile.experience || ""}
            onChange={(e) =>
              setProfile({ ...profile, experience: e.target.value })
            }
            rows={5}
            className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#ab3f20]/20 focus:border-[#ab3f20] transition-all resize-none"
            placeholder="Mô tả kinh nghiệm làm việc của bạn..."
          />
        </div>

        {/* Photo Gallery */}
        <div className="bg-white rounded-2xl shadow-sm p-5">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
            Album ảnh
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {[1, 2, 3, 4].map((slot, index) => (
              <div key={slot} className="relative aspect-square">
                {profile[`photo_${slot}` as keyof CandidateProfile] ? (
                  <img
                    src={
                      profile[
                        `photo_${slot}` as keyof CandidateProfile
                      ] as string
                    }
                    alt={`Photo ${slot}`}
                    className="w-full h-full object-cover rounded-xl"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 flex items-center justify-center">
                    <Camera className="w-7 h-7 text-gray-300" />
                  </div>
                )}
                <input
                  ref={photoInputRefs[index]}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={(e) => handleFileUpload(e, slot)}
                  className="hidden"
                />
                <button
                  onClick={() => photoInputRefs[index].current?.click()}
                  className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 active:opacity-100 transition-opacity rounded-xl flex items-center justify-center"
                >
                  <Camera className="w-6 h-6 text-white" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Fixed Bottom Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-gray-100 safe-area-inset-bottom z-50">
        <div className="max-w-2xl mx-auto px-4 py-3">
          <button
            onClick={handleSave}
            disabled={saving}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-[#ab3f20] text-white rounded-xl text-sm font-medium hover:bg-[#8a3219] transition-all disabled:opacity-50 active:scale-[0.98]"
          >
            {saving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Đang lưu...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Lưu
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
