import { Link } from "react-router";

import type { PostMeta } from "~/types/post";

/**
 * 글 목록. 전체 목록과 태그별 목록이 같은 모양을 쓴다.
 *
 * 비어 있을 때의 문구는 화면마다 달라서(전체 목록 / 태그별 목록)
 * emptyMessage 로 받는다.
 */
export function PostList({
  posts,
  emptyMessage,
}: {
  posts: PostMeta[];
  emptyMessage: string;
}) {
  if (posts.length === 0) {
    return <p className="text-gray-500 dark:text-gray-400">{emptyMessage}</p>;
  }

  return (
    <ul className="space-y-10">
      {posts.map((post) => (
        <li key={post.slug}>
          <article>
            <time
              dateTime={post.date}
              className="text-sm text-gray-500 dark:text-gray-400"
            >
              {post.date}
            </time>
            <h2 className="mt-1 text-xl font-bold">
              <Link
                to={`/posts/${post.slug}`}
                className="text-gray-900 hover:underline dark:text-gray-100"
              >
                {post.title}
              </Link>
            </h2>
            {post.summary && (
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                {post.summary}
              </p>
            )}
            {post.tags.length > 0 && (
              <ul className="mt-3 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <li key={tag}>
                    <Link
                      to={`/tags/${encodeURIComponent(tag)}`}
                      className="block rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
                    >
                      {tag}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </article>
        </li>
      ))}
    </ul>
  );
}
