import { classed } from "@tw-classed/react";
import { type ButtonHTMLAttributes, memo, ReactNode } from "react";

interface ButtonProps
  extends ButtonHTMLAttributes<Omit<HTMLButtonElement, "children">> {
  children: ReactNode;
  iconOnly?: boolean;
  size?: "xs" | "sm" | "md" | "lg";
  variant?: "primary" | "secondary";
}

const StyledButton = classed("button", "", {
  variants: {
    variant: {
      primary:
        "focus-visible:outline-offset-4 text-rich-black-fogra29 focus-visible:outline-rich-black-fogra29",
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
});

const BaseButton = ({
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

export const Button = memo(BaseButton);
