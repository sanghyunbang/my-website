---
title: AboutMe (en)
slug: /AboutMe/intro-en
---

# SANGHYUN BANG (방상현)

Seoul, Republic of Korea · **Email:** [bangsanghyun2068@gmail.com](mailto:bangsanghyun2068@gmail.com) / [mm2068@naver.com](mailto:mm2068@naver.com)

---

## SUMMARY

Entry‑level software developer with hands‑on full‑stack experience (React, Spring Boot, Flutter) and strong foundations in algorithms, SQL, and data modeling. Led a 3‑person team to build **HeatTrip**, an emotion‑based travel recommendation app, implementing OAuth2 social login, JWT authentication, map visualizations, and scalable APIs backed by MySQL, MongoDB, and Redis. Comfortable shipping features end‑to‑end, debugging production issues, and writing clear, maintainable code. Seeking a role where I can deliver user‑facing products and grow as a full‑stack/backend engineer.

---

## SKILLS

**Languages:** Java, JavaScript/TypeScript, Python, SQL

**Frameworks / Libraries:** Spring Boot, JPA, MyBatis, React, Flutter, Node.js (Express)

**Data & Infra:** MySQL 8, MongoDB, Redis, S3 + CloudFront, Elasticsearch (design & integration), Docker, WSL2, Git/GitHub, REST APIs, OAuth2, JWT

**Cloud & Tools:** Azure (SQL/DP‑300 track), VS Code, Postman, Jupyter, Selenium/BeautifulSoup, Linux/zsh

**ML/AI (foundations):** Bandit algorithms, basic LLM ops (local inference on RTX GPU), TTS data preparation

**Languages (human):** Korean (Native), English (Intermediate High – OPIC; IELTS 6.5)

---

## PROJECTS

**HeatTrip – Emotion‑based Travel Recommendation App** — Team Lead · Flutter · Spring Boot · MySQL · MongoDB · Redis · Kakao Maps · OAuth2/JWT

- Designed a modular architecture: Flutter app (front), Spring Boot APIs (back), MySQL (metadata), MongoDB (segment content, geospatial), Redis (caching).
- Implemented **OAuth2 social login** (Google/Naver/Kakao) with Spring Security, custom `OAuth2UserService`, `OAuth2SuccessHandler`, and **JWT** issuance; integrated deep links with Flutter (`flutter_web_auth_2`) and secure token storage.
- Built post/curation features: segment‑based route authoring with polylines, media uploads to **S3**, public delivery via **CloudFront**, and map overlays.
- Added indexing and query optimization (compound indexes on category/region; pagination & cursor patterns) for 50k+ place records.
- Designed emotion‑aware ranking (PAD model). Scoped **Elasticsearch** integration for search endpoints.

**Mountain Weather Forecast Service** — Spring Boot · Redis · Scheduler · KMA API

- Integrated Korea Meteorological Administration **Mountain Forecast** API; scheduled twice‑daily prefetch (08:30, 17:30) and cached normalized payloads in **Redis** to reduce latency.
- Exposed REST endpoints (e.g., `/getMountainWeather?base_date=YYYYMMDD&base_time=HHmm&mountainNum=...`) and rendered a daily table view (09:00/15:00/21:00) with sunrise/sunset.

**Secure Social Login for Flutter App** — Flutter · Spring Security · OAuth2/JWT

- Unified interface `social_login_service.dart` with provider‑specific helpers (Google/Naver/Kakao).
- Implemented deep‑link token exchange (scheme: `heattrip`) and persistent auth with `SharedPreferences`; routed with GoRouter.

**Image Upload Backend** — Node.js + MySQL

- Built APIs to upload image BLOBs and serve as Base64/stream; added listing endpoint and simple admin UI.

**Web Scraper & Sentiment Mining (Korean platforms)** — Python · Selenium · BeautifulSoup

- Implemented robust scrapers for dynamic, scroll‑loaded content (e.g., Nate Pann). Extracted titles and bodies via tag inspection; logged and retried failures for stability.


---

## EXPERIENCE

**AI RAB Intern**, Chung‑Ang University — Reinforcement Learning & Bandit Algorithms

*Mar 2023 – Aug 2023*

- Simulated bandit algorithms and explored regret bounds.
- Prototyped ML for analyzing relationship between search volume and stock price movements.

**Investment & Securities Intern**, DAOL Investment & Securities

*YYYY.MM – YYYY.MM* *(fill exact dates)*

- Assisted with financial data analysis and report drafting.
- Supported treasury stock price trend analysis and prepared materials for internal reviews.

**Editor**, Graduate School Newspaper (Chung‑Ang University)

*Sep 2023 – Present*

- Wrote columns on culture, science, and society; edited articles to publication quality.

---

## EDUCATION

**Sogang University**, Seoul — B.B.A. & B.A. Economics

- **CGPA:** 3.75/4.3, **Honors:** *Summa Cum Laude*

**Chung‑Ang University**, Seoul — Graduate Studies in Artificial Intelligence (Bandits, EVT)

- Research focus on sequential decision‑making and optimization under uncertainty.

---

## CERTIFICATIONS

- **Investment Manager**, KOFIA — Nov 2022
- **AdsP (Advanced Data Analytics Semi‑Professional)**, K‑DATA — Sep 2022
- **DP‑300 (Administering Microsoft Azure SQL Solutions)** — in progress

---

## AWARDS & ACTIVITIES

- **Honorable Mention**, DB Economics & Finance Competition — 2023
- **BOK Monetary Policy Competition**, Top‑11 (Seoul prelim) — 2022
- **KRX Stock & Derivatives Competition** — 2022
- **Full‑stack courses (Flutter, React, Spring Boot)** — Excellence Award
- Team Lead for **OREUM** project; led architecture & dev workflow.

---

## SELECTED TECHNICAL HIGHLIGHTS

- **Authentication:** Spring Security OAuth2 (Google/Naver/Kakao), JWT, session/cookie strategy, deep links.
- **Data & Caching:** MySQL schema/index design; MongoDB 2dsphere; **Redis** for hot reads; S3 + CloudFront CDN.
- **APIs:** REST design, pagination (offset & cursor), error handling, validation.
- **Observability & Quality:** Logging, structured error messages, reproducible envs (Docker/WSL2).
- **Frontend:** Flutter UI/GoRouter; React (Context/Redux), componentization, state mgmt.

---

## KEYWORDS (ATS)

Java, Spring Boot, JPA, MyBatis, REST API, OAuth2, JWT, React, Flutter, MySQL, MongoDB, Redis, Elasticsearch, Docker, WSL2, AWS S3, CloudFront, Azure SQL, Data Modeling, Indexing, Pagination, OAuth Deep Link, Kakao Maps, Selenium, Web Scraping, Linux, Git, CI/CD (basic)