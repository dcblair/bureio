import { SVGProps } from "react";

export const MuteIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    aria-labelledby="mute-title"
    className="size-8"
    stroke="currentColor"
    viewBox="-7 -20 40 40"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <title id="mute-title">mute</title>
    {/* arc — matches maxvolumeicon */}
    <path
      d="M 0 -10 A 5 9 0 0 1 0 10"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
    />

    {/* x to the right of the arc */}
    <line
      x1="14"
      y1="-6"
      x2="24"
      y2="6"
      strokeWidth={2.5}
      strokeLinecap="round"
    />
    <line
      x1="24"
      y1="-6"
      x2="14"
      y2="6"
      strokeWidth={2.5}
      strokeLinecap="round"
    />
  </svg>
);
