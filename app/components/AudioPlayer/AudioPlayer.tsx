import { memo, useState } from "react";

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
  const [isPlayerOpen, setIsPlayerOpen] = useState(true);
  const [currentSong, setCurrentSong] = useState({
    id: "1",
    title: "calling currents",
    artist: "bu.re_",
    cover: "/images/webp/cropped-dsii-artwork-1440w.webp",
    audio: new Audio("/audio/calling-currents.wav"),
  });

  const handlePlay = () => {
    if (isPlaying) {
      currentSong.audio.pause();
      setIsPlaying(false);
    } else {
      currentSong.audio.play();
      setIsPlaying(true);
    }
  };

  const togglePlayerOpen = () => {
    setIsPlayerOpen(!isPlayerOpen);
  };

  return (
    <div className="sticky bottom-0 flex h-10 w-full items-center justify-evenly border-t-2 border-rich-black-fogra29 bg-romance py-8">
      <button
        // todo: add bg color to set colors in tw config?
        className="w-16 rounded-full bg-[#769FB8] px-2.5 py-1.5 shadow-md transition duration-2000 ease-in-out hover:shadow-2xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rich-black-fogra29"
        onClick={handlePlay}
      >
        {isPlaying ? "pause" : "play"}
      </button>
      <div className="flex items-center space-x-2">
        <span>track — </span>
        <h3 className="text-lg font-semibold tracking-wider">
          {currentSong.title}
        </h3>
      </div>
      <img className="w-6" src={currentSong.cover} alt={currentSong.title} />
      <button onClick={togglePlayerOpen}>
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
            style={{ transform: isPlayerOpen ? "rotate(180deg)" : "" }}
          />
        </svg>
      </button>
    </div>
  );
};

export const AudioPlayer = memo(BaseAudioPlayer);
