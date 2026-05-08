import { SVGProps } from "react";

export const PauseIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    aria-labelledby="pause-title"
    className="size-7"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <title id="pause-title">pause</title>
    <line x1="9" y1="6" x2="9" y2="18" strokeWidth={2} strokeLinecap="round" />
    <line
      x1="15"
      y1="6"
      x2="15"
      y2="18"
      strokeWidth={2}
      strokeLinecap="round"
    />
  </svg>
);
