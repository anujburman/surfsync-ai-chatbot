create extension if not exists pgcrypto;
create table if not exists public.leads (
 id uuid primary key default gen_random_uuid(), created_at timestamptz not null default now(),
 name text not null check (char_length(name) between 2 and 80), email text not null,
 phone text not null, service text not null, description text not null,
 budget text, timeline text, consent boolean not null check (consent = true), source text not null default 'website_chatbot'
);
alter table public.leads enable row level security;
-- No public policy is intentionally created. Only the server-side service role can write/read.
create index if not exists leads_created_at_idx on public.leads(created_at desc);
