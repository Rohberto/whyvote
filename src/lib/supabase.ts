import { createClient } from "@supabase/supabase-js";

/**
 * Server-side Supabase client for whyvote's own project.
 * Uses the secret key: never import this from a Client Component.
 */
function connect(url: string, key: string) {
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

let client: ReturnType<typeof connect> | null = null;

/** Returns null when the Supabase environment variables are not set. */
export function supabase() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SECRET_KEY;
  if (!url || !key) return null;
  client ??= connect(url, key);
  return client;
}
