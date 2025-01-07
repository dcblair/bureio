import * as React from "react";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import {
  arrow,
  autoUpdate,
  FloatingPortal,
  offset,
  shift,
  useDismiss,
  useFloating,
  useFocus,
  useHover,
  useInteractions,
  useRole,
  useTransitionStyles,
} from "@floating-ui/react";
import type { Side } from "@floating-ui/react";
import { classed } from "@tw-classed/react";

interface TooltipProps extends ComponentPropsWithoutRef<"div"> {
  children: ReactNode;
  className?: string;
  content: string;
  isContentHidden?: boolean;
  placement?: Side;
  zIndex?: number;
}

const StyledArrow = classed("div", "", {
  variants: {
    placement: {
      left: "-right-1",
      right: "-left-1",
      top: "-bottom-1",
      bottom: "-top-1",
    },
  },
});

const StyledContent = classed(
  "div",
  "rounded-lg bg-black px-2.5 py-2 text-sm font-questrial tracking-wider text-romance",
);

const BaseTooltip = ({
  className,
  children,
  content,
  placement = "right",
  zIndex = 20,
}: TooltipProps) => {
  const [isTooltipOpen, setIsTooltipOpen] = React.useState(false);
  const arrowRef = React.useRef<HTMLDivElement | null>(null);
  const { context, x, y, reference, floating, strategy, middlewareData } =
    useFloating({
      open: isTooltipOpen,
      onOpenChange: setIsTooltipOpen,
      placement: placement,
      whileElementsMounted: autoUpdate,
      middleware: [shift(), offset(18), arrow({ element: arrowRef })],
    });
  const { isMounted, styles } = useTransitionStyles(context, {
    duration: 1000,

    open: {
      opacity: 1,
    },
    close: {
      opacity: 0,
    },
  });
  const hover = useHover(context, { move: false });
  const focus = useFocus(context);
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: "tooltip" });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    focus,
    dismiss,
    role,
  ]);

  if (middlewareData?.arrow && arrowRef?.current?.style) {
    const { x, y } = middlewareData.arrow;
    Object.assign(arrowRef?.current?.style, {
      left: x != null ? `${x}px` : "",
      top: y != null ? `${y}px` : "",
    });
  }

  return (
    <>
      <div {...getReferenceProps({ ref: reference })}>{children}</div>
      <FloatingPortal>
        {isMounted && (
          <StyledContent
            {...getFloatingProps({
              ref: floating,
            })}
            className={className}
            style={{
              position: strategy,
              left: x ?? 0,
              top: y ?? 0,
              zIndex: zIndex,
              ...styles,
            }}
          >
            {content}
            <StyledArrow
              className="bg-black"
              style={{
                position: "absolute",
                width: "1em",
                height: "1em",
                transform: "rotate(45deg)",
              }}
              placement={placement}
              ref={arrowRef}
            />
          </StyledContent>
        )}
      </FloatingPortal>
    </>
  );
};

export const Tooltip = React.memo(BaseTooltip);
