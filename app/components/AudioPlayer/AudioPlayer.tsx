import { memo, useContext, useEffect, useState } from "react";
import { AudioContext } from "~/context/AudioContext";

const BaseAudioPlayer = () => {
  const {
    audio,
    currentSong,
    handlePlay,
    isPlayerExpanded,
    isPlaying,
    setCurrentSong,
    togglePlayerExpanded,
  } = useContext(AudioContext);

  const handleCurrentTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!audio) return;

    audio.currentTime = parseInt(e.target.value, 10);
  };

  return (
    <div className="sticky bottom-0 z-30 flex h-12 w-full items-center justify-evenly border-t-2 border-rich-black-fogra29 bg-romance py-9">
      {/* play / pause button */}
      <button
        aria-label={isPlaying ? "pause" : "play"}
        // todo: add bg color to set colors in tw config?
        className="flex size-12 items-center justify-center rounded-sm p-1.5 transition duration-2000 ease-in-out hover:shadow-3xl focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-rich-black-fogra29"
        onClick={handlePlay}
      >
        {isPlaying ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="size-20 stroke-rich-black-fogra29 transition-all duration-2000 focus-within:stroke-[#769FB8] hover:stroke-[#769FB8]"
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
      <input
        type="range"
        value={audio?.currentTime || 0}
        min={0}
        onChange={handleCurrentTime}
      />
      {/* track info */}
      <div className="flex items-center space-x-2">
        <span>track — </span>
        <h3 className="text-lg font-semibold tracking-wider">
          {currentSong.title}
        </h3>
      </div>

      {/* album cover */}
      <img className="w-6" src={currentSong.cover} alt={currentSong.title} />
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
            style={{ transform: isPlayerExpanded ? "rotate(180deg)" : "" }}
          />
        </svg>
      </button>
    </div>
  );
};

export const AudioPlayer = memo(BaseAudioPlayer);
