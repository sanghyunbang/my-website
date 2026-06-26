---
title: "Stream이 뭐였더라? — map, flatMap, 그리고 메모리 구조까지"
description: "포트폴리오 프로젝트를 리팩토링하다 만난 Stream 코드. stream/map/flatMap이 무엇인지, List와 무엇이 다른지, 그리고 메모리에는 어떻게 올라가는지까지 파고들어 정리했습니다."
date: 2026-06-15
tags: [Java, Stream]
series: "[Heat Trip] 프로젝트 리펙토링"
seriesOrder: 3
canonicalUrl: "https://velog.io/@sanghyunbang/Stream%EC%9D%B4-%EB%AD%90%EC%98%80%EB%8D%94%EB%9D%BC-map-flatMap-%EA%B7%B8%EB%A6%AC%EA%B3%A0-%EB%A9%94%EB%AA%A8%EB%A6%AC-%EA%B5%AC%EC%A1%B0%EA%B9%8C%EC%A7%80"
---

## 0. 의문의 시작

포트폴리오 프로젝트를 리팩토링하다 이런 코드를 만났습니다.

```java
List<String> labels = categoryGroups.stream()
        .flatMap(group -> group.getCategories() == null
                ? Stream.<String>empty()
                : group.getCategories().stream())
        .toList();
```

그러자 의문이 줄줄이 떠올랐습니다.

- `stream()`, `map()`, `flatMap()`은 List를 만드는 메서드인가?
- List와 Stream은 기능적으로 무엇이 다른가?
- 애초에 Stream은 왜 만들어졌나?
- 뒤에 붙은 `.stream()`은 무슨 역할인가?
- `flatMap`을 `map`으로 바꿀 수 있나?
- Stream이 데이터를 메모리에 올리지 않는다면, 데이터는 어디에 있나?

## 1. Stream은 List 전용이 아니다

Stream은 List에만 쓰는 기능이 아닙니다. `stream()`은 `Collection` 인터페이스를 구현한 자료구조(Set, Queue 등)는 물론, 배열·파일·직접 만든 스트림에도 쓸 수 있습니다.

왜 가능할까요? Java 8부터 `Collection` 인터페이스에 `stream()`이 **default 메서드**로 들어갔기 때문입니다.

```java
public interface Collection<E> extends Iterable<E> {
    default Stream<E> stream() {
        return StreamSupport.stream(spliterator(), false);
    }
}
```

그래서 `Collection`을 상속하는 모든 구현체가 이 기능을 자동으로 물려받습니다.

## 2. List가 있는데 왜 Stream을 만들었나

Stream과 List의 핵심 차이는 철학에 있습니다. **"모든 데이터를 메모리(양동이)에 담아두기" vs "필요할 때만 데이터를 흘려보내며 계산하기(빨대)"** 입니다.

List와 배열은 데이터를 메모리에 실제로 쌓아둡니다. 반면 Stream은 저장소가 아니라 **처리 파이프라인**입니다. 데이터를 아직 옮기지 않고 "나중에 이렇게 처리하겠다"는 계획만 들고 있습니다.

| 개념 | 비유 | 의미 |
|------|------|------|
| `List<String>` | 양동이 | `["카페", "디저트"]` 같은 데이터가 메모리에 담겨 있음 |
| `Stream<String>` | 빨대/파이프라인 | 데이터가 한 개씩 처리를 거쳐 흘러감 |

Java 8(2014) 이전에는 대용량 데이터의 병렬 처리를 위해 스레드를 직접 만들어야 했고, 코드가 복잡해졌습니다. 함수형 패러다임을 받아들이며 Stream을 만든 덕분에, 개발자는 "어떻게 반복할지"가 아니라 **"무엇을 할지"** 를 선언하고 병렬화는 시스템에 맡길 수 있게 됐습니다.

## 3. 메모리 구조 — Stream은 "데이터"가 아니라 "설계도"

