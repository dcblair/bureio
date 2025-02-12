import { SVGProps } from "react";

export const MaxVolumeIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    aria-labelledby="max-volume-title"
    stroke="currentColor"
    viewBox="-7 -20 40 40"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <title id="max-volume-title" lang="en">
      max volume
    </title>
    <g id="g1">
      <path
        d="M 0 -10 A 5 9 0 0 1 0 10"
        fill="none"
        stroke="black"
        strokeWidth={2.5}
      />
      <path d="M 11 -8 L 21 -12" strokeWidth={2.5} />
      <path d="M 11 0 H 27" strokeWidth={2.5} />
      <path d="M 11 8 L 21 12" strokeWidth={2.5} />
    </g>
  </svg>
);
