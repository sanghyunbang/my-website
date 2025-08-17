---
id: intro
title: AboutMe
slug: /about
description: Full-stack developer profile — React, Spring Boot, Flutter, MySQL, MongoDB, Redis, OAuth2/JWT, and more.
tags: [profile, resume, heattrip, spring-boot, flutter, react]
---

# 방상현 (Sanghyun Bang)

서울특별시 · **이메일**: [bangsanghyun2068@gmail.com](mailto:bangsanghyun2068@gmail.com) / [mm2068@naver.com](mailto:mm2068@naver.com)

---

## 요약 (SUMMARY)

풀스택 개발 경험(React, Spring Boot, Flutter)과 견고한 알고리즘·SQL·데이터 모델링 기초를 갖춘 신입 소프트웨어 개발자. 3인 팀을 이끌어 **HeatTrip**(감정 기반 여행 추천 앱)을 개발하며 OAuth2 소셜 로그인, JWT 인증, 지도 시각화, 확장 가능한 API를 설계·구현하고 MySQL·MongoDB·Redis로 백엔드를 운영함. 엔드투엔드 기능 개발, 운영 이슈 디버깅, 유지보수성 높은 코드 작성에 강점이 있으며, 백엔드/모바일 영역에서 성장하며 **사용자 가치**에 집중하는 개발자를 지향함.

---

## 보유 역량 (SKILLS)

- **언어:** Java · JavaScript/TypeScript · Python · SQL  
- **프레임워크/라이브러리:** Spring Boot · JPA · MyBatis · React · Flutter · Node.js(Express)  
- **데이터/인프라:** MySQL 8 · MongoDB · Redis · AWS S3 + CloudFront · Elasticsearch(설계/도입) · Docker · WSL2 · REST API · OAuth2 · JWT  
- **클라우드/도구:** Azure(SQL/DP-300 트랙) · VS Code · Postman · Jupyter · Selenium/BeautifulSoup · Linux/zsh  
- **ML/AI(기초):** 밴딧 알고리즘 · 로컬 LLM 추론(RTX GPU) · 한국어 TTS 데이터 준비  
- **언어능력:** 한국어(원어민) · 영어(Intermediate High – OPIC; IELTS 6.5)

---

## 프로젝트 (PROJECTS)

### HeatTrip – 감정 기반 여행 추천 앱
**역할:** 팀장 · **스택:** Flutter · Spring Boot · MySQL · MongoDB · Redis · Kakao Maps · OAuth2/JWT

- 아키텍처: Flutter(프론트) – Spring Boot(API) – MySQL(메타데이터) – MongoDB(세그먼트/지오스페이셜) – Redis(캐시)
- **OAuth2 소셜 로그인**(Google/Naver/Kakao) & Spring Security 연동, 커스텀 `OAuth2UserService`/`OAuth2SuccessHandler`, **JWT** 발급
- 게시/큐레이션: 경로(폴리라인) 기반 세그먼트 작성, 미디어 **S3 업로드**, **CloudFront** 퍼블릭 제공, 지도 오버레이
- 5만+ 장소 데이터 인덱스/쿼리 최적화(카테고리·지역 복합 인덱스, 페이지네이션/커서 패턴)
- **PAD(쾌락·각성·지배) 모델** 기반 감정-가중 랭킹

---

### 산악 기상예보 서비스
**스택:** Spring Boot · Scheduler · Redis · KMA API

- 기상청 **산악예보 API** 연동, 하루 2회(08:30/17:30) 사전 수집/정규화 후 **Redis 캐시**로 지연 감소
- REST 엔드포인트 제공(예: `/getMountainWeather?base_date=YYYYMMDD&base_time=HHmm&mountainNum=...`)
- 일자별 시간대(09:00/15:00/21:00) 및 일출·일몰 **테이블 뷰** 제공

---

### Flutter 앱용 안전한 소셜 로그인
**스택:** Flutter · Spring Security · OAuth2/JWT

