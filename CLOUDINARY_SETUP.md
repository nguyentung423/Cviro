# Setup Cloudinary cho Upload Ảnh

## 1. Tạo tài khoản Cloudinary (miễn phí)

- Truy cập: https://cloudinary.com/users/register/free
- Đăng ký tài khoản miễn phí
- Xác thực email

## 2. Lấy Cloud Name

- Đăng nhập vào Dashboard: https://console.cloudinary.com/
- Tìm **Cloud Name** (ví dụ: `dxyz123abc`)
- Copy và paste vào `.env.local`:
  ```
  NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=dxyz123abc
  ```

## 3. Tạo Upload Preset

1. Vào **Settings** → **Upload**
2. Scroll xuống **Upload presets**
3. Click **Add upload preset**
4. Điền:
   - **Preset name**: `cviro_preset`
   - **Signing Mode**: **Unsigned** (quan trọng!)
   - **Folder**: `cviro/profiles` (tùy chọn)
   - **Allowed formats**: `jpg, png, jpeg, webp`
   - **Max file size**: `5MB` (hoặc tùy ý)
5. Click **Save**

## 4. Update .env.local

Mở `.env.local` và thay thế:

```env
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name  # Thay bằng Cloud Name thật
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=cviro_preset  # Giữ nguyên nếu đã tạo preset này
```

## 5. Restart Dev Server

```bash
# Dừng server (Ctrl+C)
npm run dev
```

## 6. Test Upload

1. Vào `/candidate/profile`
2. Click "Tải ảnh lên"
3. Chọn ảnh từ máy tính
4. Xem ảnh hiển thị sau khi upload thành công

## Troubleshooting

- Nếu lỗi "Upload preset not found": Check tên preset phải đúng `cviro_preset`
- Nếu lỗi "Unsigned uploads not allowed": Đảm bảo **Signing Mode = Unsigned**
- Nếu không upload được: Check Cloud Name đã đúng chưa
