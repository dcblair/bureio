import { type ChangeEvent, memo, useContext, useState } from "react";
import { AudioContext } from "~/context/AudioContext";
import { calculateSecondsToMinutesAndSeconds } from "~/utils/time";
import { Overlay } from "../Overlay/Overlay";
import { Tooltip } from "../Tooltip";
import { classed } from "@tw-classed/react";
import { PlayerExpansionButton } from "./PlayerExpansionButton";
import { Button } from "../Button/Button";
import { CloseIcon, MaxVolumeIcon, NextIcon, PreviousIcon } from "../Icons";

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
            <PreviousIcon />
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
            <NextIcon />
          </Button>
        </div>

        {/* track duration slider and duration */}
        <div className="flex items-center space-x-3">
          <span className="inline-block w-12 font-questrial text-lg leading-6 tracking-wider">
            {parsedCurrentTime}
          </span>
          <input
            className="h-0.5 cursor-pointer appearance-none bg-gradient-to-r from-rich-black-fogra29/40 via-rich-black-fogra29 to-rich-black-fogra29/40 outline-offset-8 focus-visible:outline-2 focus-visible:outline-rich-black-fogra29 md:w-24 xl:w-48 [&::-webkit-slider-thumb]:bg-rich-black-fogra29 [&::-webkit-slider-thumb]:hover:bg-[#769FB8] [&::-webkit-slider-thumb]:active:bg-[#769FB8]"
            id="trackDurationSlider"
            max={Number((audioRef?.current && audioRef.current.duration) || 0)}
            min={0}
            name="trackDurationSlider"
            onChange={handleCurrentTime}
            type="range"
            value={currentTime ?? 0}
          />
          <label htmlFor="trackDurationSlider" className="sr-only">
            track duration
          </label>
          <span className="inline-block w-12 font-questrial text-lg leading-6 tracking-wider">
            {trackDuration}
          </span>
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
                d="M7.757 6.343a0.5 0.5 0 01.707 0L12 9.879l3.536-3.536a0.5 0.5 0 11.707.707L12.707 10.586l3.536 3.536a0.5 0.5 0 01-.707.707L12 11.293l-3.536 3.536a0.5 0.5 0 01-.707-.707L11.293 10.586 7.757 7.05a0.5 0.5 0 010-.707z"
                fill="currentColor"
                strokeWidth={0.2}
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
            placement="top"
            tooltipOffset={25}
            zIndex={30}
          >
            <input
              className="h-0.5 cursor-pointer appearance-none bg-gradient-to-r from-rich-black-fogra29/40 via-rich-black-fogra29 to-rich-black-fogra29/40 outline-offset-8 transition-colors duration-1000 ease-in-out focus-visible:outline-2 focus-visible:outline-rich-black-fogra29 md:w-10 xl:w-16 [&::-webkit-slider-thumb]:bg-rich-black-fogra29 [&::-webkit-slider-thumb]:transition-colors [&::-webkit-slider-thumb]:duration-1000 [&::-webkit-slider-thumb]:hover:bg-[#769FB8] [&::-webkit-slider-thumb]:active:bg-[#769FB8]"
              id="volumeSlider"
              max={1}
              min={0}
              name="volumeSlider"
              onChange={(e) => setVolume(Number(e.target.value))}
              step={0.05}
              type="range"
              value={volume}
            />
            <label htmlFor="volumeSlider" className="sr-only">
              volume
            </label>
          </Tooltip>

          {/* volume up button */}
          <Button iconOnly onClick={() => setVolume(1)}>
            <MaxVolumeIcon />
          </Button>
        </div>

        <div className="flex items-center space-x-4">
          {/* album artwork button */}
          <Button className="p-0" iconOnly onClick={handleOpenModal}>
            <img className="size-18 aspect-square" src={artwork} alt={title} />
          </Button>

          {/* track info */}
          <div className="w-70 flex items-center space-x-4 text-left">
            <span className="font-questrial text-lg">track — </span>
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
                <h3 className="font-questrial text-lg font-semibold tracking-wider">
                  {title}
                </h3>
              </a>
            </Tooltip>
          </div>

          {/* album artwork overlay */}
          <Overlay isOpen={isModalOpen} onClose={handleCloseModal}>
            <div className="relative flex flex-col items-center justify-center">
              <Button
                className="focus-visible:outline-offset-8 focus-visible:outline-white"
                onClick={handleCloseModal}
              >
                <img
                  className="aspect-square w-auto cursor-auto md:h-[calc(100vh-100px)]"
                  src={artwork}
                  alt={title}
                />
              </Button>
              <Button
                className="absolute -right-8 top-0 hidden items-center justify-center rounded-full focus-visible:outline-offset-2 focus-visible:outline-white md:-right-20 md:flex"
                iconOnly
                onClick={handleCloseModal}
              >
                <CloseIcon />
              </Button>
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