- `social_login_service.dart` 인터페이스 + 공급자별 헬퍼(구글/네이버/카카오) **모듈화**
- 딥링크 토큰 교환 스킴(`heattrip`) 및 `SharedPreferences` 기반 **지속 인증**, GoRouter **라우팅**

---

### 이미지 업로드 백엔드
**스택:** Node.js + MySQL

- 이미지 BLOB 업로드/서빙 API(Base64/스트림), **목록 엔드포인트** 및 간단 관리자 UI

---

### 한국 커뮤니티 크롤러 & 감성 기초 분석
**스택:** Python · Selenium · BeautifulSoup

- 스크롤 기반 동적 콘텐츠 **안정 크롤링**, 본문/제목 추출 태그 식별
- **로깅·재시도 로직** 구축, 초기 감성 분석 파이프라인 기초

---

## 경력 (EXPERIENCE)

**AI RAB 인턴**, 중앙대학교 — 강화학습·밴딧 알고리즘  
*2023.03 – 2023.08*  
- 밴딧 알고리즘 시뮬레이션 및 리그렛 분석  
- 검색량–주가 관계 탐색용 ML 프로토타입

**인턴**, DAOL 투자증권  
*2022.01 – 2022.02*  
- 재무 데이터 분석 및 보고서 초안 작성 지원  
- 자사주 가격 동향 분석 보조 및 내부 자료 준비

**편집위원 및 편집장**, 중앙대학교 대학원신문  
*2023.09 – 2024.12*  
- 문화/과학/사회 칼럼 집필 및 교열

---

## 학력 (EDUCATION)

**서강대학교**, 서울 — 경영학/경제학 복수전공  
- **CGPA:** 3.75/4.3 · **수상:** *최우등(Summa Cum Laude)*

**중앙대학교**, 서울 — 인공지능 대학원 연구(밴딧, 극단값이론)  
- 불확실성 하 최적화·순차의사결정 연구(휴학)

---

## 자격증 (CERTIFICATIONS)

- **투자자산운용사**, 금융투자협회 — 2022.11  
- **AdSP(데이터분석 준전문가)**, 한국데이터산업진흥원 — 2022.09

---

## 수상/활동 (AWARDS & ACTIVITIES)

- **HeatTrip 관광공사 공모전 프로젝트** 팀 리드(설계/개발 총괄) — 현재  
- **최우수 KDT 풀스택(Flutter/React/Spring Boot) 과정** — 2025  
- **가작**, DB 경제·금융 공모전 — 2023  
- **한국은행 통화정책 경연대회** 서울 예선 Top-11 — 2022  
- **KRX 증권·파생 모의투자대회** — 2022

---

## 기술 하이라이트 (SELECTED HIGHLIGHTS)

- **인증/보안:** Spring Security OAuth2(구글/네이버/카카오), JWT, 세션/쿠키 전략, 딥링크  
- **데이터/캐시:** MySQL 스키마·인덱스 설계, MongoDB 2dsphere, **Redis** 고빈도 조회 캐시, S3 + CloudFront  
- **API:** REST 설계, 페이지네이션(오프셋/커서), 에러 처리, 입력 검증  
- **운영/품질:** 구조화 로깅, 오류 메시지 정책, 재현 가능한 환경(Docker/WSL2)  
- **프론트엔드:** Flutter UI/GoRouter, React(Context/Redux), 상태 관리, 컴포넌트화

---

## 키워드 (ATS)

`Java`, `Spring Boot`, `JPA`, `MyBatis`, `REST API`, `OAuth2`, `JWT`, `React`, `Flutter`, `MySQL`, `MongoDB`, `Redis`, `Elasticsearch`, `Docker`, `WSL2`, `AWS S3`, `CloudFront`, `Azure SQL`, `Data Modeling`, `Indexing`, `Pagination`, `OAuth Deep Link`, `Kakao Maps`, `Selenium`, `Web Scraping`, `Linux`, `Git`, `CI/CD(basic)`
