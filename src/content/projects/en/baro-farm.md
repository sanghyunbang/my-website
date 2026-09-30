---
title: BARO FARM
summary: Backend for an agri-fisheries commerce service. In a Spring Cloud Gateway·Redis·Kafka·OPA-based MSA I owned the member/auth service, the Gateway and OPA-based authorization, traced intermittent 403s to the lag between permissions in already-issued tokens and the actual user state, and reduced that lag to within the OPA polling interval (10–60s).
role: Backend — member/auth service, Gateway, OPA authorization
period: 2025.11.29–2026.01.27 team project (semi & final) · 2026.02–03 solo refactoring
tech: [Java, Spring, Spring Cloud Gateway, Redis, Kafka, OPA, JWT, Resilience4j, Kubernetes, MySQL]
highlight: Diagnosed intermittent 403s as a "permission-vs-user-state mismatch" and reduced the lag to within the OPA polling interval (10–60s)
featured: true
order: 2
roleBreakdown:
  - { area: "Auth / Authorization (Gateway · JWT · OPA)", pct: 100 }
  - { area: "Event sync (Kafka)", pct: 80 }
metrics:
  - value: 403 lag reduced
    label: Intermittent auth errors
    note: lag reduced to within OPA polling (10–60s)
  - value: JWT + OPA
    label: Policy-based authorization
    note: state synced via Kafka events
  - value: MSA
    label: Gateway · Redis · Kafka · OPA
    note: distributed auth flow
links:
  - label: GitHub (baro-farm-be)
    href: https://github.com/dogs-team/baro-farm-be
  - label: ADR — seller approval after commit
    href: https://github.com/dogs-team/baro-farm-be/blob/test/issue-103-integration-test-payment/docs/ADR_SELLER_APPROVAL_AFTER_COMMIT.md
---

## Problem

While owning the member/auth service, the Gateway and OPA authorization in an MSA environment, **intermittent 403 (Forbidden)** errors appeared in our integration-test and demo environments. They were hard to reproduce, and viewing them as a mere gateway response error led nowhere. They clustered right after user-state changes such as seller approval.

## Cause — a state mismatch, not the surface

I chose not to treat this as a gateway response error, and hypothesized a **structural problem: the permission info carried in the JWT diverging from the latest user state**.

Permissions are issued inside the JWT, but when approval, suspension or withdrawal changes the user's state, already-issued tokens stay the same. Until the token was refreshed, the gateway decided with the old permissions, producing 403s during that **lag window**.

## Solution — letting state changes flow through

- Publish state changes from approval, suspension and withdrawal as **Kafka hotlist events**
- The opa-bundle service consumes them and **rebuilds the OPA bundle** (policy + data)
- OPA pulls the bundle periodically, so the gateway's authorization queries see the latest state

The bundle endpoint only accepts private-network (private IP/CIDR) clients, with an optional internal-token check that can be enabled by config.

This **reduced the lag between permission info and user state to within the OPA polling interval (10–60s)** — it did not eliminate the lag.

## Result

I gained the perspective of seeing a failure not as a visible symptom (403) but as a **data-consistency and event-propagation** problem. Auth/authorization isn't a single service — it works only when the state across multiple components stays consistent.

## Choosing the delivery method by the cost of losing each event

I implemented the withdrawal outbox on main during the project (2026.01). Separating seller-approval propagation was solo refactoring after the project (2026.02–03), and I recorded the reasoning in an [ADR](https://github.com/dogs-team/baro-farm-be/blob/test/issue-103-integration-test-payment/docs/ADR_SELLER_APPROVAL_AFTER_COMMIT.md). The seller-approval change and the ADR live on the `test/issue-103-integration-test-payment` branch and are not merged into main.

- **Problem** — Seller approval handled "state change → permission change → Kafka publish" as a single unit, so if the broker paused or slowed briefly, the approval itself failed or the request timed out.
- **Seller approval (solo refactoring)** — The approval is committed first, and OPA propagation is sent on a separate thread after commit. Even if propagation is lost, there is a recovery path (permissions are applied on the next token refresh), so I accepted eventual consistency.
- **Member withdrawal (implemented during the project)** — Other services must know about it, and there is no recovery path if it is lost. Inside the withdrawal transaction, together with anonymizing personal data and deleting credentials/tokens, the event is written to an outbox table; a scheduler publishes it and updates its status based on the result. After 5 failures it is marked FAILED.

## Limitations & next steps

| Current state | Next |
|---|---|
| Suspension/withdrawal still has the OPA polling lag (10–60s) | Consider immediate bundle refresh or short token expiry only for states that need instant blocking |
| A lost seller-approval propagation only leaves a log; the outbox stops at FAILED after 5 failures | Add a hotlist resync job and a reprocessing path for FAILED events |
