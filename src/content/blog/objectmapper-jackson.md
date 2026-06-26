---
title: "ObjectMapper는 단순 JSON 변환기가 아니었다 — Jackson, 리플렉션, 동시성"
description: "Tour API 응답을 DTO로 파싱하는 단위 테스트를 짜다가 들여다본 ObjectMapper. Jackson의 계층 구조, treeToValue에 .class를 넘기는 이유(타입 소거)까지 정리했습니다."
date: 2026-06-20
tags: [Java, 단위 테스트, Jackson]
series: "[Heat Trip] 프로젝트 리펙토링"
seriesOrder: 6
canonicalUrl: "https://velog.io/@sanghyunbang/ObjectMapper%EB%8A%94-%EB%8B%A8%EC%88%9C-JSON-%EB%B3%80%ED%99%98%EA%B8%B0%EA%B0%80-%EC%95%84%EB%8B%88%EC%97%88%EB%8B%A4-Tour-API-%ED%8C%8C%EC%8B%B1-%ED%85%8C%EC%8A%A4%ED%8A%B8%EB%A1%9C-%EB%B3%B4%EB%8A%94-Jackson-%EB%A6%AC%ED%94%8C%EB%A0%89%EC%85%98-%EB%8F%99%EC%8B%9C%EC%84%B1"
---

## 테스트 개괄

공모전 제출 마감 이후 리팩토링을 하며 단위 테스트를 작성하고 있습니다. 이번 목표는 **외부 API·DB·Spring 컨텍스트에 의존하지 않고**, Tour API 응답 JSON을 `PlaceItemDto`로 변환하는 것입니다.

중첩된 응답 구조에서 item 배열을 꺼내는 테스트 코드입니다.

```java
JsonNode items = objectMapper.readTree(json)
    .path("response")
    .path("body")
    .path("items")
    .path("item");

PlaceItemDto dto = objectMapper.treeToValue(items.get(0),
                        PlaceItemDto.class);
```

이 짧은 코드를 짜면서, `ObjectMapper`가 단순한 JSON 변환기가 아니라는 걸 알게 됐습니다.

## ObjectMapper 살펴보기

`ObjectMapper`는 Jackson의 중심 클래스로, 세 가지를 합니다.

- JSON 문자열 → Java 객체
- Java 객체 → JSON 문자열
- JSON을 트리 구조(`JsonNode`)로 다루기

### Jackson의 계층 구조

**Jackson Core** — 토큰 기반으로 JSON을 읽고 쓰는 저수준 API

- `JsonParser`, `JsonGenerator`

**Jackson Databind** — JSON을 Java 객체로 매핑하는 고수준 API

- `ObjectMapper`, `JsonNode`, Serializer/Deserializer

**Jackson Annotation** — 매핑 규칙을 설정하는 API

- `@JsonProperty`, `@JsonIgnoreProperties`, `@JsonCreator`

## ObjectMapper의 디자인 패턴

`ObjectMapper`는 **Facade 패턴**을 닮았습니다. 복잡한 내부 시스템 앞에 놓인 단순한 진입점이죠. 개발자는 `JsonParser`·Deserializer·SerializerFactory를 직접 다루지 않고, `readValue()`·`treeToValue()` 같은 메서드만 호출하면 됩니다.

## 왜 `.class`를 넘기나

```java
PlaceItemDto dto = objectMapper.treeToValue(
    items.get(0),
    PlaceItemDto.class
);
```

`.class`는 "그 타입을 표현하는 Class 객체"입니다. 객체 인스턴스가 아니라 **런타임 타입 토큰** 역할을 합니다.

### 타입 소거(Type Erasure) 문제

Java의 제네릭 타입 정보는 **타입 소거** 때문에 런타임에 사라집니다. 컴파일 시점에는 컴파일러가 타입을 알지만, 런타임에는 `List<String>`과 `List<Integer>`가 모두 그냥 `List`가 되어버려서, Jackson은 무엇으로 변환해야 할지 알 수 없습니다.

`PlaceItemDto.class`를 넘기면, Jackson은 결정적인 힌트를 얻어 다음을 할 수 있습니다.

- 인스턴스화할 클래스 결정
- 생성자와 setter 탐색
- 필드와 Jackson 애너테이션 분석
- JSON 프로퍼티를 필드명과 매칭

처리 흐름은 이렇습니다.

```
JSON 데이터 → JsonParser/JsonNode → 대상 타입의 Class 정보 확인
→ 생성자/필드/setter/애너테이션 분석 → Deserializer 생성/획득
→ Java 객체 생성 및 값 주입
```

## 마치며

`ObjectMapper`는 단순 변환기가 아니라, 리플렉션과 타입 정보를 활용해 동작하는 정교한 시스템이었습니다. 다음 글에서는 Jackson 애너테이션, `ObjectMapper`의 주요 메서드, 그리고 동시성 이슈까지 이어서 다룰 예정입니다.
