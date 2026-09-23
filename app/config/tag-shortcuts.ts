/**
 * 홈의 원형 바로가기에 올릴 태그.
 *
 * 크롬 새 탭의 바로가기처럼 "자주 가는 몇 개" 만 고른다. 여기 적힌
 * 태그만, 적힌 순서대로 노출된다. 글에 쓰인 모든 태그를 보여주면
 * 글이 늘어날수록 홈이 지저분해진다.
 *
 * 여기에 없는 태그도 /tags/:tag 와 글의 태그 칩으로는 그대로 닿는다.
 */
export type TagShortcut = {
  /** 글 frontmatter 의 태그와 정확히 같아야 한다. */
  tag: string;
  /** public/ 기준 경로. 없는 파일을 가리키면 빈 원으로 보인다. */
  icon: string;
};

export const TAG_SHORTCUTS: TagShortcut[] = [
  { tag: "마크다운", icon: "/tag-icons/markdown.svg" },
  { tag: "가이드", icon: "/tag-icons/guide.svg" },
  { tag: "잡담", icon: "/tag-icons/chat.svg" },
];
