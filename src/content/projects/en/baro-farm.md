---
title: BARO FARM
summary: Backend for an agri-fisheries commerce service. I owned the auth/authorization flow in a Spring Cloud Gateway·Redis·Kafka·OPA-based MSA, and resolved intermittent 403s at the structural root cause rather than the surface symptom.
role: Backend — auth / authorization flow
period: MSA-based team project
tech: [Java, Spring, Spring Cloud Gateway, Redis, Kafka, OPA, JWT, MySQL]
highlight: Diagnosed intermittent 403s as a "permission-vs-user-state mismatch" structural problem
featured: true
order: 2
roleBreakdown:
  - { area: "Auth / Authorization (Gateway · JWT · OPA)", pct: 100 }
  - { area: "Event sync (Kafka)", pct: 80 }
metrics:
  - value: 403 resolved
    label: Intermittent auth failure
    note: root cause removed
  - value: JWT + OPA
    label: Policy-based authorization
    note: state synced via Kafka events
  - value: MSA
    label: Gateway · Redis · Kafka · OPA
    note: distributed auth flow
---

## Problem

While owning the auth/authorization flow in an MSA environment, **intermittent 403 (Forbidden)** errors appeared in production. They were hard to reproduce, and viewing them as a mere gateway response error led nowhere.

## Root cause — a state mismatch, not the surface

I chose not to treat this as a gateway response error, and hypothesized a **structural problem: the permission info carried in the JWT diverging from the latest user state**.

When a user's permissions/state changed but the already-issued JWT — or the policy data (Bundle) that OPA (Open Policy Agent) references — wasn't updated immediately, permission decisions went wrong during that **lag window**, producing 403s.

## Solution — letting state changes flow through

- Propagate user-state changes via **Kafka events**
- Wire that flow so the **OPA Bundle is refreshed** accordingly

By shrinking the lag between permission info and user state, I **removed the root cause of the intermittent 403s**.

## Result

I gained the perspective of seeing a failure not as a visible symptom (403) but as a **data-consistency and event-propagation** problem. Auth/authorization isn't a single service — it works only when the state across multiple components stays consistent — a sense that matters especially for a service already in operation.
