# LDT Version Branching and Environment Setup

**Purpose:** Define how LDT version branches should be created and used with Vercel preview/custom environments.
**Date:** 2026-06-23.
**Source model:** `main` remains production, `dev` remains shared integration/preview, and long-lived future-version branches are created only when they need persistent version work or QA.

---

## Branch Roles

| Branch | Role | Vercel behavior |
| --- | --- | --- |
| `main` | Production branch only. | Vercel Production. |
| `dev` | Shared integration branch for reviewed work. | Vercel Preview / integration. |
| `v1.5` | v1.5 Product Hardening and Trust Foundation. | Preview branch, optional custom environment if a persistent QA URL is needed. |
| `v1.6` | v1.6 work built on top of v1.5. | Preview branch, optional custom environment if a persistent QA URL is needed. |
| `v1.7` | v1.7 work built on top of v1.6. | Preview branch, optional custom environment if a persistent QA URL is needed. |
| `v1.8` | v1.8 work built on top of v1.7. | Preview branch, optional custom environment if a persistent QA URL is needed. |
| `v1.9` | v1.9 work built on top of v1.8. | Preview branch, optional custom environment if a persistent QA URL is needed. |
| `v2` | MEGA migration work built on top of v1.9. | Recommended custom environment when migration QA needs persistent URL/env vars. |

---

## Version Branch Chain

The version branches are intentionally stacked:

```txt
main
  production only

dev
  shared integration / default preview

v1.5
  branches from dev

v1.6
  branches from v1.5

v1.7
  branches from v1.6

v1.8
  branches from v1.7

v1.9
  branches from v1.8

v2
  branches from v1.9
```

This means v1.6 work can proceed separately, but it should still inherit v1.5 changes. The same logic applies to v1.7 through v2.

When the prior version branch changes, update the next branch before continuing:

```bash
git checkout v1.6
git fetch origin
git merge origin/v1.5
```

For a cleaner history, use rebase only when the branch is not shared or after coordinating with collaborators:

```bash
git checkout v1.6
git fetch origin
git rebase origin/v1.5
```

---

## PR Targeting

Use stacked PR targets for version work:

| Work branch | PR target |
| --- | --- |
| `v1.5` | `dev` |
| `v1.6` | `v1.5` |
| `v1.7` | `v1.6` |
| `v1.8` | `v1.7` |
| `v1.9` | `v1.8` |
| `v2` | `v1.9` |

Short-lived feature branches should target the relevant version branch:

```txt
feature/v1.5-ai-cache-run-store -> v1.5
feature/v1.6-ai-audit-drawer    -> v1.6
feature/v1.8-scenario-studio    -> v1.8
feature/v2-mega-shell           -> v2
```

After a version branch is accepted into its parent and the parent moves forward, retarget or update downstream PRs so they continue to inherit the latest prior-version work.

---

## Vercel Environment Guidance

Do not create a custom Vercel environment for every feature branch. Normal pushed branches should receive standard Vercel Preview deployments.

Create a Vercel custom environment only when a version branch needs:

- A persistent QA/demo URL.
- Separate environment variables.
- A separate database, schema, bucket, or API key set.
- Stable stakeholder review outside ephemeral preview URLs.

Recommended optional mapping:

```txt
v1.5 -> Preview branch deployment, optional custom environment
v1.6 -> Preview branch deployment, optional custom environment
v1.7 -> Preview branch deployment, optional custom environment
v1.8 -> Preview branch deployment, optional custom environment
v1.9 -> Preview branch deployment, optional custom environment
v2   -> Custom environment recommended for MEGA migration QA
```

If Vercel custom environments are created, configure branch tracking so each environment follows its same-named branch:

```txt
Custom Environment: v2
Branch Tracking: v2
Env vars: copied from Preview, then overridden with MEGA/staging values
```

Avoid pointing multiple active long-lived branches at the same writable database unless test-data collisions are acceptable.

---

## Initial Setup Commands

From a clean `dev` branch:

```bash
git fetch origin --prune
git checkout dev
git pull --ff-only origin dev

git branch v1.5 dev
git branch v1.6 v1.5
git branch v1.7 v1.6
git branch v1.8 v1.7
git branch v1.9 v1.8
git branch v2 v1.9

git push origin v1.5 v1.6 v1.7 v1.8 v1.9 v2
```

Because Git branches do not automatically follow their base branch, keep the downstream branch updated manually as its upstream version evolves.
