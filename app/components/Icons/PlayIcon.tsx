import { SVGProps } from "react";

export const PlayIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    aria-labelledby="play-title"
    className="size-7"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <title id="play-title">play</title>
    <path
      strokeWidth={1.5}
      strokeLinejoin="round"
      strokeLinecap="round"
      d="M8 5l12 7-12 7V5z"
    />
  </svg>
);
