"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef, ChangeEvent } from "react";
import { ArrowLeft, Upload, X, Loader2 } from "lucide-react";
import { uploadToCloudinary, validateImageFile } from "@/lib/uploadImage";

interface ProfileData {
  name: string;
  age: string;
  height: string;
  weight: string;
  phone: string;
  zalo: string;
  experience: string;
  avatar_url: string;
  photo_1: string;
  photo_2: string;
  photo_3: string;
  photo_4: string;
}

export default function CandidateProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState<ProfileData>({
    name: "",
    age: "",
    height: "",
    weight: "",
    phone: "",
    zalo: "",
    experience: "",
    avatar_url: "",
    photo_1: "",
    photo_2: "",
    photo_3: "",
    photo_4: "",
  });

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login/candidate");
      return;
    }

    if (status === "authenticated" && session?.user?.email) {
      loadProfile();
    }
  }, [status, session, router]);

  const loadProfile = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/candidate/profile", {
        method: "GET",
      });

      if (res.ok) {
        const data = await res.json();
        if (data) {
          setFormData({
            name: data.name || "",
            age: data.age || "",
            height: data.height || "",
            weight: data.weight || "",
            phone: data.phone || "",
            zalo: data.zalo || "",
            experience: data.experience || "",
            avatar_url: data.avatar_url || "",
            photo_1: data.photo_1 || "",
            photo_2: data.photo_2 || "",
            photo_3: data.photo_3 || "",
            photo_4: data.photo_4 || "",
          });
        }
      }
    } catch (error) {
      console.error("Load profile error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const res = await fetch("/api/candidate/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: session?.user?.email,
          ...formData,
          age: formData.age ? Number(formData.age) : null,
          height: formData.height ? Number(formData.height) : null,
          weight: formData.weight ? Number(formData.weight) : null,
        }),
      });

      if (res.ok) {
        alert("Lưu thông tin thành công!");
        router.push("/candidate/dashboard");
      } else {
        const data = await res.json();
        alert(data.error || "Có lỗi xảy ra");
      }
    } catch (error) {
      console.error("Save error:", error);
      alert("Lỗi kết nối");
    } finally {
      setSaving(false);
    }
  };

  const handleUpload = async (
    e: ChangeEvent<HTMLInputElement>,
    field: keyof ProfileData
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Reset input
    e.target.value = "";

    // Validate
    const validation = validateImageFile(file);
    if (!validation.valid) {
      alert(validation.error);
      return;
    }

    setUploading(true);

    try {
      const url = await uploadToCloudinary(file);
      setFormData((prev) => ({
        ...prev,
        [field]: url,
      }));
    } catch (error) {
      console.error("Upload error:", error);
      alert("Upload thất bại. Vui lòng thử lại!");
    } finally {
      setUploading(false);
    }
  };

  // Refs for file inputs
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const photoInputRefs = {
    photo_1: useRef<HTMLInputElement>(null),
    photo_2: useRef<HTMLInputElement>(null),
    photo_3: useRef<HTMLInputElement>(null),
    photo_4: useRef<HTMLInputElement>(null),
  };

  const removePhoto = (field: keyof ProfileData) => {
    setFormData((prev) => ({
      ...prev,
      [field]: "",
    }));
  };

  if (loading || status === "loading") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#ab3f20] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Upload Toast */}
      {uploading && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-white rounded-lg shadow-lg border border-gray-200 p-4 min-w-[280px] animate-in slide-in-from-top">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 border-4 border-[#ab3f20] border-t-transparent rounded-full animate-spin flex-shrink-0"></div>
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
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Quay lại</span>
            </button>
            <h1 className="text-lg font-semibold text-gray-900">
              Hồ sơ cá nhân
            </h1>
            <div className="w-20"></div>
          </div>
        </div>
      </header>

      {/* Form */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSave} className="space-y-6">
          {/* Avatar */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Ảnh đại diện
            </h2>
            <div className="flex items-center gap-6">
              {formData.avatar_url ? (
                <div className="relative">
                  <img
                    src={formData.avatar_url}
                    alt="Avatar"
                    className="w-24 h-24 rounded-full object-cover border-2 border-gray-200"
                  />
                  <button
                    type="button"
                    onClick={() => removePhoto("avatar_url")}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
                  <Upload className="w-8 h-8 text-gray-400" />
                </div>
              )}
              <div>
                <input
                  ref={avatarInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={(e) => handleUpload(e, "avatar_url")}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => avatarInputRef.current?.click()}
                  className="px-4 py-2 bg-[#ab3f20] text-white rounded-lg hover:bg-[#8b2f15] transition-colors"
                >
                  Tải ảnh lên
                </button>
              </div>
            </div>
          </div>

          {/* Basic Info */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Thông tin cơ bản
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Họ và tên
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ab3f20] focus:border-transparent text-gray-900"
                  placeholder="Nguyễn Văn A"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tuổi
                  </label>
                  <input
                    type="text"
                    value={formData.age}
                    onChange={(e) =>
                      setFormData({ ...formData, age: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ab3f20] focus:border-transparent text-gray-900"
                    placeholder="25"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cao (cm)
                  </label>
                  <input
                    type="text"
                    value={formData.height}
                    onChange={(e) =>
                      setFormData({ ...formData, height: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ab3f20] focus:border-transparent text-gray-900"
                    placeholder="170"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nặng (kg)
                  </label>
                  <input
                    type="text"
                    value={formData.weight}
                    onChange={(e) =>
                      setFormData({ ...formData, weight: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ab3f20] focus:border-transparent text-gray-900"
                    placeholder="60"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Số Zalo
                </label>
                <input
                  type="text"
                  inputMode="numeric"
                  value={formData.zalo}
                  onChange={(e) =>
                    setFormData({ ...formData, zalo: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ab3f20] focus:border-transparent text-gray-900"
                  placeholder="0901234567"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Kinh nghiệm làm việc
                </label>
                <textarea
                  value={formData.experience}
                  onChange={(e) =>
                    setFormData({ ...formData, experience: e.target.value })
                  }
                  rows={5}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ab3f20] focus:border-transparent resize-none text-gray-900"
                  placeholder="Mô tả kinh nghiệm làm việc của bạn..."
                />
              </div>
            </div>
          </div>

          {/* Photos */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Ảnh hồ sơ (tối đa 4 ảnh)
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {(["photo_1", "photo_2", "photo_3", "photo_4"] as const).map(
                (field, idx) => (
                  <div key={field}>
                    {formData[field] ? (
                      <div className="relative aspect-3/4 rounded-lg overflow-hidden border-2 border-gray-200">
                        <img
                          src={formData[field]}
                          alt={`Photo ${idx + 1}`}
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => removePhoto(field)}
                          className="absolute top-2 right-2 w-7 h-7 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <div>
                        <input
                          ref={photoInputRefs[field]}
                          type="file"
                          accept="image/jpeg,image/png,image/webp"
                          onChange={(e) => handleUpload(e, field)}
                          className="hidden"
                        />
                        <button
                          type="button"
                          onClick={() => photoInputRefs[field].current?.click()}
                          className="w-full aspect-3/4 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center gap-2 hover:border-[#ab3f20] hover:bg-gray-50 transition-colors"
                        >
                          <Upload className="w-8 h-8 text-gray-400" />
                          <span className="text-sm text-gray-500">
                            Ảnh {idx + 1}
                          </span>
                        </button>
                      </div>
                    )}
                  </div>
                )
              )}
            </div>
          </div>

          {/* Submit */}
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex-1 px-6 py-3 bg-[#ab3f20] text-white rounded-lg hover:bg-[#8b2f15] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {saving ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Đang lưu...
                </>
              ) : (
                "Lưu thông tin"
              )}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
