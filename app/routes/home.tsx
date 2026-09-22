import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "seojoon-blog" },
    { name: "description", content: "" },
  ];
}

export default function Home() {
  return <main></main>;
}
