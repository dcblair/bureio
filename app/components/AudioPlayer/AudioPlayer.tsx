import { type ChangeEvent, memo, useContext, useState } from "react";
import { AudioContext } from "~/context/AudioContext";
import { calculateSecondsToMinutesAndSeconds } from "~/utils/time";
import { filterClasses } from "~/utils/filterClasses";
import { Overlay } from "../Overlay/Overlay";
import { Tooltip } from "../Tooltip";
import { PlayerExpansionButton } from "./PlayerExpansionButton";
import { Button } from "../Button/Button";
import { CloseIcon, MaxVolumeIcon, NextIcon, PreviousIcon } from "../Icons";

const BaseAudioPlayer = () => {
  const {
    audioRef,
    currentSong,
    currentSongStatus,
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
  const { album, artwork, duration, title, bandcamp } = currentSong;
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
      <div
        className={filterClasses(
          "fixed bottom-0 z-30 flex h-12 w-full items-center gap-4 border-t-2 border-rich-black-fogra29 bg-romance py-9 transition duration-3000 md:pl-8 lg:pl-12 xl:gap-6 xl:pl-32 2xl:gap-24",
          playerExpansion === "collapsed"
            ? "animate-collapse"
            : "animate-expand",
        )}
      >
        <div className="flex items-center gap-3">
          {/* audio ref & src */}
          <audio preload="auto" ref={audioRef}>
            <source src={currentSong?.audio} />
          </audio>

          {/* previous song button */}
          <Button iconOnly onClick={handlePrevSong} size="md">
            <PreviousIcon />
          </Button>

          {/* play / pause button */}
          <Button
            aria-label={isPlaying ? "pause" : "play"}
            iconOnly
            size="md"
            onClick={handlePlay}
          >
            {isPlaying ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="size-7 stroke-rich-black-fogra29"
                stroke="currentColor"
                aria-labelledby="pause-title"
              >
                <title id="pause-title">pause</title>
                <path strokeWidth={2} d="M10 5v12m5 -12v12" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="-1 0 25 25"
                stroke="currentColor"
                className="size-7"
                aria-labelledby="play-title"
              >
                <title id="play-title">play</title>
                <path strokeWidth={2} d="M5 3l14 9-14 9V3z" />
              </svg>
            )}
          </Button>

          {/* next song button */}
          <Button iconOnly onClick={handleNextSong} size="md">
            <NextIcon />
          </Button>
        </div>

        {/* track duration slider and duration */}
        <div className="flex items-center gap-3">
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
        <div className="mx-2 flex h-full items-center gap-3">
          {/* mute button */}
          <Button
            aria-label="mute audio"
            size="sm"
            iconOnly
            onClick={() => setVolume(0)}
          >
            <CloseIcon className="size-9" />
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
          <Button iconOnly size="xs" onClick={handleOpenModal}>
            <img
              className={filterClasses(
                "aspect-square size-12",
                currentSong.artwork && "animate-fade-in",
              )}
              src={artwork}
              alt={title}
            />
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
          <Overlay
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            title={`${album} album artwork overlay`}
          >
            <div className="relative flex flex-col items-center justify-center">
              <Button variant="secondary" onClick={handleCloseModal}>
                <img
                  className="aspect-square w-auto cursor-auto md:h-[calc(100dvh-100px)]"
                  src={artwork}
                  alt={title}
                />
              </Button>
            </div>
          </Overlay>
        </div>
      </div>

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
