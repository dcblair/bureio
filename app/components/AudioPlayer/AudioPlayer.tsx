import { memo, useEffect, useState } from "react";

interface AudioPlayerProps {
  currentSong: {
    id: string;
    title: string;
    artist: string;
    cover: string;
    audio: string;
  };
}

const BaseAudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPlayerExpanded, setIsPlayerExpanded] = useState(true);
  const [currentSong, setCurrentSong] = useState({
    id: "1",
    title: "calling currents",
    artist: "bu.re_",
    cover: "/images/webp/cropped-dsii-artwork-1440w.webp",
    audio: "/audio/calling-currents.wav",
  });
  const [audio, setAudio] = useState<HTMLAudioElement | null>();

  useEffect(() => {
    const audio = new Audio(currentSong.audio);
    setAudio(audio);

    return () => {
      audio.pause();
      audio.src = "";
    };
  }, [currentSong.audio]);

  const handlePlay = () => {
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play();
      setIsPlaying(true);
    }
  };

  const togglePlayerExpanded = () => {
    setIsPlayerExpanded(!isPlayerExpanded);
  };

  return (
    <div className="sticky bottom-0 z-30 flex h-12 w-full items-center justify-evenly border-t-2 border-rich-black-fogra29 bg-romance py-9">
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
      <div className="flex items-center space-x-2">
        <span>track — </span>
        <h3 className="text-lg font-semibold tracking-wider">
          {currentSong.title}
        </h3>
      </div>
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
