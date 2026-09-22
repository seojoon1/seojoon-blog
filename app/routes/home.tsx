import { Link } from "react-router";

import type { Route } from "./+types/home";
import { getAllPosts } from "~/lib/posts.server";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "seojoon-blog" },
    { name: "description", content: "개발하면서 남기는 기록." },
  ];
}

export function loader() {
  return { posts: getAllPosts() };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { posts } = loaderData;

  return (
    <main className="mx-auto max-w-2xl px-4 py-16">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
        seojoon-blog
      </h1>

      {posts.length === 0 ? (
        <p className="mt-12 text-gray-500 dark:text-gray-400">
          아직 작성된 글이 없습니다.
        </p>
      ) : (
        <ul className="mt-12 space-y-10">
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
                      <li
                        key={tag}
                        className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                )}
              </article>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