`List<List<String>>`는 데이터 전체를 메모리에 올리지만, Stream은 **"계산 지시(파이프라인 설계도)"** 만 최소한의 Heap 객체로 들고 있습니다.

`List<List>` 예시 — 데이터 크기만큼 메모리를 씁니다.

```
[0x100] -> [ 0x200(List), 0x300(List) ]
   └─ 0x200 -> [ "카페", "디저트" ]   (실제 문자열이 메모리에)
   └─ 0x300 -> [ "공원", "산책" ]     (실제 문자열이 메모리에)
```

Stream 예시 — 빈 파이프라인 "껍데기"만 있고 실제 데이터는 없습니다.

```
categoryGroups.stream()    // 1. 지연 실행 설계도만 생성
.map(group -> ...stream()) // 2. 아직 문자열 처리 X, 규칙만 기록
.toList();                 // 3. 종료 연산 → 그제서야 데이터가 흐름
```

`.toList()`, `.count()`, `.forEach()` 같은 **종료 연산**이 엔진을 돌립니다. 처리는 다음처럼 한 건씩 파이프라인을 통과합니다.

```
[원본 데이터]
    ↓ (Group 1 시작)
[flatMap 처리] → 스트림을 풀어 "카페", "디저트" 출력
    ↓ ("카페" 먼저)
[.toList() 수집] → "카페"를 바구니에 담음
    ↓ ("디저트")
[.toList() 수집] → "디저트"를 바구니에 담음
```

중간 단계는 한 번에 데이터 한 개 분량의 메모리만 필요합니다.

## 4. 설계도가 커지면?

"설계도 자체가 커지면 Stream을 다시 고민해야 하나?" 답은 **아니오** 입니다. 설계도의 메모리는 데이터 양과 무관하게 **상수 크기(수십 바이트 수준)** 입니다. 크기는 데이터 개수가 아니라 코드 줄 수에 비례합니다.

영화관 입장 비유가 직관적입니다.

- **List 방식**: 100만 명의 이름과 나이를 적은 거대한 장부 — 입장객 수만큼 커짐
- **Stream 방식**: "20세 이상만"이라고 적힌 표지판 하나 — 입장객 수와 무관하게 그대로

Heap 위의 Stream 설계도 객체는 파이프 참조들이 연결된 **연결 리스트** 형태로 저장되고, 각 객체는 (1) 직전 파이프 객체 참조, (2) 처리 시 실행할 람다 함수 참조만 가집니다. 긴 람다 로직도 한 번 바이트코드로 컴파일되어 **Method Area**에 저장되고, Heap 객체는 그 위치를 참조만 하므로 로직이 복잡해도 객체 크기는 작게 유지됩니다.

## 5. map vs flatMap — 왜 못 바꾸나

두 연산은 람다의 결과를 다루는 방식이 근본적으로 다릅니다.

`map`을 쓰면 타입이 꼬입니다.

```java
List<String> labels = categoryGroups.stream()
        .map(group -> group.getCategories() == null
                ? Stream.<String>empty()
                : group.getCategories().stream()) // Stream<String> 반환
        .toList(); // 에러!
```

- `map`은 결과를 그대로 감싸서 담습니다.
- 람다가 `Stream<String>`(빨대)을 반환하므로
- 결과가 `Stream<Stream<String>>`(중첩 구조)이 되고
- 최종 타입은 `List<Stream<String>>`이 됩니다.

`flatMap`은 **flatten + map** 입니다. 내부 스트림의 내용물을 풀어서, 원소를 메인 파이프라인에 직접 흘려보냅니다.

`map`의 타입 흐름:

```
categoryGroups.stream()  →  Stream<CategoryGroup>
.map(group -> ...)       →  람다가 Stream<String> 반환
                            Group1: Stream<String> ("카페","디저트")
                            Group2: Stream<String> ("공원","산책")
최종                      →  Stream<Stream<String>>  ← 중첩!
```

