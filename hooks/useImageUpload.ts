"use client";

import { useRef, useState, ChangeEvent } from "react";
import { uploadToCloudinary, validateImageFile } from "@/lib/uploadImage";

interface UseImageUploadOptions {
  onSuccess?: (url: string) => void;
  onError?: (error: string) => void;
}

export function useImageUpload(options: UseImageUploadOptions = {}) {
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const openFilePicker = () => {
    inputRef.current?.click();
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Reset input để có thể chọn lại cùng file
    e.target.value = "";

    // Validate
    const validation = validateImageFile(file);
    if (!validation.valid) {
      options.onError?.(validation.error || "File không hợp lệ");
      return;
    }

    setUploading(true);

    try {
      const url = await uploadToCloudinary(file);
      options.onSuccess?.(url);
    } catch (error) {
      console.error("Upload error:", error);
      options.onError?.(
        error instanceof Error ? error.message : "Upload thất bại"
      );
    } finally {
      setUploading(false);
    }
  };

  return {
    uploading,
    openFilePicker,
    inputRef,
    handleFileChange,
  };
}
