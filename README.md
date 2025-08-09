# useMediaQuery

React에서 미디어 쿼리를 기반으로 반응형 UI를 쉽게 구현할 수 있도록 도와주는 커스텀 훅입니다.

---

## 설치

```bash
npm install @confidential-nt/use-media-query
```

---

## 사용 예제

```tsx
import { useMediaQuery } from '@confidential-nt/use-media-query';

function Component() {
  const isDesktop = useMediaQuery('(min-width:1024px)');

  if (isDesktop) {
    // 데스크톱 전용 UI 렌더링
  }
}
```

확장된 API 사용 예시:

```tsx
const isMobile = useMediaQuery({
  below: 'md',
});
const isTablet = useMediaQuery({
  between: ['md', 'lg'],
});
const isDesktop = useMediaQuery({
  above: 'lg',
});
```

## 사용법

```ts
const matches = useMediaQuery(query);
```

### 매개변수

| 이름    | 타입                                                                                       | 설명                                     |
| ------- | ------------------------------------------------------------------------------------------ | ---------------------------------------- |
| `query` | `string \| { above?: Breakpoint; below?: Breakpoint; between?: [Breakpoint, Breakpoint] }` | 미디어 쿼리 조건 (문자열 또는 객체 기반) |

### Breakpoint 종류

| 값   | 해상도 (px 기준) |
| ---- | ---------------- |
| `sm` | 640              |
| `md` | 768              |
| `lg` | 1024             |
| `xl` | 1280             |

### 예시 조합

| 입력 형태                   | 실제 쿼리 문자열                             |
| --------------------------- | -------------------------------------------- |
| `{ above: 'md' }`           | `(min-width: 768px)`                         |
| `{ below: 'lg' }`           | `(max-width: 1024px)`                        |
| `{ between: ['md', 'xl'] }` | `(min-width: 768px) and (max-width: 1280px)` |

---

## 키워드 사용 시 주의사항

- `above` | `below` 와 `between` 은 **동시에 사용할 수 없습니다.**
  - ✅ 허용: `{above: 'md', below: 'lg'}`
  - ❌ 에러: `{above: 'md', between: ['md', 'lg']}`
- 문자열 쿼리를 직접 넣는 방식과 객체 기반 방식은 동일하게 동작합니다.

---

## SSR 사용 시 주의사항

해당 훅은 브라우저의 `window.matchMedia`를 사용합니다.  
따라서 SSR 환경에서는 기본값으로 `false`를 반환합니다.

> `typeof window !== "undefined"` 체크가 포함되어 있어 에러는 발생하지 않지만,  
> 초기 렌더링에서 `false`가 나올 수 있음에 유의해주세요.

---

## FAQ[선택]

### Q. 왜 `above`, `below`, `between`를 동시에 사용하면 안 되나요?

A. 혼동되는 조합은 내부 로직의 명확성을 떨어뜨릴 수 있고 예측 불가능한 동작이 생깁니다.  
따라서 한 번에 하나의 조건만 사용하는 것을 권장합니다.

---

## 기여

버그 제보, 기능 제안, PR 모두 환영합니다! (가이드가 있다면 링크로 보여주기)

---

## 라이선스

MIT (링크 포함시키기)
