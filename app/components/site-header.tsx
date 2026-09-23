import { Link } from "react-router";

const GITHUB_USERNAME = "seojoon1";

/**
 * 크롬 새 탭 화면의 우상단에 대응하는 헤더.
 * 앱 그리드 자리에 글 목록을, 프로필 사진 자리에 GitHub 프로필을 둔다.
 *
 * 둘 다 아이콘뿐이라 각각 aria-label 로 접근 가능한 이름을 준다.
 */
export function SiteHeader() {
  return (
    <header className="flex items-center justify-end gap-2 px-6 py-5">
      <Link
        to="/posts"
        aria-label="글 목록"
        title="글 목록"
        className="flex size-9 items-center justify-center rounded-full text-gray-600 transition hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-100"
      >
        <GridIcon />
      </Link>

      <a
        href={`https://github.com/${GITHUB_USERNAME}`}
        target="_blank"
        rel="noreferrer"
        aria-label="GitHub 프로필"
        title="GitHub 프로필"
        className="rounded-full ring-gray-300 transition hover:ring-2 dark:ring-gray-600"
      >
        <img
          // 원본은 113KB 라 size=64 로 줄인다. 32px 로 표시하므로
          // 레티나 화면까지 충분하다.
          src={`https://github.com/${GITHUB_USERNAME}.png?size=64`}
          // 이미지가 늦게 와도 자리가 흔들리지 않도록 크기를 명시한다.
          width={32}
          height={32}
          alt=""
          // GitHub 이 응답하지 않으면 빈 회색 원으로 남는다.
          className="block size-8 rounded-full bg-gray-100 object-cover dark:bg-gray-800"
        />
      </a>
    </header>
  );
}

/** 크롬 앱 그리드 자리에 쓰는 2x2 그리드 아이콘. */
function GridIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="size-5"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="8" height="8" rx="2" />
      <rect x="13" y="3" width="8" height="8" rx="2" />
      <rect x="3" y="13" width="8" height="8" rx="2" />
      <rect x="13" y="13" width="8" height="8" rx="2" />
    </svg>
  );
}
