import { type ChangeEvent, memo, useContext, useState } from "react";
import { AudioContext } from "~/context/AudioContext";
import { calculateSecondsToMinutesAndSeconds } from "~/utils/time";
import { Overlay } from "../Overlay/Overlay";
import { Tooltip } from "../Tooltip";
import { classed } from "@tw-classed/react";
import { PlayerExpansionButton } from "./PlayerExpansionButton";
import { Button } from "../Button/Button";

const StyledPlayerWrapper = classed(
  "div",
  "fixed bottom-0 z-30 flex transition h-12 duration-3000 w-full gap-4 xl:gap-6 2xl:gap-24 md:pl-8 lg:pl-12 xl:pl-32 items-center border-t-2 border-rich-black-fogra29 bg-romance py-9",
  {
    variants: {
      playerExpansion: {
        collapsed: "animate-collapse",
        standard: "animate-expand",
      },
    },
  },
);

const BaseAudioPlayer = () => {
  const {
    audioRef,
    currentSong,
    currentTime,
    handleNextSong,
    handlePlay,
    handlePrevSong,
    isPlaying,
    playerExpansion,
    setCurrentTime,
    setVolume,
    togglePlayerExpanded,
    volume,
  } = useContext(AudioContext);
  const { artwork, duration, title, bandcamp } = currentSong;
  // const [isDurationIncreasing, setIsDurationIncreasing] = useState(false);
  const [searchParams, setSearchParams] = useState<URLSearchParams>();
  const handleCurrentTime = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrentTime(parseInt(e.target.value, 10));
  };

  // todo: nice-to-have add this in later
  // const handleDurationDisplay = () => {
  //   setIsDurationIncreasing(!isDurationIncreasing);
  // };

  const isModalOpen = searchParams?.get("albumArtworkModal") === "true";

  const handleOpenModal = () => {
    setSearchParams(new URLSearchParams({ albumArtworkModal: "true" }));
  };

  const handleCloseModal = () => {
    setSearchParams(new URLSearchParams({ albumArtworkModal: "false" }));
  };

  const trackDuration = calculateSecondsToMinutesAndSeconds(duration);
  const parsedCurrentTime = calculateSecondsToMinutesAndSeconds(currentTime);

  return (
    <div className="relative hidden h-12 w-full lg:flex">
      <StyledPlayerWrapper playerExpansion={playerExpansion}>
        <div className="flex items-center gap-1">
          {/* audio ref & src */}
          <audio preload="auto" ref={audioRef}>
            <source src={currentSong?.audio} />
          </audio>

          {/* previous song button */}
          <Button iconOnly onClick={handlePrevSong}>
            <svg
              xmlns="http://www.w3.org/
              2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6"
              aria-labelledby="previous-title"
            >
              <title id="previous-title">previous song</title>
              <path strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Button>

          {/* play / pause button */}
          <Button
            aria-label={isPlaying ? "pause" : "play"}
            iconOnly
            onClick={handlePlay}
          >
            {isPlaying ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="stroke-rich-black-fogra29"
                stroke="currentColor"
                aria-labelledby="pause-title"
              >
                <title id="pause-title">pause</title>
                <path strokeWidth={2} d="M10 7v10m5 -10v10" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="-1 0 24 24"
                stroke="currentColor"
                className="size-6"
                aria-labelledby="play-title"
              >
                <title id="play-title">play</title>
                <path strokeWidth={2} d="M5 3l14 9-14 9V3z" />
              </svg>
            )}
          </Button>

          {/* next song button */}
          <Button iconOnly onClick={handleNextSong}>
            <svg
              xmlns="http://www.w3.org/
              2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6"
              aria-labelledby="next-title"
            >
              <title id="next-title">next song</title>
              <path strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Button>
        </div>

        {/* track duration slider and duration */}
        <div className="flex items-center space-x-3">
          <span className="inline-block w-12 leading-6">
            {parsedCurrentTime}
          </span>
          <input
            className="h-0.5 cursor-pointer appearance-none bg-gradient-to-r from-rich-black-fogra29/40 via-rich-black-fogra29 to-rich-black-fogra29/40 outline-offset-8 focus-visible:outline-2 focus-visible:outline-rich-black-fogra29 md:w-24 xl:w-48 [&::-webkit-slider-thumb]:bg-rich-black-fogra29 [&::-webkit-slider-thumb]:hover:bg-[#769FB8] [&::-webkit-slider-thumb]:active:bg-[#769FB8]"
            name="trackDurationSlider"
            id="trackDurationSlider"
            type="range"
            value={currentTime ?? 0}
            min={0}
            max={Number((audioRef?.current && audioRef.current.duration) || 0)}
            onChange={handleCurrentTime}
          />
          <label htmlFor="trackDurationSlider" className="sr-only">
            track duration
          </label>
          <span className="inline-block w-12 leading-6">{trackDuration}</span>
        </div>

        {/* volume control slider */}
        <div className="mx-2 flex h-full items-center space-x-2">
          {/* mute button */}
          <Button
            aria-label="mute audio"
            className="size-10"
            iconOnly
            onClick={() => setVolume(0)}
          >
            <svg
              aria-labelledby="mute-audio-title"
              className="size-10"
              fill="none"
              id="svg"
              role="img"
              stroke="currentColor"
              viewBox="1 1 18 18"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title id="mute-audio-title" lang="en">
                mute audio
              </title>
              <path
                strokeWidth={0.2}
                fill="currentColor"
                d="M7.757 6.343a0.5 0.5 0 01.707 0L12 9.879l3.536-3.536a0.5 0.5 0 11.707.707L12.707 10.586l3.536 3.536a0.5 0.5 0 01-.707.707L12 11.293l-3.536 3.536a0.5 0.5 0 01-.707-.707L11.293 10.586 7.757 7.05a0.5 0.5 0 010-.707z"
                transform="translate(-2, 0)"
              />
            </svg>
          </Button>

          {/* volume slider */}
          <Tooltip
            classNames={{
              container: "flex items-center justify-center",
              tooltip: "tracking-widest",
            }}
            content={`${Math.floor(volume * 100)}`}
            tooltipOffset={25}
            placement="top"
            zIndex={30}
          >
            <input
              className="h-0.5 cursor-pointer appearance-none bg-gradient-to-r from-rich-black-fogra29/40 via-rich-black-fogra29 to-rich-black-fogra29/40 outline-offset-8 transition-colors duration-1000 ease-in-out focus-visible:outline-2 focus-visible:outline-rich-black-fogra29 md:w-10 xl:w-16 [&::-webkit-slider-thumb]:bg-rich-black-fogra29 [&::-webkit-slider-thumb]:transition-colors [&::-webkit-slider-thumb]:duration-1000 [&::-webkit-slider-thumb]:hover:bg-[#769FB8] [&::-webkit-slider-thumb]:active:bg-[#769FB8]"
              type="range"
              min={0}
              max={1}
              name="volumeSlider"
              id="volumeSlider"
              onChange={(e) => setVolume(Number(e.target.value))}
              step={0.05}
              value={volume}
            />
            <label htmlFor="volumeSlider" className="sr-only">
              volume
            </label>
          </Tooltip>

          {/* volume up button */}
          <Button iconOnly onClick={() => setVolume(1)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="-7 -20 40 40"
              stroke="currentColor"
              aria-labelledby="max-volume-title"
            >
              <title id="max-volume-title" lang="en">
                max volume
              </title>
              <g id="g1">
                <path
                  d="M 0 -10 A 5 9 0 0 1 0 10"
                  stroke="black"
                  fill="none"
                  strokeWidth={2.5}
                />
                <path d="M 11 -8 L 21 -12" strokeWidth={2.5} />
                <path d="M 11 0 H 27" strokeWidth={2.5} />
                <path d="M 11 8 L 21 12" strokeWidth={2.5} />
              </g>
            </svg>
          </Button>
        </div>

        <div className="flex items-center space-x-4">
          {/* album artwork button */}
          <Button className="p-0" iconOnly onClick={handleOpenModal}>
            <img className="size-18 aspect-square" src={artwork} alt={title} />
          </Button>

          {/* track info */}
          <div className="w-70 flex items-center space-x-4 text-left">
            <span>track — </span>
            {/* bandcamp link */}
            <Tooltip
              classNames={{
                container: "flex items-center justify-center",
                tooltip: "tracking-widest",
              }}
              content="bandcamp"
              placement="top"
              tooltipOffset={20}
              zIndex={30}
            >
              <a
                className="focus-visible:outline-offset-8 focus-visible:outline-black"
                href={bandcamp ? bandcamp : "https://bu-re.bandcamp.com"}
                referrerPolicy="no-referrer"
                target="_blank"
              >
                <h3 className="text-balance text-lg font-semibold leading-7 tracking-wider">
                  {title}
                </h3>
              </a>
            </Tooltip>
          </div>

          {/* album artwork overlay */}
          <Overlay isOpen={isModalOpen} onClose={handleCloseModal}>
            <div className="relative flex flex-col items-center justify-center">
              <button
                className="focus-visible:outline-offset-8 focus-visible:outline-white"
                onClick={handleCloseModal}
              >
                <img
                  className="aspect-square w-auto cursor-auto md:h-[calc(100vh-100px)]"
                  src={artwork}
                  alt={title}
                />
              </button>
              <button
                // todo: create icononly variation for button component and use here
                className="absolute -right-8 top-0 hidden items-center justify-center rounded-full focus-visible:outline-offset-2 focus-visible:outline-white md:-right-20 md:flex"
                onClick={handleCloseModal}
              >
                <svg
                  aria-label="close modal"
                  className="rounded-full fill-romance md:size-16"
                  viewBox="1 0 22 22"
                >
                  <path d="M7.757 6.343a0.5 0.5 0 01.707 0L12 9.879l3.536-3.536a0.5 0.5 0 11.707.707L12.707 10.586l3.536 3.536a0.5 0.5 0 01-.707.707L12 11.293l-3.536 3.536a0.5 0.5 0 01-.707-.707L11.293 10.586 7.757 7.05a0.5 0.5 0 010-.707z" />
                </svg>
              </button>
            </div>
          </Overlay>
        </div>
      </StyledPlayerWrapper>

      {/* todo: create expanded, standard, and fullscreen svgs */}
      {/* player toggle button */}
      <PlayerExpansionButton
        playerExpansion={playerExpansion}
        togglePlayerExpanded={togglePlayerExpanded}
      />
    </div>
  );
};

export const AudioPlayer = memo(BaseAudioPlayer);
