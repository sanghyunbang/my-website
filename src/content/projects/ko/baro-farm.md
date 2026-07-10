---
title: BARO FARM
summary: 농수산물 커머스 서비스의 백엔드. Spring Cloud Gateway·Redis·Kafka·OPA 기반 MSA에서 인증·인가 흐름을 맡았고, 간헐적 403을 표면 증상이 아닌 구조적 원인에서 해결했습니다.
role: 백엔드 — 인증/인가 흐름
period: MSA 기반 팀 프로젝트
tech: [Java, Spring, Spring Cloud Gateway, Redis, Kafka, OPA, JWT, MySQL]
highlight: 간헐적 403을 "권한 정보와 사용자 상태 불일치" 구조 문제로 진단해 해결
featured: true
order: 2
roleBreakdown:
  - { area: "인증 / 인가 (Gateway · JWT · OPA)", pct: 100 }
  - { area: "이벤트 동기화 (Kafka)", pct: 80 }
metrics:
  - value: 403 해소
    label: 간헐적 인증/인가 장애
    note: 근본 원인 제거
  - value: JWT + OPA
    label: 정책 기반 인가
    note: Kafka 이벤트로 상태 동기화
  - value: MSA
    label: Gateway · Redis · Kafka · OPA
    note: 분산 인증 흐름
---

## 문제

MSA 환경에서 인증·인가 흐름을 맡던 중, 운영 도중 **간헐적으로 403(Forbidden)** 이 발생했습니다. 재현이 어렵고, 게이트웨이의 응답 오류로만 보면 원인이 잡히지 않는 종류의 문제였습니다.

## 원인 — 표면이 아니라 상태 불일치

저는 이 문제를 게이트웨이의 응답 오류로 보지 않고, **JWT에 담긴 권한 정보와 최신 사용자 상태가 어긋나는 구조적 문제**로 가설을 세웠습니다.

사용자의 권한·상태가 바뀌어도 이미 발급된 JWT나 OPA(Open Policy Agent)가 참조하는 정책 데이터(Bundle)가 곧바로 갱신되지 않으면, 그 **시차** 동안 권한 판단이 어긋나 403이 발생하는 구조였습니다.

## 해결 — 상태 변화를 흘려보내기

- **Kafka 이벤트**로 사용자 상태 변경을 전파하고
- 그 흐름에 맞춰 **OPA Bundle 갱신**이 이루어지도록 연결

권한 정보와 사용자 상태가 어긋나는 시차를 줄여 **간헐적 403의 근본 원인을 제거**했습니다.

## 결과

장애를 눈에 보이는 증상(403)이 아니라 **데이터 정합성과 이벤트 전파 흐름**의 문제로 바라보는 시각을 얻었습니다. 인증/인가는 단일 서비스가 아니라 여러 컴포넌트의 상태가 일관되게 유지되어야 동작한다는 것을 체감했고, 이는 운영 중인 서비스에서 특히 중요한 감각이었습니다.
