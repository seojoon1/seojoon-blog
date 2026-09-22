---
title: "글 작성 방법"
date: "2026-09-21"
summary: "frontmatter 필드와 마크다운 문법 정리."
tags: ["가이드", "마크다운"]
---

## frontmatter

파일 맨 위에 `---` 로 감싼 영역이 frontmatter 입니다.

| 필드 | 필수 | 설명 |
| --- | --- | --- |
| `title` | O | 글 제목 |
| `date` | O | 작성일 (`YYYY-MM-DD`) |
| `summary` | X | 목록에 보여줄 한 줄 요약 |
| `tags` | X | 태그 배열 |
| `draft` | X | `true` 면 목록과 상세 페이지 모두에서 제외 |

## 본문

일반적인 마크다운 문법을 그대로 쓸 수 있습니다.

```ts
const greeting = "hello";
console.log(greeting);
```

- 목록
- 인용, 링크, 이미지 모두 지원

> 인용문도 이렇게 씁니다.
