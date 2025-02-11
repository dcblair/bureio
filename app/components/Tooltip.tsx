import React, { useRef, useState } from "react";
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

type Classnames = {
  [key: string]: string;
};

interface TooltipProps extends ComponentPropsWithoutRef<"div"> {
  children: ReactNode;
  classNames?: Classnames;
  content: string;
  delay?: { open: number; close: number };
  isContentHidden?: boolean;
  placement?: Side;
  tooltipOffset?: number;
  transitionDuration?: [number, number];
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
  "rounded-lg bg-rich-black-fogra29 px-2.5 py-2 text-sm font-questrial tracking-wider text-romance",
);

const BaseTooltip = ({
  classNames,
  children,
  content,
  delay = { open: 500, close: 0 },
  transitionDuration = [2000, 1300],
  placement = "right",
  tooltipOffset = 18,
  zIndex = 20,
}: TooltipProps) => {
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const arrowRef = useRef<HTMLDivElement | null>(null);
  const { context, x, y, reference, floating, strategy, middlewareData } =
    useFloating({
      open: isTooltipOpen,
      onOpenChange: setIsTooltipOpen,
      placement: placement,
      whileElementsMounted: autoUpdate,
      middleware: [
        shift(),
        offset(tooltipOffset),
        arrow({ element: arrowRef }),
      ],
    });
  const { isMounted, styles } = useTransitionStyles(context, {
    duration: {
      open: transitionDuration[0],
      close: transitionDuration[1],
    },
    open: {
      opacity: 1,
    },
    close: {
      opacity: 0,
    },
  });
  const hover = useHover(context, {
    move: false,
    delay: {
      open: delay.open,
      close: delay.close,
    },
  });
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
      <div
        className={classNames?.container}
        {...getReferenceProps({ ref: reference })}
      >
        {children}
      </div>
      <FloatingPortal>
        {isMounted && (
          <StyledContent
            {...getFloatingProps({
              ref: floating,
            })}
            className={classNames?.tooltip}
            style={{
              position: strategy,
              left: x ?? 0,
              top: y ?? 0,
              zIndex: zIndex,
              borderRadius: "0.12em",
              ...styles,
            }}
          >
            {content}
            <StyledArrow
              className="bg-rich-black-fogra29"
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
