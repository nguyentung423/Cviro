-- Tạo bảng rate_limits để lưu trữ rate limiting data
-- Sử dụng sliding window algorithm

CREATE TABLE IF NOT EXISTS rate_limits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index cho việc query nhanh theo key và time
CREATE INDEX IF NOT EXISTS idx_rate_limits_key_created ON rate_limits(key, created_at);

-- Index cho việc cleanup expired entries
CREATE INDEX IF NOT EXISTS idx_rate_limits_created_at ON rate_limits(created_at);

-- RLS: Chỉ service role mới có thể truy cập
ALTER TABLE rate_limits ENABLE ROW LEVEL SECURITY;

-- Function để tự động cleanup entries cũ hơn 24 giờ
-- Chạy định kỳ bằng pg_cron hoặc external scheduler
CREATE OR REPLACE FUNCTION cleanup_old_rate_limits()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  DELETE FROM rate_limits WHERE created_at < NOW() - INTERVAL '24 hours';
END;
$$;

-- Optional: Tạo cron job để cleanup mỗi giờ (nếu có pg_cron extension)
-- SELECT cron.schedule('cleanup-rate-limits', '0 * * * *', 'SELECT cleanup_old_rate_limits()');

COMMENT ON TABLE rate_limits IS 'Rate limiting data for API endpoints - sliding window algorithm';
