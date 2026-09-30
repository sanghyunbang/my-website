---
title: BARO FARM
summary: 농수산물 커머스 서비스의 백엔드. Spring Cloud Gateway·Redis·Kafka·OPA 기반 MSA에서 회원·인증 서비스, Gateway, OPA 인가를 맡았고, 간헐적 403의 원인(발급된 토큰의 옛 권한과 실제 사용자 상태의 시차)을 찾아 그 시차를 OPA 폴링 주기(10~60초) 안으로 줄였습니다.
role: 백엔드 — 회원·인증 서비스, Gateway, OPA 인가
period: 2025.11.29–2026.01.27 팀 프로젝트(세미·파이널) · 2026.02–03 개인 리팩토링
tech: [Java, Spring, Spring Cloud Gateway, Redis, Kafka, OPA, JWT, Resilience4j, Kubernetes, MySQL]
highlight: 간헐적 403을 "권한 정보와 사용자 상태 불일치" 구조 문제로 진단하고, 시차를 OPA 폴링 주기(10~60초) 안으로 줄임
featured: true
order: 2
roleBreakdown:
  - { area: "인증 / 인가 (Gateway · JWT · OPA)", pct: 100 }
  - { area: "이벤트 동기화 (Kafka)", pct: 80 }
metrics:
  - value: 403 시차 축소
    label: 간헐적 인증/인가 오류
    note: OPA 폴링 주기(10~60초) 안으로 시차를 줄임
  - value: JWT + OPA
    label: 정책 기반 인가
    note: Kafka 이벤트로 상태 동기화
  - value: MSA
    label: Gateway · Redis · Kafka · OPA
    note: 분산 인증 흐름
links:
  - label: GitHub (baro-farm-be)
    href: https://github.com/dogs-team/baro-farm-be
  - label: ADR — 판매자 승인 커밋 후 전파
    href: https://github.com/dogs-team/baro-farm-be/blob/test/issue-103-integration-test-payment/docs/ADR_SELLER_APPROVAL_AFTER_COMMIT.md
---

## 문제

MSA 환경에서 회원·인증 서비스와 Gateway, OPA 인가를 맡던 중, 통합 테스트·시연 환경에서 **간헐적으로 403(Forbidden)** 이 발생했습니다. 재현이 어렵고, 게이트웨이의 응답 오류로만 보면 원인이 잡히지 않는 종류의 문제였습니다. 판매자 승인처럼 사용자 상태가 바뀐 직후에 집중됐습니다.

## 원인 — 표면이 아니라 상태 불일치

저는 이 문제를 게이트웨이의 응답 오류로 보지 않고, **JWT에 담긴 권한 정보와 최신 사용자 상태가 어긋나는 구조적 문제**로 가설을 세웠습니다.

권한은 JWT에 담겨 발급되는데, 승인·정지·탈퇴로 상태가 바뀌어도 이미 발급된 토큰은 그대로입니다. 토큰이 갱신되기 전까지 게이트웨이는 옛 권한으로 판단했고, 그 **시차** 동안 403이 발생하는 구조였습니다.

## 해결 — 상태 변화를 흘려보내기

- 승인·정지·탈퇴로 바뀐 상태를 **Kafka hotlist 이벤트**로 발행하고
- opa-bundle 서비스가 이를 받아 정책과 데이터를 묶은 **OPA 번들을 다시 만들고**
- OPA가 번들을 주기적으로 받아와 게이트웨이의 인가 질의에 최신 상태를 반영하도록 연결

번들 엔드포인트는 내부 대역(사설 IP·CIDR)에서만 받도록 막고, 내부 토큰 검사도 설정으로 켤 수 있게 했습니다.

권한 정보와 사용자 상태가 어긋나는 시차를 **OPA 폴링 주기(10~60초) 안으로 줄였습니다.** 시차를 없앤 것은 아닙니다.

## 결과

장애를 눈에 보이는 증상(403)이 아니라 **데이터 정합성과 이벤트 전파 흐름**의 문제로 바라보는 시각을 얻었습니다. 인증/인가는 단일 서비스가 아니라 여러 컴포넌트의 상태가 일관되게 유지되어야 동작한다는 것을 체감했습니다.

## 이벤트마다 유실 비용을 따져 전달 방식을 골랐다

회원탈퇴 outbox는 프로젝트 중(2026.01) main에 구현했고, 판매자 승인 전파 분리는 프로젝트 이후 개인 리팩토링(2026.02–03)으로 진행해 결정 이유를 [ADR](https://github.com/dogs-team/baro-farm-be/blob/test/issue-103-integration-test-payment/docs/ADR_SELLER_APPROVAL_AFTER_COMMIT.md)로 남겼습니다. 판매자 승인 변경과 ADR은 `test/issue-103-integration-test-payment` 브랜치에 있고 main에는 병합되지 않았습니다.

- **문제** — 판매자 승인이 "상태 변경 → 권한 변경 → Kafka 발행"을 한 덩어리로 처리해서, 브로커가 잠깐 멈추거나 느리면 승인 자체가 실패하거나 요청이 타임아웃됐습니다.
- **판매자 승인 (개인 리팩토링)** — 승인을 먼저 커밋하고, OPA 전파는 커밋 뒤 별도 스레드에서 보냅니다. 전파가 유실돼도 다음 토큰 갱신 때 권한이 반영되는 복구 경로가 있어서, 최종적 일관성을 받아들였습니다.
- **회원탈퇴 (프로젝트 중 구현)** — 다른 서비스가 반드시 알아야 하고, 유실되면 복구 경로가 없는 사건입니다. 탈퇴 트랜잭션 안에서 개인정보 익명화, 자격 증명·토큰 삭제와 함께 outbox 테이블에 이벤트를 적재하고, 스케줄러가 발행 결과를 확인해 상태를 바꿉니다. 5회 실패하면 FAILED로 고정합니다.

## 한계와 다음 단계

| 지금 상태 | 다음에 할 것 |
|---|---|
| 정지·탈퇴 반영에 OPA 폴링 시차(10~60초)가 남음 | 즉시 차단이 필요한 상태만 번들 즉시 갱신 또는 짧은 토큰 만료로 보완 검토 |
| 판매자 승인 전파가 유실되면 로그만 남고, outbox는 5회 실패 시 FAILED에서 멈춤 | hotlist 재동기화 작업과 FAILED 이벤트 재처리 경로 추가 |
