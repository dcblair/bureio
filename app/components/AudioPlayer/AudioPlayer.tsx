import { type ChangeEvent, memo, useContext, useRef, useState } from "react";
import { AudioContext } from "~/context/AudioContext";
import { calculateSecondsToMinutesAndSeconds } from "~/utils/time";
import { filterClasses } from "~/utils/filterClasses";
import { Overlay } from "../Overlay/Overlay";
import { Tooltip } from "../Tooltip";
import { PlayerExpansionButton } from "./PlayerExpansionButton";
import { Button } from "../Button/Button";
import {
  MaxVolumeIcon,
  MuteIcon,
  NextIcon,
  PauseIcon,
  PlayIcon,
  PreviousIcon,
} from "../Icons";
import { useAutoFocus } from "~/hooks";

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
  const playButtonRef = useRef<HTMLButtonElement>(null);
  useAutoFocus(playButtonRef, playerExpansion === "standard");
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

  const hasError = currentSongStatus === "error";

  return (
    <div
      className="relative hidden h-12 w-full lg:flex"
      aria-label="audio player"
      role="region"
    >
      <div
        className={filterClasses(
          "audio-player-surface fixed bottom-0 z-30 flex h-12 w-full items-center gap-4 py-9 transition duration-3000 md:pl-8 lg:pl-12 xl:gap-6 xl:pl-32 2xl:gap-24",
          playerExpansion === "collapsed"
            ? "animate-collapse"
            : "animate-expand",
        )}
      >
        {/* fixed gradient top border */}
        <div className="from-black-fogra29 to-black-fogra29/40 absolute top-0 left-0 h-0.5 w-full bg-linear-to-r" />

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
            ref={playButtonRef}
            size="md"
            onClick={handlePlay}
          >
            {isPlaying ? <PauseIcon /> : <PlayIcon />}
          </Button>

          {/* next song button */}
          <Button iconOnly onClick={handleNextSong} size="md">
            <NextIcon />
          </Button>
        </div>

        {/* track duration slider and duration */}
        <div className="flex items-center gap-3">
          <span className="font-questrial inline-block w-12 text-lg leading-6 tracking-wider">
            {parsedCurrentTime}
          </span>
          <input
            className="from-black-fogra29/40 via-black-fogra29 to-black-fogra29/40 focus-visible:outline-black-fogra29 [&::-webkit-slider-thumb]:bg-black-fogra29 h-0.5 cursor-pointer appearance-none bg-linear-to-r outline-offset-8 focus-visible:outline-2 md:w-24 xl:w-48 [&::-webkit-slider-thumb]:size-3 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:hover:bg-[#769FB8] [&::-webkit-slider-thumb]:active:bg-[#769FB8]"
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
          <span className="font-questrial inline-block w-12 text-lg leading-6 tracking-wider">
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
            <MuteIcon />
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
              className={filterClasses(
                "from-black-fogra29/40 via-black-fogra29 to-black-fogra29/40 focus-visible:outline-black-fogra29 [&::-webkit-slider-thumb]:bg-black-fogra29 h-0.5 cursor-pointer appearance-none bg-linear-to-r outline-offset-8 transition-colors duration-1000 ease-in-out focus-visible:outline-2 md:w-10 xl:w-16 [&::-webkit-slider-thumb]:size-3 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:transition-colors [&::-webkit-slider-thumb]:duration-1000 [&::-webkit-slider-thumb]:hover:bg-[#769FB8] [&::-webkit-slider-thumb]:active:bg-[#769FB8]",
                hasError &&
                  "cursor-not-allowed [&::-webkit-slider-thumb]:bg-gray-400",
              )}
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
          <div className="flex w-70 items-center space-x-4 text-left">
            <span className="font-questrial text-lg">track — </span>
            {/* bandcamp link */}
            <Tooltip
              classNames={{
                container: "flex items-center justify-center",
                tooltip: "tracking-widest",
              }}
              content="open bandcamp"
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
