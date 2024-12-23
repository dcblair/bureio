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
  currentTime: number;
  handlePlay: () => void;
  isPlaying: boolean;
  isPlayerExpanded: boolean;
  setCurrentSong: (song: Song) => void;
  setCurrentTime: (time: number) => void;
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
  currentTime: 0,
  handlePlay: () => {},
  isPlaying: false,
  isPlayerExpanded: true,
  setCurrentSong: () => {},
  setCurrentTime: () => {},
  togglePlayerExpanded: () => {},
});

const AudioProvider = ({ children }: { children: ReactNode }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPlayerExpanded, setIsPlayerExpanded] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [currentSong, setCurrentSong] = useState({
    id: "1",
    title: "calling currents",
    artist: "bu.re_",
    cover: "/images/webp/cropped-dsii-artwork-1440w.webp",
    audio: "/audio/calling-currents.wav",
  });
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  // establishes audio element
  useEffect(() => {
    const audioElement = new Audio(currentSong.audio);
    setAudio(audioElement);

    const updateCurrentTime = () => setCurrentTime(audioElement.currentTime);
    audioElement.addEventListener("timeupdate", updateCurrentTime);

    return () => {
      audioElement.pause();
      audioElement.src = "";
      audioElement.removeEventListener("timeupdate", updateCurrentTime);
    };
  }, [currentSong.audio]);

  // handles audio ending
  useEffect(() => {
    if (!audio) return;

    audio.addEventListener("ended", () => {
      setIsPlaying(false);
    });

    return () => {
      audio.removeEventListener("ended", () => {
        setIsPlaying(false);
      });
    };
  });

  // handles audio playing and pausing
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

  // handles expanding and collapsing the player
  const togglePlayerExpanded = () => {
    setIsPlayerExpanded(!isPlayerExpanded);
  };

  const value = {
    audio,
    currentSong,
    currentTime,
    handlePlay,
    isPlayerExpanded,
    isPlaying,
    setCurrentSong,
    setCurrentTime: (time: number) => {
      if (audio) {
        audio.currentTime = time;
        setCurrentTime(time);
      }
    },
    togglePlayerExpanded,
  };

  return (
    <AudioContext.Provider value={value}>{children}</AudioContext.Provider>
  );
};

export { AudioContext, AudioProvider };
