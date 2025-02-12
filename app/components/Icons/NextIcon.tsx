import { SVGProps } from "react";

export const NextIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    aria-labelledby="next-title"
    className="size-7"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <title id="next-title">next song</title>
    <path strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);
