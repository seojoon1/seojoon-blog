import { redirect } from "react-router";

/*
 * 글 목록이 /posts 로 옮겨간 직후의 임시 상태.
 * 다음 커밋에서 크롬 시작화면 스타일 홈으로 교체한다.
 */
export function loader() {
  return redirect("/posts");
}
