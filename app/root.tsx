import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import { PageContainer } from "~/components/page-container";
import { SiteFooter } from "~/components/site-footer";
import { SiteHeader } from "~/components/site-header";
import "./app.css";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://cdn.jsdelivr.net" },
  {
    // 동적 서브셋 버전. 페이지에 실제로 쓰인 글자가 속한 조각만 내려받는다.
    rel: "stylesheet",
    href: "https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.css",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      {/*
        min-h-screen + flex-col 로 두어야 내용이 짧은 페이지에서도
        푸터가 화면 중간에 뜨지 않고 아래에 붙는다.
      */}
      <body className="flex min-h-screen flex-col">
        <SiteHeader />
        {/* 홈이 남는 높이를 채워 세로 중앙 정렬할 수 있도록 flex 컨테이너로 둔다. */}
        <div className="flex flex-1 flex-col">{children}</div>
        <SiteFooter />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "문제가 발생했습니다";
  let details = "알 수 없는 오류입니다.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message =
      error.status === 404
        ? "페이지를 찾을 수 없습니다"
        : "문제가 발생했습니다";
    details =
      error.status === 404
        ? "주소를 다시 확인해 주세요."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <PageContainer>
      <main>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
          {message}
        </h1>
        <p className="mt-4 text-gray-600 dark:text-gray-400">{details}</p>
        {stack && (
          <pre className="mt-8 w-full overflow-x-auto rounded-lg bg-gray-900 p-4 text-sm text-gray-100">
            <code>{stack}</code>
          </pre>
        )}
      </main>
    </PageContainer>
  );
}
