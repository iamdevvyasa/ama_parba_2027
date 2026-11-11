create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  razorpay_order_id text unique not null,
  razorpay_payment_id text unique,
  product text not null check (product in ('standard', 'customised')),
  quantity integer not null check (quantity between 1 and 50),
  amount_paise integer not null check (amount_paise > 0),
  customer_name text not null,
  customer_email text not null,
  customer_phone text not null,
  address_line1 text not null,
  address_line2 text not null default '',
  city text not null,
  state text not null,
  postal_code text not null,
  status text not null default 'pending'
    check (status in ('pending', 'paid', 'cancelled', 'fulfilled')),
  created_at timestamptz not null default now(),
  paid_at timestamptz,
  updated_at timestamptz not null default now()
);

create index if not exists orders_status_created_at_idx
  on public.orders (status, created_at desc);

alter table public.orders enable row level security;

create table if not exists public.payment_events (
  id uuid primary key default gen_random_uuid(),
  event_id text unique not null,
  event_type text not null,
  received_at timestamptz not null default now()
);

alter table public.payment_events enable row level security;
