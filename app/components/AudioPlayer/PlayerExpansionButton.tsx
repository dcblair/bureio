import { PlayerExpansion } from "~/context/AudioContext";
import Button from "../Button/Button";
import { Tooltip } from "../Tooltip";
import { createPortal } from "react-dom";
import { ClientOnly } from "remix-utils/client-only";
import { memo, useEffect } from "react";

interface PlayerExpansionButtonProps {
  playerExpansion: PlayerExpansion;
  togglePlayerExpanded: () => void;
}

const BasePlayerExpansionButton = ({
  playerExpansion,
  togglePlayerExpanded,
}: PlayerExpansionButtonProps) => {
  return (
    <div className="fixed bottom-3 z-30 flex items-center justify-center md:right-12 xl:right-28">
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
    </div>
  );
};

export const PlayerExpansionButton = memo(BasePlayerExpansionButton);
