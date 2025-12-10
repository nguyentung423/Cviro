"use client";

import { useState } from "react";
import Image from "next/image";
import { User, X } from "lucide-react";

interface PhotoGalleryProps {
  photos: {
    photo_1?: string;
    photo_2?: string;
    photo_3?: string;
    photo_4?: string;
  };
}

export default function PhotoGallery({ photos }: PhotoGalleryProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  return (
    <>
      <div className="grid grid-cols-2 gap-3">
        {[1, 2, 3, 4].map((slot) => {
          const photoUrl = photos[`photo_${slot}` as keyof typeof photos];
          return (
            <div key={slot} className="relative aspect-square">
              {photoUrl ? (
                <button
                  onClick={() => setSelectedPhoto(photoUrl)}
                  className="w-full h-full block"
                >
                  <Image
                    src={photoUrl}
                    alt={`Photo ${slot}`}
                    width={300}
                    height={300}
                    className="w-full h-full object-cover rounded-xl hover:opacity-90 transition-opacity cursor-pointer"
                  />
                </button>
              ) : (
                <div className="w-full h-full bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 flex items-center justify-center">
                  <User className="w-7 h-7 text-gray-300" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Modal */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <button
            onClick={() => setSelectedPhoto(null)}
            className="absolute top-4 right-4 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="relative max-w-4xl max-h-[90vh] w-full h-full flex items-center justify-center">
            <Image
              src={selectedPhoto}
              alt="Photo"
              width={1200}
              height={1600}
              className="max-w-full max-h-full object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </>
  );
}
