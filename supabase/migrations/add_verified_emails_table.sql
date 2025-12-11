-- Tạo bảng verified_emails để lưu trạng thái xác thực email
-- Table này dùng để ngăn chặn việc tạo account mà không verify email

CREATE TABLE IF NOT EXISTS verified_emails (
  email TEXT PRIMARY KEY,
  verified_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  expires_at TIMESTAMPTZ NOT NULL
);

-- Tạo index cho việc cleanup expired records
CREATE INDEX IF NOT EXISTS idx_verified_emails_expires_at ON verified_emails(expires_at);

-- RLS: Chỉ cho phép service role truy cập
ALTER TABLE verified_emails ENABLE ROW LEVEL SECURITY;

-- Không tạo policy cho users thường - chỉ service role mới có thể truy cập

-- Optional: Function để tự động cleanup expired records
CREATE OR REPLACE FUNCTION cleanup_expired_verifications()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  DELETE FROM verified_emails WHERE expires_at < NOW();
END;
$$;

-- COMMENT: Chạy migration này trong Supabase SQL Editor
