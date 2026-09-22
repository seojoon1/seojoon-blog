import { isRouteErrorResponse, Link } from "react-router";

import type { Route } from "./+types/post";
import { getPost } from "~/lib/posts.server";

export async function loader({ params }: Route.LoaderArgs) {
  const post = await getPost(params.slug);

  // getPost 는 글이 없을 때와 draft 일 때 모두 null 을 준다.
  // 둘을 구분하지 않고 404 로 처리해 초안의 존재 자체를 드러내지 않는다.
  if (!post) {
    throw new Response("Not Found", { status: 404 });
  }

  return { post };
}

export function meta({ loaderData }: Route.MetaArgs) {
  // loader 가 404 를 던지면 아래 ErrorBoundary 가 렌더되고
  // meta 는 loaderData 없이 호출된다.
  if (!loaderData) {
    return [{ title: "글을 찾을 수 없습니다 | seojoon-blog" }];
  }

  return [
    { title: `${loaderData.post.title} | seojoon-blog` },
    { name: "description", content: loaderData.post.summary },
  ];
}

export default function Post({ loaderData }: Route.ComponentProps) {
  const { post } = loaderData;

  return (
    <main className="mx-auto max-w-2xl px-4 py-16">
      <Link
        to="/"
        className="text-sm text-gray-500 hover:underline dark:text-gray-400"
      >
        ← 목록으로
      </Link>

      <article className="mt-8">
        <header>
          <time
            dateTime={post.date}
            className="text-sm text-gray-500 dark:text-gray-400"
          >
            {post.date}
          </time>
          <h1 className="mt-1 text-3xl font-bold text-gray-900 dark:text-gray-100">
            {post.title}
          </h1>
          {post.tags.length > 0 && (
            <ul className="mt-4 flex flex-wrap gap-2">
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
        </header>

        {/*
          본문은 저장소 안의 신뢰된 마크다운 파일에서만 나온다.
          외부 입력을 렌더링하게 되면 sanitize 가 필요하다.
        */}
        <div
          className="markdown mt-10"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
      </article>
    </main>
  );
}

/*
 * 이 라우트가 직접 ErrorBoundary 를 가져야 404 일 때도 meta 가 호출된다.
 * 없으면 root 의 ErrorBoundary 가 대신 렌더되면서 title 이 비어버린다.
 */
export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  const notFound = isRouteErrorResponse(error) && error.status === 404;

  return (
    <main className="mx-auto max-w-2xl px-4 py-16">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
        {notFound ? "글을 찾을 수 없습니다" : "문제가 발생했습니다"}
      </h1>
      <p className="mt-4 text-gray-600 dark:text-gray-400">
        {notFound
          ? "주소가 잘못되었거나 아직 공개되지 않은 글입니다."
          : "잠시 후 다시 시도해 주세요."}
      </p>
      <Link
        to="/"
        className="mt-8 inline-block text-sm text-gray-500 hover:underline dark:text-gray-400"
      >
        ← 목록으로
      </Link>
    </main>
  );
}
