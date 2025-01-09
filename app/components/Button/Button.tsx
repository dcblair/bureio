import { classed } from "@tw-classed/react";
import * as React from "react";

interface ButtonProps {}

const StyledButton = classed("button", "", {
  variants: {
    variant: {
      primary: "bg-[#769FB8] text-white",
      secondary: "bg-gray-500 text-white",
    },
    size: {
      sm: "p-2",
      md: "p-3",
      lg: "p-4",
    },
    iconOnly: {
      true: "rounded-full",
    },
  },
  compoundVariants: [
    {
      variant: "primary",
      size: "sm",
    },
  ],
});

const Button = (props: ButtonProps) => {
  return <button {...props} />;
};

export default React.memo(Button);
