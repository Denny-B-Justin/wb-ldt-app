import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("v1.5 migration creates an append-only AI stage run store", async () => {
  const migration = await readFile(
    "supabase/migrations/0012_ai_run_store.sql",
    "utf8",
  );

  assert.match(migration, /create table if not exists analytics\.ai_stage_runs/i);
  assert.match(migration, /cache_key text not null/i);
  assert.match(migration, /source_fingerprint text not null/i);
  assert.match(migration, /input_hash text not null/i);
  assert.match(migration, /prompt_hash text not null/i);
  assert.match(migration, /model_settings jsonb not null/i);
  assert.match(migration, /status text not null/i);
  assert.match(migration, /running/i);
  assert.match(migration, /completed/i);
  assert.match(migration, /failed/i);
  assert.match(migration, /latest_run_id uuid/i);
  assert.match(migration, /cache_key_idx/i);
  assert.match(migration, /comment on table analytics\.ai_stage_runs/i);
  assert.match(migration, /revoke all privileges on analytics\.ai_stage_runs from anon, authenticated/i);
  assert.match(migration, /grant all privileges on analytics\.ai_stage_runs to service_role/i);
});