`flatMap`의 타입 흐름:

```
categoryGroups.stream()  →  Stream<CategoryGroup>
.flatMap(group -> ...)   →  빨대를 풀어 내용물을 메인 스트림에 주입
                            출력: "카페", "디저트", "공원", "산책"
최종                      →  Stream<String>  ← 평탄한 1차원!
```

## 6. 원래 코드 다시 읽기

```java
List<String> labels = categoryGroups.stream()
        .flatMap(group -> group.getCategories() == null
                ? Stream.<String>empty()
                : group.getCategories().stream())
        .toList();
```

요약하면 **여러 `CategoryGroup`에 흩어진 `categories`를 추출해, 하나의 평탄한 `List<String>`으로 합치는** 코드입니다.

1. `categoryGroups.stream()` — `List<CategoryGroup>`를 순차 파이프라인으로
2. `.flatMap(group -> ...)` — 각 그룹의 `categories`(`List<String>`)를 `.stream()`으로 변환
3. null 안전 — `categories`가 null이면 `Stream.empty()`를 반환해 예외 없이 자연스럽게 제외
4. `.toList()` — 종료 연산으로 데이터를 흘려 리스트로 수집

같은 동작을 for 루프로 쓰면 이렇습니다.

```java
List<String> labels = new ArrayList<>();

for (CategoryGroup group : categoryGroups) {
    if (group.getCategories() == null) {
        continue;
    }
    for (String category : group.getCategories()) {
        labels.add(category);
    }
}
```

Stream이 없던 기능을 새로 만들어주는 건 아닙니다. for 루프로도 같은 결과를 냅니다. 다만 Stream은 의도를 **선언적으로** 표현합니다 — "중첩된 그룹의 categories를 한 리스트로 평탄화하라."

## 7. 언제 Stream을 쓰나

Stream이 루프보다 항상 우월한 건 아닙니다. 단순 반복은 루프가 더 명확합니다.

```java
for (String label : labels) {
    System.out.println(label);
}
```

Stream은 **데이터 변환 흐름**을 표현할 때 빛납니다.

```java
List<String> labels = categoryGroups.stream()
        .flatMap(group -> group.getCategories() == null
                ? Stream.<String>empty()
                : group.getCategories().stream())
        .toList();
```

이 파이프라인은 "각 그룹에서 categories를 꺼내고 → null은 제외하고 → 여러 리스트를 하나로 평탄화해 → 단일 리스트로 수집한다"는 흐름을 분명하게 드러냅니다. **Stream은 단순한 문법 단축이 아니라 "변환과 수집의 흐름"** 입니다.

## 8. 결론

처음에는 List를 만드는 도구처럼 보였지만, Stream은 데이터를 순차적으로 흘려보내는 **처리 파이프라인**이었습니다. 핵심은 `flatMap`의 역할 — 중첩된 `List<List<String>>` 구조를 평탄한 `List<String>`으로 바꾼다는 점을 이해하는 것이었습니다.

| 질문 | 답 |
|------|----|
| `stream()`은 List 전용? | 아니다. Collection·배열·파일·커스텀 스트림에 모두 쓰임 |
| Stream은 저장소? | 아니다. 저장이 아니라 처리 흐름을 정의 |
| `.stream()`은 타입? | 아니다. 컬렉션을 Stream 파이프라인으로 바꾸는 메서드 |
| map과 flatMap 차이? | map은 결과를 감싸고, flatMap은 내부를 풀어 평탄화 |
| 데이터는 언제 처리? | `.toList()`·`.count()`·`.forEach()` 같은 종료 연산 시점 |

Stream을 "데이터 통"이 아니라 "처리 라인"으로 바라보면, `map`·`filter`·`flatMap`·`toList`가 자연스럽게 읽힙니다. "AI가 추천해준 문법"이 아니라 의식적으로 설계한 로직이 되는 것이죠.
