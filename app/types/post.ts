/** 목록에 필요한 글 메타데이터. 본문은 포함하지 않는다. */
export type PostMeta = {
  /** 파일 이름에서 확장자를 뺀 값. URL 경로로 쓰인다. */
  slug: string;
  title: string;
  /** YYYY-MM-DD */
  date: string;
  summary: string;
  tags: string[];
  draft: boolean;
};

/** 메타데이터 + 렌더링된 본문. */
export type Post = PostMeta & {
  html: string;
};
