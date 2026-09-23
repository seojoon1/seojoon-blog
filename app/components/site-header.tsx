import { Link } from "react-router";

/**
 * 크롬 새 탭 화면의 우상단 링크(Gmail / 이미지)에 대응하는 헤더.
 * 홈이 중앙 정렬 전체화면이라 제목을 왼쪽에 두지 않고 링크만 오른쪽에 둔다.
 */
export function SiteHeader() {
  return (
    <header className="flex justify-end gap-5 px-6 py-5 text-sm">
      <Link
        to="/posts"
        className="text-gray-600 hover:text-gray-900 hover:underline dark:text-gray-400 dark:hover:text-gray-100"
      >
        글
      </Link>
      <a
        href="https://github.com/seojoon1"
        target="_blank"
        rel="noreferrer"
        className="text-gray-600 hover:text-gray-900 hover:underline dark:text-gray-400 dark:hover:text-gray-100"
      >
        GitHub
      </a>
    </header>
  );
}
