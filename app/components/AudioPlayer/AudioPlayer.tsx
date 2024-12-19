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

const BaseAudioPlayer = ({ currentSong }: AudioPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audio = new Audio("https://www.soundjay.com/button/beep-07.wav");

  const handlePlay = () => {
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play();
      setIsPlaying(true);
    }
  };

  return (
    <div className="sticky bottom-0 flex h-10 w-full items-center justify-evenly border-t-2 border-rich-black-fogra29 bg-romance py-4">
      <button
        // todo: add bg color to set colors in tw config?
        className="rounded-full bg-[#769FB8] px-2.5 py-1.5"
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
      {/* <audio src={currentSong.audio} /> */}
    </div>
  );
};

export const AudioPlayer = memo(BaseAudioPlayer);
