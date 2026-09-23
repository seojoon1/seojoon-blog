import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";

import type { PostMeta } from "~/types/post";

const AUTO_ADVANCE_MS = 5000;

/**
 * 홈의 최근 글 가로 슬라이드.
 *
 * 스크롤과 터치 스와이프는 CSS scroll-snap 이 처리한다.
 * 직접 붙이는 것은 화살표 버튼과 자동 넘김 타이머뿐이다.
 */
export function RecentPostsSlider({ posts }: { posts: PostMeta[] }) {
  const trackRef = useRef<HTMLUListElement>(null);
  // 카드가 2개 미만이면 넘길 것이 없다.
  const slidable = posts.length > 1;
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (!slidable || paused) return;
    // 모션을 줄이기로 한 사용자에게는 자동으로 움직이지 않는다.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const id = window.setInterval(
      () => scrollByCard(trackRef.current, 1, true),
      AUTO_ADVANCE_MS,
    );
    return () => window.clearInterval(id);
  }, [slidable, paused]);

  if (posts.length === 0) return null;

  return (
    <section
      aria-label="최근 글"
      className="w-full"
      // 읽으려는 순간 넘어가지 않도록, 마우스를 올리거나 안쪽에
      // 포커스가 있는 동안에는 자동 넘김을 멈춘다.
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="flex items-center gap-2">
        {slidable && (
          <ArrowButton
            direction="prev"
            onClick={() => scrollByCard(trackRef.current, -1, false)}
          />
        )}

        <ul
          ref={trackRef}
          // motion-safe: 모션을 줄이기로 한 사용자에겐 화살표도 즉시 이동한다.
          className="flex flex-1 snap-x snap-mandatory gap-3 overflow-x-auto motion-safe:scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {posts.map((post) => (
            <li key={post.slug} className="w-56 shrink-0 snap-start sm:w-64">
              <Link
                to={`/posts/${post.slug}`}
                className="flex h-full flex-col gap-2 rounded-xl border border-gray-200 px-4 py-3.5 transition hover:border-gray-300 hover:bg-gray-50 dark:border-gray-800 dark:hover:border-gray-700 dark:hover:bg-gray-900"
              >
                <time
                  dateTime={post.date}
                  className="text-xs text-gray-500 dark:text-gray-500"
                >
                  {post.date}
                </time>
                <span className="line-clamp-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                  {post.title}
                </span>
              </Link>
            </li>
          ))}
        </ul>

        {slidable && (
          <ArrowButton
            direction="next"
            onClick={() => scrollByCard(trackRef.current, 1, false)}
          />
        )}
      </div>
    </section>
  );
}

/**
 * 카드 한 장 폭만큼 가로로 스크롤한다.
 *
 * wrap 이 true 면 끝에 닿았을 때 처음으로 되돌아간다. 자동 넘김은
 * 끝에서 멈춰 있으면 안 되므로 되돌아가고, 화살표는 사용자가 누른
 * 방향대로만 움직이는 편이 예측 가능해서 되돌아가지 않는다.
 */
function scrollByCard(
  track: HTMLUListElement | null,
  direction: 1 | -1,
  wrap: boolean,
) {
  if (!track) return;

  const card = track.firstElementChild as HTMLElement | null;
  if (!card) return;

  const step = card.offsetWidth + 12; // 카드 폭 + gap-3
  // 소수점 오차로 끝에 닿았는지 판정이 흔들리지 않도록 여유를 둔다.
  const atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 1;

  if (wrap && direction === 1 && atEnd) {
    track.scrollTo({ left: 0, behavior: "smooth" });
    return;
  }

  track.scrollBy({ left: step * direction, behavior: "smooth" });
}

function ArrowButton({
  direction,
  onClick,
}: {
  direction: "prev" | "next";
  onClick: () => void;
}) {
  const isPrev = direction === "prev";

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={isPrev ? "이전 글 보기" : "다음 글 보기"}
      className="hidden size-8 shrink-0 items-center justify-center rounded-full text-gray-400 transition hover:bg-gray-100 hover:text-gray-600 sm:flex dark:text-gray-500 dark:hover:bg-gray-800 dark:hover:text-gray-300"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="size-4"
        aria-hidden="true"
      >
        <path d={isPrev ? "m15 18-6-6 6-6" : "m9 18 6-6-6-6"} />
      </svg>
    </button>
  );
}
