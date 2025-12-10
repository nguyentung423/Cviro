"use client";

import { Upload, X } from "lucide-react";
import { CldUploadWidget } from "next-cloudinary";

interface PhotoGalleryProps {
  photos: {
    photo_1: string | null;
    photo_2: string | null;
    photo_3: string | null;
    photo_4: string | null;
  };
  onPhotoUpload?: (
    slot: "photo_1" | "photo_2" | "photo_3" | "photo_4",
    url: string
  ) => void;
  onPhotoRemove?: (slot: "photo_1" | "photo_2" | "photo_3" | "photo_4") => void;
  editable?: boolean;
}

export default function PhotoGallery({
  photos,
  onPhotoUpload,
  onPhotoRemove,
  editable = false,
}: PhotoGalleryProps) {
  const photoSlots: Array<"photo_1" | "photo_2" | "photo_3" | "photo_4"> = [
    "photo_1",
    "photo_2",
    "photo_3",
    "photo_4",
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Thư viện ảnh</h3>

      <div className="grid grid-cols-2 gap-4">
        {photoSlots.map((slot, index) => {
          const photoUrl = photos[slot];

          if (photoUrl) {
            return (
              <div
                key={slot}
                className="relative aspect-[3/4] rounded-lg overflow-hidden border-2 border-gray-200 group"
              >
                <img
                  src={photoUrl}
                  alt={`Photo ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                {editable && onPhotoRemove && (
                  <button
                    type="button"
                    onClick={() => onPhotoRemove(slot)}
                    className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
            );
          }

          if (editable && onPhotoUpload) {
            return (
              <CldUploadWidget
                key={slot}
                uploadPreset="cviro_preset"
                onSuccess={(result: any) => {
                  if (result?.event === "success" && result?.info?.secure_url) {
                    onPhotoUpload(slot, result.info.secure_url);
                  }
                }}
              >
                {({ open }) => (
                  <button
                    type="button"
                    onClick={() => open()}
                    className="aspect-[3/4] border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center gap-2 hover:border-[#ab3f20] hover:bg-gray-50 transition-colors"
                  >
                    <Upload className="w-8 h-8 text-gray-400" />
                    <span className="text-sm text-gray-500">
                      Ảnh {index + 1}
                    </span>
                  </button>
                )}
              </CldUploadWidget>
            );
          }

          return (
            <div
              key={slot}
              className="aspect-[3/4] border-2 border-dashed border-gray-200 rounded-lg flex items-center justify-center bg-gray-50"
            >
              <span className="text-sm text-gray-400">Chưa có ảnh</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
