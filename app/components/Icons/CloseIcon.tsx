import { SVGProps } from "react";

export const CloseIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    aria-labelledby="close-title"
    className="size-14 fill-current"
    viewBox="3 2 18 18"
    {...props}
  >
    <title id="close-title">close</title>
    <path
      stroke="currentColor"
      strokeWidth={0.2}
      d="M7.757 6.343a0.5 0.5 0 01.707 0L12 9.879l3.536-3.536a0.5 0.5 0 11.707.707L12.707 10.586l3.536 3.536a0.5 0.5 0 01-.707.707L12 11.293l-3.536 3.536a0.5 0.5 0 01-.707-.707L11.293 10.586 7.757 7.05a0.5 0.5 0 010-.707z"
    />
  </svg>
);
