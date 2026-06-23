alter table if exists analytics.ai_stage_cache
  add column if not exists cache_key text,
  add column if not exists source_fingerprint text,
  add column if not exists input_hash text,
  add column if not exists latest_run_id uuid;

create table if not exists analytics.ai_stage_runs (
  id uuid primary key default gen_random_uuid(),
  cache_key text not null,
  stage_name text not null check (
    stage_name in (
      'indicator_narrative',
      'province_plan_context',
      'national_plan_context',
      'web_context_search',
      'plan_alignment',
      'swot_analysis',
      'investment_recommendations'
    )
  ),
  country_code text not null default 'NPL',
  release_key text not null,
  year integer not null,
  municipality_id text not null,
  province text not null,
  score_id text not null,
  model_name text not null,
  model_settings jsonb not null default '{}'::jsonb,
  prompt_version text not null,
  invalidation_version text not null default 'v1',
  source_fingerprint text not null,
  input_hash text not null,
  prompt_hash text not null,
  status text not null default 'running' check (status in ('running', 'completed', 'failed')),
  rendered_output text,
  structured_output jsonb not null default '{}'::jsonb,
  source_references jsonb not null default '[]'::jsonb,
  error_message text,
  token_usage jsonb not null default '{}'::jsonb,
  estimated_cost_usd numeric(12,6),
  started_at timestamptz not null default now(),
  completed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists ai_stage_runs_cache_key_idx
  on analytics.ai_stage_runs (cache_key, status, updated_at desc);

create index if not exists ai_stage_runs_scope_idx
  on analytics.ai_stage_runs (
    country_code,
    stage_name,
    release_key,
    year,
    municipality_id,
    score_id,
    updated_at desc
  );

drop trigger if exists touch_ai_stage_runs_updated_at on analytics.ai_stage_runs;
create trigger touch_ai_stage_runs_updated_at
before update on analytics.ai_stage_runs
for each row
execute function analytics.touch_ai_updated_at();

grant all privileges on analytics.ai_stage_runs to service_role;
