import { memo, useContext, useState } from "react";
import { AudioContext } from "~/context/AudioContext";
import { calculateSecondsToMinutesAndSeconds } from "~/utils/time";
import { Overlay } from "../Overlay/Overlay";

const BaseAudioPlayer = () => {
  const {
    audio,
    currentSong,
    currentTime,
    handlePlay,
    isPlaying,
    playerExpansion,
    setCurrentSong,
    setCurrentTime,
    setVolume,
    togglePlayerExpanded,
  } = useContext(AudioContext);
  const { Metadata } = currentSong;
  const [isDurationIncreasing, setIsDurationIncreasing] = useState(false);
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

  const trackDuration = calculateSecondsToMinutesAndSeconds(
    audio?.duration || 0,
  );

  const parsedCurrentTime = calculateSecondsToMinutesAndSeconds(
    currentTime ?? 0,
  );

  return (
    <div className="relative h-12 w-full">
      <div
        className="fixed bottom-0 z-30 flex h-12 w-full items-center justify-evenly border-t-2 border-rich-black-fogra29 bg-romance py-9"
        style={{
          visibility: playerExpansion === "collapsed" ? "hidden" : "visible",
          height:
            playerExpansion === "standard"
              ? "3rem"
              : // : playerExpansion === "fullscreen"
                //   ? "3rem"
                0,
        }}
      >
        {/* play / pause button */}
        <button
          aria-label={isPlaying ? "pause" : "play"}
          // todo: add bg color to set colors in tw config?
          className="flex size-12 items-center justify-center rounded-sm p-1.5 transition duration-2000 ease-in-out hover:shadow-3xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rich-black-fogra29"
          onClick={handlePlay}
        >
          {isPlaying ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="size-fit stroke-rich-black-fogra29 transition-all duration-2000 focus-within:stroke-[#769FB8] hover:stroke-[#769FB8]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 9v6m4-6v6"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 3l14 9-14 9V3z"
              />
            </svg>
          )}
        </button>

        {/* track duration slider and duration */}
        <div className="flex items-center space-x-3">
          <span className="inline-block w-12 leading-6">
            {parsedCurrentTime}
          </span>
          <input
            className="h-0.5 w-48 cursor-pointer appearance-none bg-gradient-to-r from-rich-black-fogra29/40 via-rich-black-fogra29 to-rich-black-fogra29/40 outline-offset-8 focus-visible:outline-2 focus-visible:outline-rich-black-fogra29 [&::-webkit-slider-thumb]:bg-rich-black-fogra29 [&::-webkit-slider-thumb]:hover:bg-[#769FB8] [&::-webkit-slider-thumb]:active:bg-[#769FB8]"
            name="trackDurationSlider"
            type="range"
            value={currentTime ?? 0}
            min={0}
            max={Number(audio?.duration || 0)}
            onChange={handleCurrentTime}
          />
          <label htmlFor="trackDurationSlider" className="sr-only">
            track duration
          </label>
          <span>{trackDuration}</span>
        </div>

        {/* track info */}
        <div className="flex items-center space-x-2">
          <span>track — </span>
          <h3 className="text-lg font-semibold tracking-wider">
            {Metadata.title}
          </h3>
        </div>

        {/* album artwork */}
        <Overlay isOpen={isModalOpen} onClose={handleCloseModal}>
          <div className="relative flex flex-col items-center justify-center">
            {/* <picture>
            <source
              srcSet={currentSong.artwork}
              type="image/webp"
              className="w-96 h-96"
            />
            <img
              className="w-96 h-96"
              src={currentSong.artwork}
              alt={currentSong.title}
            />
          </picture> */}
            <button
              className="focus-visible:outline-offset-8 focus-visible:outline-white"
              onClick={handleCloseModal}
            >
              <img
                className="aspect-9/16 h-[calc(100vh-60px)] max-w-[calc(100vw-20px)] cursor-auto object-cover sm:h-[calc(100vh-100px)] md:max-h-[calc(100vh-80px)] md:w-auto"
                src={Metadata.artwork}
                alt={Metadata.title}
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

        <button onClick={handleOpenModal}>
          <img className="w-6" src={Metadata.artwork} alt={Metadata.title} />
        </button>
      </div>

      {/* player toggle button */}
      {/* todo: create expanded, standard, and fullscreen svgs */}
      <div
        className="bottom-5 right-[6%] z-30 flex items-center justify-center"
        style={{
          position: "fixed",
          left: playerExpansion === "collapsed" ? "50%" : "auto",
          // margin: playerExpansion === "collapsed" ? "auto 0" : 0,
        }}
      >
        <button onClick={togglePlayerExpanded}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-8 w-8"
          >
            <path
              className="linear origin-center transition-transform duration-2000"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M5 15l7-7 7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export const AudioPlayer = memo(BaseAudioPlayer);
