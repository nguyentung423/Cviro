-- Bật extension UUID (nếu chưa có)
create extension if not exists "uuid-ossp";

-- 1) Bảng OTP (cho mã 6 số qua email)
create table public.otps (
  id         uuid primary key default uuid_generate_v4(),
  email      text not null,
  code       text not null,
  expires_at timestamptz not null,
  attempts   int not null default 0,
  created_at timestamptz not null default now()
);
create unique index otps_email_uniq on public.otps (email);
create index otps_expires_at_idx on public.otps (expires_at);

-- 2) Bảng Agencies
create table public.agencies (
  id          uuid primary key default uuid_generate_v4(),
  email       text not null unique,
  name        text,              -- tên người đại diện
  agency_name text,              -- tên công ty/agency
  phone       text,
  zalo        text,
  avatar_url  text,              -- ✅ THÊM: URL ảnh đại diện
  bio         text,              -- ✅ THÊM: Giới thiệu agency
  website     text,              -- ✅ THÊM: Website công ty
  banned      boolean not null default false,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()  -- ✅ THÊM: Tracking cập nhật
);

-- 3) Bảng Candidates
create table public.candidates (
  id          uuid primary key default uuid_generate_v4(),
  email       text not null unique,
  name        text,              -- Tên
  age         int,               -- Tuổi
  height      int,               -- Chiều cao (cm)
  weight      int,               -- Cân nặng (kg)
  phone       text,
  zalo        text,
  avatar_url  text,              -- Ảnh đại diện chính
  photo_1     text,              -- Ảnh 1
  photo_2     text,              -- Ảnh 2
  photo_3     text,              -- Ảnh 3
  photo_4     text,              -- Ảnh 4
  experience  text,              -- Kinh nghiệm làm việc (mô tả)
  banned      boolean not null default false,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- 4) Bảng Jobs (đơn giản, thuộc agency)
create table public.jobs (
  id           uuid primary key default uuid_generate_v4(),
  agency_id    uuid not null references public.agencies(id) on delete cascade,
  title        text not null,
  description  text,
  location     text,
  pay          text,
  start_time   timestamptz,
  end_time     timestamptz,
  slots        int default 1,    -- Số lượng cần tuyển
  published    boolean not null default true,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);
create index jobs_agency_id_idx on public.jobs (agency_id);
create index jobs_published_idx on public.jobs (published);
create index jobs_created_at_idx on public.jobs (created_at desc);

-- 5) Bảng Applications (ứng tuyển job)
create table public.applications (
  id             uuid primary key default uuid_generate_v4(),
  job_id         uuid not null references public.jobs(id) on delete cascade,
  candidate_id   uuid not null references public.candidates(id) on delete cascade,
  status         text not null default 'pending', -- pending | approved | rejected | withdrawn
  note           text,
  message        text,          -- ✅ THÊM: Lời nhắn của candidate khi apply
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()  -- ✅ THÊM: Tracking cập nhật
);
create unique index applications_job_candidate_uniq on public.applications (job_id, candidate_id);
create index applications_status_idx on public.applications (status);
create index applications_candidate_id_idx on public.applications (candidate_id);  -- ✅ THÊM: Index cho candidate



-- ✅ THÊM: Function auto-update updated_at
create or replace function public.update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- ✅ THÊM: Triggers cho auto-update
create trigger agencies_updated_at before update on public.agencies
  for each row execute function public.update_updated_at();

create trigger candidates_updated_at before update on public.candidates
  for each row execute function public.update_updated_at();

create trigger jobs_updated_at before update on public.jobs
  for each row execute function public.update_updated_at();

create trigger applications_updated_at before update on public.applications
  for each row execute function public.update_updated_at();

-- (Tuỳ chọn) RLS: Bật sau khi test xong
-- alter table public.otps enable row level security;
-- alter table public.agencies enable row level security;
-- alter table public.candidates enable row level security;
-- alter table public.jobs enable row level security;
-- alter table public.applications enable row level security;

-- Cleanup OTP cũ (chạy định kỳ hoặc qua cron)
-- delete from public.otps where expires_at < now();
