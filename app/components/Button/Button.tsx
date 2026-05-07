import { classed } from "@tw-classed/react";
import { type ButtonHTMLAttributes, forwardRef, memo, ReactNode } from "react";

interface ButtonProps
  extends ButtonHTMLAttributes<Omit<HTMLButtonElement, "children">> {
  children: ReactNode;
  iconOnly?: boolean;
  size?: "xs" | "sm" | "md" | "lg";
  variant?: "primary" | "secondary";
}

const StyledButton = classed(
  "button",
  "cursor-pointer disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        primary:
          "focus-visible:outline-offset-4 text-black-fogra29 focus-visible:outline-black-fogra29",
        secondary:
          "focus-visible:outline-white focus-visible:outline-offset-8 text-white",
      },
      size: {
        xs: "p-0",
        sm: "p-1.5",
        md: "p-2",
        lg: "p-2",
      },
      iconOnly: {
        true: "flex items-center justify-center transition-opacity duration-2000 ease-in-out",
        false: "",
      },
    },
    compoundVariants: [
      {
        variant: "primary",
        size: "xs",
        iconOnly: "true",
        class: "size-12",
      },
      {
        variant: "primary",
        size: "sm",
        iconOnly: "true",
        class: "size-12",
      },
      {
        variant: "primary",
        size: "md",
        iconOnly: "true",
        class: "size-14",
      },
      {
        variant: "primary",
        size: "lg",
        iconOnly: "true",
        class: "size-16",
      },
      {
        variant: "secondary",
        size: "xs",
        iconOnly: "true",
        class: "size-12",
      },
      {
        variant: "secondary",
        size: "sm",
        iconOnly: "true",
        class: "size-12",
      },
      {
        variant: "secondary",
        size: "md",
        iconOnly: "true",
        class: "size-14",
      },
      {
        variant: "secondary",
        size: "lg",
        iconOnly: "true",
        class: "size-16",
      },
    ],
  },
);

const BaseButton = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      iconOnly = false,
      size = "sm",
      variant = "primary",
      ...rest
    },
    ref,
  ) => {
    return (
      <StyledButton
        ref={ref}
        iconOnly={iconOnly}
        size={size}
        variant={variant}
        {...rest}
      >
        {children}
      </StyledButton>
    );
  },
);

BaseButton.displayName = "Button";

export const Button = memo(BaseButton);
