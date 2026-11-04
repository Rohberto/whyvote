-- Run once in the Supabase SQL editor (whyvote project) to support email unsubscribes.
alter table public.pledges add column if not exists unsubscribed_at timestamptz;
