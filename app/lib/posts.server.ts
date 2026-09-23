import matter from "gray-matter";
import { marked } from "marked";

import type { Post, PostMeta } from "~/types/post";

/**
 * content/posts/*.md 를 번들에 문자열로 포함시킨다.
 * fs 로 읽지 않기 때문에 배포 환경의 작업 디렉터리에 의존하지 않는다.
 */
const rawPosts = import.meta.glob("../../content/posts/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

function slugOf(filePath: string): string {
  return filePath.replace(/^.*\//, "").replace(/\.md$/, "");
}

function parseMeta(filePath: string, raw: string) {
  const slug = slugOf(filePath);
  const { data, content } = matter(raw);

  if (typeof data.title !== "string" || data.title.trim() === "") {
    throw new Error(`${slug}.md: frontmatter 에 title 이 없습니다.`);
  }
  if (typeof data.date !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(data.date)) {
    throw new Error(`${slug}.md: date 는 "YYYY-MM-DD" 형식이어야 합니다.`);
  }

  const meta: PostMeta = {
    slug,
    title: data.title,
    date: data.date,
    summary: typeof data.summary === "string" ? data.summary : "",
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    draft: data.draft === true,
  };

  return { meta, content };
}

/** 공개된 글만, 최신순으로 반환한다. 같은 날짜면 slug 오름차순. */
export function getAllPosts(): PostMeta[] {
  return Object.entries(rawPosts)
    .map(([filePath, raw]) => parseMeta(filePath, raw).meta)
    .filter((post) => !post.draft)
    .sort((a, b) =>
      a.date === b.date
        ? a.slug.localeCompare(b.slug)
        : b.date.localeCompare(a.date),
    );
}

/** slug 에 해당하는 공개된 글. 없거나 draft 면 null. */
export async function getPost(slug: string): Promise<Post | null> {
  const entry = Object.entries(rawPosts).find(
    ([filePath]) => slugOf(filePath) === slug,
  );
  if (!entry) return null;

  const { meta, content } = parseMeta(entry[0], entry[1]);
  if (meta.draft) return null;

  return { ...meta, html: await marked.parse(content) };
}

/** 공개된 글에 쓰인 태그를 사용 횟수 내림차순으로 반환한다. */
export function getAllTags(): { tag: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const post of getAllPosts()) {
    for (const tag of post.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }
  return [...counts.entries()]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) =>
      b.count === a.count ? a.tag.localeCompare(b.tag) : b.count - a.count,
    );
}

/**
 * 해당 태그가 붙은 공개 글을 최신순으로 반환한다.
 * 태그가 아예 쓰인 적이 없으면 null 을 준다. 빈 배열과 구분해야
 * 라우트에서 "없는 태그"를 404 로 처리할 수 있다.
 */
export function getPostsByTag(tag: string): PostMeta[] | null {
  const posts = getAllPosts().filter((post) => post.tags.includes(tag));
  return posts.length > 0 ? posts : null;
}
