import { SVGProps } from "react";

export const PreviousIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    aria-labelledby="previous-title"
    className="size-7"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <title id="previous-title">previous song</title>
    <path strokeWidth={2} d="M15 19l-7-7 7-7" />
  </svg>
);
