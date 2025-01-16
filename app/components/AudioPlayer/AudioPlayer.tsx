import { memo, useContext, useState } from "react";
import { AudioContext } from "~/context/AudioContext";
import { calculateSecondsToMinutesAndSeconds } from "~/utils/time";
import { Overlay } from "../Overlay/Overlay";
import { Tooltip } from "../Tooltip";
import { classed } from "@tw-classed/react";

const StyledPlayerWrapper = classed(
  "div",
  "fixed bottom-0 z-30 flex transition h-12 duration-3000 w-full space-x-4 justify-evenly items-center md:px-4 lg:px-20 border-t-2 border-rich-black-fogra29 bg-romance py-9",
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
    audio,
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
  const { artwork, duration, title } = currentSong;
  // const [isDurationIncreasing, setIsDurationIncreasing] = useState(false);
  const [searchParams, setSearchParams] = useState<URLSearchParams>();

  const handleCurrentTime = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    <div className="relative hidden h-12 w-full md:flex">
      <StyledPlayerWrapper playerExpansion={playerExpansion}>
        <div className="flex items-center space-x-3">
          {/* previous song button */}
          <button onClick={handlePrevSong}>
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
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          {/* play / pause button */}
          <button
            aria-label={isPlaying ? "pause" : "play"}
            // todo: add bg color to set colors in tw config?
            className="flex size-12 items-center justify-center rounded-sm p-1.5 transition duration-2000 ease-in-out hover:shadow-3xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-rich-black-fogra29"
            onClick={handlePlay}
          >
            {isPlaying ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="stroke-rich-black-fogra29 focus-within:stroke-[#769FB8] hover:stroke-[#769FB8]"
                stroke="currentColor"
                aria-labelledby="pause-title"
              >
                <title id="pause-title">pause</title>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 7v10m5 -10v10"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6"
                aria-labelledby="play-title"
              >
                <title id="play-title">play</title>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 3l14 9-14 9V3z"
                />
              </svg>
            )}
          </button>

          {/* next song button */}
          <button onClick={handleNextSong}>
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
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>

        {/* track duration slider and duration */}
        <div className="flex items-center space-x-3">
          <span className="inline-block w-12 leading-6">
            {parsedCurrentTime}
          </span>
          <input
            className="h-0.5 w-48 cursor-pointer appearance-none bg-gradient-to-r from-rich-black-fogra29/40 via-rich-black-fogra29 to-rich-black-fogra29/40 outline-offset-8 focus-visible:outline-2 focus-visible:outline-rich-black-fogra29 [&::-webkit-slider-thumb]:bg-rich-black-fogra29 [&::-webkit-slider-thumb]:hover:bg-[#769FB8] [&::-webkit-slider-thumb]:active:bg-[#769FB8]"
            name="trackDurationSlider"
            id="trackDurationSlider"
            type="range"
            value={currentTime ?? 0}
            min={0}
            max={Number(audio?.duration || 0)}
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
          <button
            aria-label="mute audio"
            className="size-10"
            onClick={() => setVolume(0)}
          >
            <svg
              aria-labelledby="mute-audio-title"
              className="size-10"
              fill="none"
              id="svg"
              role="img"
              stroke="currentColor"
              strokeWidth={0.2}
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title id="mute-audio-title" lang="en">
                mute audio
              </title>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={0.2}
                fill="currentColor"
                d="M7.757 6.343a0.5 0.5 0 01.707 0L12 9.879l3.536-3.536a0.5 0.5 0 11.707.707L12.707 10.586l3.536 3.536a0.5 0.5 0 01-.707.707L12 11.293l-3.536 3.536a0.5 0.5 0 01-.707-.707L11.293 10.586 7.757 7.05a0.5 0.5 0 010-.707z"
                transform="translate(-2, 0)"
              />
            </svg>
          </button>

          {/* volume slider */}
          <Tooltip
            classNames={{
              container: "flex items-center justify-center",
              tooltip: "tracking-widest",
            }}
            content={`${Math.floor(volume * 100)}`}
            placement="top"
            zIndex={30}
          >
            <input
              className="h-0.5 w-16 cursor-pointer appearance-none bg-gradient-to-r from-rich-black-fogra29/40 via-rich-black-fogra29 to-rich-black-fogra29/40 outline-offset-8 transition-colors duration-1000 ease-in-out focus-visible:outline-2 focus-visible:outline-rich-black-fogra29 [&::-webkit-slider-thumb]:bg-rich-black-fogra29 [&::-webkit-slider-thumb]:transition-colors [&::-webkit-slider-thumb]:duration-1000 [&::-webkit-slider-thumb]:hover:bg-[#769FB8] [&::-webkit-slider-thumb]:active:bg-[#769FB8]"
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
          <button onClick={() => setVolume(1)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="size-10"
              aria-labelledby="max-volume-title"
            >
              <title id="max-volume-title" lang="en">
                max volume
              </title>
              <g id="g1">
                <path d="M2,11H14" strokeWidth={1.5} />
                {/* <path
                  style={{
                    fill: "#000000",
                    strokeWidth: 0.692069,
                    stroke: "#000000",
                    strokeDasharray: "none",
                  }}
                  d="M 92.169938,26.071788 C 70.723313,28.202993 49.276687,30.334199 27.830062,32.465404 49.276687,30.334199 70.723313,28.202993 92.169938,26.071788 Z"
                  id="path9"
                />
                <path
                  style={{
                    fill: "none",
                    stroke: "#000000",
                    strokeWidth: 2.11667,
                    strokeLinecap: "round",
                    strokeDasharray: "none",
                    strokeOpacity: 1,
                  }}
                  d="M 29.531441,41.175446 C 49.843814,34.041313 70.156186,26.907181 90.468559,19.773048"
                  id="path10"
                />
                <path
                  style={{
                    fill: "#000000",
                    stroke: "#000000",
                    strokeWidth: 2.11667,
                    strokeLinecap: "round",
                    strokeDasharray: "none",
                    strokeOpacity: 1,
                  }}
                  d="M 23.069273,58.761202 C 51.727865,58.589327 80.386458,58.417453 109.04505,58.245578"
                  id="path12"
                />
                <path
                  style={{
                    fill: "#000000",
                    stroke: "#000000",
                    strokeWidth: 0.692069,
                    strokeDasharray: "none",
                  }}
                  d="M 92.169938,96.113766 C 70.723313,93.982561 49.276687,91.851355 27.830062,89.72015 c 21.446625,2.131205 42.893251,4.262411 64.339876,6.393616 z"
                  id="path30"
                /> */}
              </g>
            </svg>
          </button>
        </div>

        {/* album artwork button */}
        <button
          className="size-fit focus-visible:outline-offset-4 focus-visible:outline-rich-black-fogra29"
          onClick={handleOpenModal}
        >
          <img className="aspect-square size-12" src={artwork} alt={title} />
        </button>

        {/* track info */}
        <div className="flex w-64 items-center space-x-2 text-left">
          <span>track — </span>
          <h3 className="text-ellipsis text-lg font-semibold tracking-wider">
            {title}
          </h3>
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
      </StyledPlayerWrapper>

      {/* todo: create expanded, standard, and fullscreen svgs */}
      {/* player toggle button */}
      <div className="fixed bottom-5 right-20 z-30 flex items-center justify-center">
        <Tooltip
          content={
            playerExpansion === "collapsed"
              ? "expand player"
              : "collapse player"
          }
          placement="top"
          transitionDuration={[3000, 1600]}
          zIndex={30}
        >
          <button
            aria-label={
              playerExpansion === "collapsed"
                ? "expand audio player"
                : "collapse audio player"
            }
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
          </button>
        </Tooltip>
      </div>
    </div>
  );
};

export const AudioPlayer = memo(BaseAudioPlayer);
