import { isRouteErrorResponse, Link } from "react-router";

import type { Route } from "./+types/tag";
import { getPostsByTag } from "~/lib/posts.server";
import { PageContainer } from "~/components/page-container";
import { PostList } from "~/components/post-list";

export async function loader({ params }: Route.LoaderArgs) {
  const posts = getPostsByTag(params.tag);

  // 쓰인 적 없는 태그는 빈 목록이 아니라 404 로 본다.
  // 빈 화면을 보여주면 오타인지 글이 없는 건지 구분되지 않는다.
  if (!posts) {
    throw new Response("Not Found", { status: 404 });
  }

  return { tag: params.tag, posts };
}

export function meta({ loaderData }: Route.MetaArgs) {
  if (!loaderData) {
    return [{ title: "태그를 찾을 수 없습니다 | seojoon-blog" }];
  }

  return [
    { title: `${loaderData.tag} | seojoon-blog` },
    {
      name: "description",
      content: `${loaderData.tag} 태그가 붙은 글 ${loaderData.posts.length}개.`,
    },
  ];
}

export default function Tag({ loaderData }: Route.ComponentProps) {
  const { tag, posts } = loaderData;

  return (
    <PageContainer>
      <main>
        <p className="text-sm text-gray-500 dark:text-gray-400">태그</p>
        <h1 className="mt-1 text-3xl font-bold text-gray-900 dark:text-gray-100">
          {tag}
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          글 {posts.length}개
        </p>

        <div className="mt-12">
          <PostList posts={posts} emptyMessage="이 태그의 글이 없습니다." />
        </div>
      </main>
    </PageContainer>
  );
}

/* 상세 페이지와 같은 이유로 이 라우트도 ErrorBoundary 를 가져야 meta 가 호출된다. */
export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  const notFound = isRouteErrorResponse(error) && error.status === 404;

  return (
    <PageContainer>
      <main>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
          {notFound ? "태그를 찾을 수 없습니다" : "문제가 발생했습니다"}
        </h1>
        <p className="mt-4 text-gray-600 dark:text-gray-400">
          {notFound
            ? "그런 태그가 붙은 글이 아직 없습니다."
            : "잠시 후 다시 시도해 주세요."}
        </p>
        <Link
          to="/"
          className="mt-8 inline-block text-sm text-gray-500 hover:underline dark:text-gray-400"
        >
          ← 목록으로
        </Link>
      </main>
    </PageContainer>
  );
}
