import { Form, Link } from "react-router";

import type { Route } from "./+types/home";
import { getAllPosts, getTagShortcuts } from "~/lib/posts.server";
import { RecentPostsSlider } from "~/components/recent-posts-slider";

const RECENT_POST_COUNT = 5;

export function meta({}: Route.MetaArgs) {
  return [
    { title: "seojoon-blog" },
    { name: "description", content: "개발하면서 남기는 기록." },
  ];
}

export function loader() {
  return {
    shortcuts: getTagShortcuts(),
    recentPosts: getAllPosts().slice(0, RECENT_POST_COUNT),
  };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { shortcuts, recentPosts } = loaderData;

  return (
    // 헤더/푸터를 제외한 남는 높이를 채우고 그 안에서 중앙 정렬한다.
    <main className="flex flex-1 flex-col items-center justify-center px-6 pb-24">
      <h1 className="text-5xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
        seojoon-blog
      </h1>

      {/*
        검색 동작은 아직 없다. 눌렀을 때 아무 일도 일어나지 않으면
        고장으로 보이므로, 일단 전체 글 목록으로 보낸다.
      */}
      <Form
        action="/posts"
        method="get"
        role="search"
        className="mt-10 w-full max-w-xl"
      >
        <div className="flex items-center gap-3 rounded-full border border-gray-200 px-5 py-3.5 shadow-sm transition focus-within:shadow-md hover:shadow-md dark:border-gray-700 dark:bg-gray-900">
          <SearchIcon />
          <input
            type="search"
            name="q"
            placeholder="글 검색"
            aria-label="글 검색"
            className="w-full bg-transparent text-gray-900 outline-none placeholder:text-gray-400 dark:text-gray-100 dark:placeholder:text-gray-500"
          />
        </div>
      </Form>

      {shortcuts.length > 0 && (
        <ul className="mt-14 flex flex-wrap justify-center gap-x-2 gap-y-6">
          {shortcuts.map(({ tag, icon, count }) => (
            <li key={tag}>
              <Link
                to={`/tags/${encodeURIComponent(tag)}`}
                className="group flex w-24 flex-col items-center gap-2 rounded-xl px-1 py-2 hover:bg-gray-100 dark:hover:bg-gray-900"
              >
                <span className="flex size-12 items-center justify-center rounded-full bg-gray-100 group-hover:bg-gray-200 dark:bg-gray-800 dark:group-hover:bg-gray-700">
                  <img
                    src={icon}
                    // 이름은 아래 라벨이 이미 갖고 있어 alt 는 비운다.
                    alt=""
                    // 파일이 없어도 원의 크기가 흔들리지 않게 한다.
                    width={24}
                    height={24}
                    className="size-6"
                  />
                </span>
                <span className="w-full truncate text-center text-xs text-gray-700 dark:text-gray-400">
                  {tag}
                </span>
                <span className="sr-only">글 {count}개</span>
              </Link>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-14 w-full max-w-xl">
        <RecentPostsSlider posts={recentPosts} />
      </div>
    </main>
  );
}

function SearchIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      className="size-5 shrink-0 text-gray-400 dark:text-gray-500"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}
