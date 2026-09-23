/**
 * 글을 읽는 페이지(목록 / 상세)의 공통 폭.
 *
 * 홈은 크롬 시작화면처럼 중앙 정렬 전체화면이라 이 폭을 쓰지 않는다.
 * 그래서 컨테이너를 root 의 Layout 에 직접 넣지 않고 컴포넌트로 뺐다.
 *
 * 폭은 45rem(720px). 기본값이던 max-w-2xl(672px)은 영문 기준이라
 * 글자 폭이 넓은 한글에서는 한 줄에 들어가는 글자 수가 부족했다.
 */
export function PageContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-[45rem] px-6 py-12">{children}</div>
  );
}
