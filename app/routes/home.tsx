import type { Route } from "./+types/home";
import { getAllPosts } from "~/lib/posts.server";
import { PageContainer } from "~/components/page-container";
import { PostList } from "~/components/post-list";

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
    <PageContainer>
      <main>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
          seojoon-blog
        </h1>

        <div className="mt-12">
          <PostList posts={posts} emptyMessage="아직 작성된 글이 없습니다." />
        </div>
      </main>
    </PageContainer>
  );
}
