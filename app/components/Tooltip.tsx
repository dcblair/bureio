import React, { memo, useRef, useState } from "react";
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
} from "@floating-ui/react";
import type { Side } from "@floating-ui/react";

interface TooltipProps extends ComponentPropsWithoutRef<"div"> {
  children: ReactNode;
  content: string;
  isContentHidden?: boolean;
  placement?: Side;
}

const BaseTooltip = ({
  children,
  content,
  placement = "right",
}: TooltipProps) => {
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const arrowRef = useRef<HTMLDivElement | null>(null);
  const { context, x, y, reference, floating, strategy, middlewareData } =
    useFloating({
      open: isTooltipOpen,
      onOpenChange: setIsTooltipOpen,
      placement: placement,
      whileElementsMounted: autoUpdate,
      middleware: [shift(), offset(15), arrow({ element: arrowRef })],
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
    const { x } = middlewareData.arrow;
    Object.assign(arrowRef?.current?.style, {
      left: x != null ? `${x}px` : "",
      top: placement === "bottom" ? `${-5}px` : "",
    });
  }

  function classNames(...classes: any) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <>
      <div {...getReferenceProps({ ref: reference })}>{children}</div>
      <FloatingPortal>
        {isTooltipOpen && (
          <div
            className={classNames(
              "rounded-xl bg-slate-600 px-2.5 py-1.5 text-xs leading-normal text-white"
            )}
            {...getFloatingProps({
              ref: floating,
            })}
            style={{
              position: strategy,
              left: x ?? 0,
              top: y ?? 0,
            }}
          >
            {content}
            <div
              className="bg-slate-600"
              id="arrow"
              style={{
                position: "absolute",
                width: "1em",
                height: "1em",
                transform: "rotate(45deg)",
              }}
              ref={arrowRef}
            />
          </div>
        )}
      </FloatingPortal>
    </>
  );
};

export const Tooltip = memo(BaseTooltip);
