import { classed } from "@tw-classed/react";
import { type ButtonHTMLAttributes, memo, ReactNode } from "react";

interface ButtonProps
  extends ButtonHTMLAttributes<Omit<HTMLButtonElement, "children">> {
  children: ReactNode;
  iconOnly?: boolean;
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "secondary";
}

const StyledButton = classed("button", "", {
  variants: {
    variant: {
      primary:
        "focus-visible:outline text-rich-black-fogra29 focus-visible:outline-2 focus-visible:outline-rich-black-fogra29",
      secondary: "bg-gray-500 text-white",
    },
    size: {
      sm: "p-1.5",
      md: "p-3",
      lg: "p-4",
    },
    iconOnly: {
      true: "flex size-12 items-center text-black justify-center rounded-sm transition-opacity duration-2000 ease-in-out",
    },
  },
  compoundVariants: [
    {
      variant: "primary",
      size: "sm",
    },
    // {
    //   variant: "primary",
    //   size: "sm",
    //   iconOnly: "true",
    //   class: "",
    // },
  ],
});

const Button = ({
  children,
  iconOnly,
  size = "sm",
  variant = "primary",
  ...rest
}: ButtonProps) => {
  return (
    <StyledButton iconOnly={iconOnly} size={size} variant={variant} {...rest}>
      {children}
    </StyledButton>
  );
};

export default memo(Button);
