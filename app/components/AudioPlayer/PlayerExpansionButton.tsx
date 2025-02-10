import { PlayerExpansion } from "~/context/AudioContext";
import { Button } from "../Button/Button";
import { Tooltip } from "../Tooltip";
import { memo, useRef } from "react";
import { classed } from "@tw-classed/react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

interface PlayerExpansionButtonProps {
  playerExpansion: PlayerExpansion;
  togglePlayerExpanded: () => void;
}

const StyledPolyline = classed(
  "polyline",
  "transition-transform duration-3000 ease-in-out",
  {
    variants: {
      playerExpansion: {
        collapsed: "group-hover:-translate-y-0.5",
        standard: "group-hover:translate-y-1",
      },
    },
  },
);

const BasePlayerExpansionButton = ({
  playerExpansion,
  togglePlayerExpanded,
}: PlayerExpansionButtonProps) => {
  const polylineRef = useRef<SVGPolylineElement | null>(null);

  const defaultChevronPoints = "3 8 12 14 20 8";

  useGSAP(() => {
    gsap.to(polylineRef?.current, {
      duration: 2.2,
      attr: {
        points:
          playerExpansion === "collapsed"
            ? "3 12 12 12 20 12"
            : defaultChevronPoints,
      },
      ease: "power2.inOut",
    });
  }, [playerExpansion]);

  return (
    <div className="fixed bottom-3.5 right-10 z-30 flex items-center justify-center xl:right-24 2xl:right-32">
      <Tooltip
        content={
          playerExpansion === "collapsed" ? "expand player" : "collapse player"
        }
        placement="top"
        tooltipOffset={5}
        transitionDuration={[3000, 1600]}
        zIndex={30}
      >
        <Button
          aria-label={
            playerExpansion === "collapsed"
              ? "expand audio player"
              : "collapse audio player"
          }
          iconOnly
          onClick={togglePlayerExpanded}
        >
          <svg
            className="group size-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <StyledPolyline
              playerExpansion={playerExpansion}
              points={defaultChevronPoints}
              ref={polylineRef}
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.5"
            />

            <line
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="2.5"
              x1="0"
              x2="24"
              y1="22"
              y2="22"
            />
          </svg>
        </Button>
      </Tooltip>
    </div>
  );
};

export const PlayerExpansionButton = memo(BasePlayerExpansionButton);
