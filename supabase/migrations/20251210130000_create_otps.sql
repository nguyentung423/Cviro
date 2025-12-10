-- Create OTP table for email verification
CREATE TABLE IF NOT EXISTS otps (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT NOT NULL,
  code TEXT NOT NULL,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  attempts INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Create unique index on email (one OTP per email at a time)
CREATE UNIQUE INDEX IF NOT EXISTS otps_email_uniq ON otps(email);

-- Create index for cleanup queries
CREATE INDEX IF NOT EXISTS otps_expires_at_idx ON otps(expires_at);

-- Enable RLS (Row Level Security)
ALTER TABLE otps ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Allow insert for anyone (for signup)
CREATE POLICY "Anyone can insert OTP"
  ON otps FOR INSERT
  WITH CHECK (true);

-- RLS Policy: Allow select for anyone (for verification)
CREATE POLICY "Anyone can read OTP"
  ON otps FOR SELECT
  USING (true);

-- RLS Policy: Allow update for anyone (for attempt tracking)
CREATE POLICY "Anyone can update OTP"
  ON otps FOR UPDATE
  USING (true);

-- RLS Policy: Allow delete for cleanup
CREATE POLICY "Anyone can delete OTP"
  ON otps FOR DELETE
  USING (true);
