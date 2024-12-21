import { createContext, ReactNode, useEffect, useState } from "react";

interface Song {
  id: string;
  title: string;
  artist: string;
  cover: string;
  audio: string;
}

interface AudioContextType {
  audio: HTMLAudioElement | null;
  currentSong: {
    id: string;
    title: string;
    artist: string;
    cover: string;
    audio: string;
  };
  // currentTime: number;
  handlePlay: () => void;
  isPlaying: boolean;
  isPlayerExpanded: boolean;
  setCurrentSong: (song: Song) => void;
  // setCurrentTime: (time: number) => void;
  togglePlayerExpanded: () => void;
}

const AudioContext = createContext<AudioContextType>({
  audio: null,
  currentSong: {
    id: "1",
    title: "calling currents",
    artist: "bu.re_",
    cover: "/images/webp/cropped-dsii-artwork-1440w.webp",
    audio: "/audio/calling-currents.wav",
  },
  // currentTime: 0,
  handlePlay: () => {},
  isPlaying: false,
  isPlayerExpanded: true,
  setCurrentSong: () => {},
  // setCurrentTime: () => {},
  togglePlayerExpanded: () => {},
});

const AudioProvider = ({ children }: { children: ReactNode }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPlayerExpanded, setIsPlayerExpanded] = useState(true);
  const [currentSong, setCurrentSong] = useState({
    id: "1",
    title: "calling currents",
    artist: "bu.re_",
    cover: "/images/webp/cropped-dsii-artwork-1440w.webp",
    audio: "/audio/calling-currents.wav",
  });
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

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

  const value = {
    audio,
    isPlaying,
    isPlayerExpanded,
    currentSong,
    setCurrentSong,
    handlePlay,
    togglePlayerExpanded,
  };

  return (
    <AudioContext.Provider value={value}>{children}</AudioContext.Provider>
  );
};

export { AudioContext, AudioProvider };
