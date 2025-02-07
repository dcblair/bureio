import { PlayerExpansion } from "~/context/AudioContext";
import { Button } from "../Button/Button";
import { Tooltip } from "../Tooltip";
import { memo } from "react";
import { classed } from "@tw-classed/react";

interface PlayerExpansionButtonProps {
  playerExpansion: PlayerExpansion;
  togglePlayerExpanded: () => void;
}

const StyledButtonWrapper = classed(
  "div",
  "fixed z-30 bottom-3.5 right-10 xl:right-24 2xl:right-32 flex items-center justify-center",
  {
    variants: {
      playerExpansion: {
        collapsed: "",
        standard: "",
      },
    },
  },
);

const BasePlayerExpansionButton = ({
  playerExpansion,
  togglePlayerExpanded,
}: PlayerExpansionButtonProps) => {
  return (
    <StyledButtonWrapper playerExpansion={playerExpansion}>
      <Tooltip
        content={
          playerExpansion === "collapsed" ? "expand player" : "collapse player"
        }
        placement="top"
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
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="size-6"
          >
            <polyline
              points="2 9 12 15 22 9"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            <line
              x1="0"
              y1="22"
              x2="24"
              y2="22"
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="2.5"
            />
          </svg>
        </Button>
      </Tooltip>
    </StyledButtonWrapper>
  );
};

export const PlayerExpansionButton = memo(BasePlayerExpansionButton);
