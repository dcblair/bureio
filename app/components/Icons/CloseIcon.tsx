import { SVGProps } from "react";

export const CloseIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    aria-labelledby="close-title"
    className="rounded-full fill-romance md:size-16"
    viewBox="1 0 22 22"
    {...props}
  >
    <title id="close-title">close</title>
    <path d="M7.757 6.343a0.5 0.5 0 01.707 0L12 9.879l3.536-3.536a0.5 0.5 0 11.707.707L12.707 10.586l3.536 3.536a0.5 0.5 0 01-.707.707L12 11.293l-3.536 3.536a0.5 0.5 0 01-.707-.707L11.293 10.586 7.757 7.05a0.5 0.5 0 010-.707z" />
  </svg>
);
