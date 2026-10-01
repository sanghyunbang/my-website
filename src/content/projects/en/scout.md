---
# Brief entry (no detail page). Disclosure limits: _site-refresh/project-briefs.md §1
# No repo link, ticker names, figures or hosting details. Period comes from src/data/profile.ts (resumeProjects.scout)
kind: brief
title: SCOUT
summary: A valuation service I am planning and building alone. It estimates a fair-value range using public valuation methods (DCF and Monte Carlo simulation). The valuation engine is a pure Kotlin module with no Spring dependency, with a Spring Boot API, a Flutter app, a React admin console and a Next.js web front on top. Model inputs are updated through a flow of filing collection → freshness check → update proposal → approval gate, and LLM-assisted judgment never changes values directly — it only proposes to that gate. It is a private project being prepared for launch, so the source and model parameters are not public; this entry covers the structure only.
role: Solo — planning, engine, backend, app, admin console
tech: [Kotlin, Spring Boot, PostgreSQL, Flyway, Testcontainers, Flutter, React, Next.js]
order: 5
disclaimer: Not investment advice.
links: []
---
