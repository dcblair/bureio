import { memo } from "react";
import { NavLink, NavLinkProps } from "react-router";
import { classed } from "@tw-classed/react";
interface LinkProps extends NavLinkProps {
  variant?: "icon" | "primary";
}

const StyledLink = classed(NavLink, "", {
  variants: {
    variant: {
      primary:
        "px-2.5 py-1 focus-visible:outline-black focus-visible:outline-2 text-rich-black-fogra-29 focus-visible:outline-offset-4 md:focus-visible:outline-offset-8 hover:focus:no-underline",
      icon: "px-3 py-2 focus-visible:outline-2 focus-visible:outline-black rounded-none",
    },
  },
});

const BaseLink = ({ variant = "primary", ...props }: LinkProps) => {
  return <StyledLink variant={variant} {...props} />;
};

BaseLink.displayName = "Link";

export const Link = memo(BaseLink);
