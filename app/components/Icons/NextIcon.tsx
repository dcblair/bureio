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
    <path strokeWidth={1.6} d="M9 6l6 6-6 6" />
  </svg>
);
